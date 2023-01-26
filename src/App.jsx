import styles from './App.module.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createEffect, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import Puzzle from './FlattenedPuzzle';
import Puzzle3D from './Puzzle3D';
import { getRegularPolygonSides } from './util';


/** TODO:
 * Convert a svg path into a shape path 
 *    https://threejs.org/docs/?q=shapepath#api/en/extras/core/ShapePath
 *    https://threejs.org/docs/?q=shapepath#api/en/extras/core/Path
 */
function App() {
  let canvas3D, canvas2D;
  const [scale, setScale] = createSignal(1);
  const [faces, setFaces] = createStore([
    {selected: false, width: 50, height: 50},
    {selected: false, width: 50, height: 50},
    {selected: false, width: 50, height: 50},
    {selected: false, width: 50, height: 50},
    {selected: false, width: 50, height: 50},
    {selected: false, width: 50, height: 50}
  ])

  // Scene.
  var camera, scene, renderer, light, cube;
  var orbitControls;
  var puzzle;
  

  function init() {

    // Camera.
    const fov = 45;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 2000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 500);

    renderer = new THREE.WebGLRenderer( { canvas3D } );
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight);

    console.log(renderer.domElement);
    document.body.appendChild( renderer.domElement );

    window.addEventListener('resize', onWindowResize, false);

    // Orbit controls.
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enablePan = true;
    orbitControls.enableKeys = false;
    orbitControls.update();
    orbitControls.addEventListener('change', render);

    // Adding orbit controls to camera (expected by AMI image widgets).
    camera.controls = orbitControls;

    // Scene.
    scene = new THREE.Scene();

    // Lights.

    puzzle = new Puzzle3D(0, 0, 0);
    puzzle.addToScene(scene);

    let polygon = getRegularPolygonSides(6, 50, {x: 0, y: 0})
    let shapes = pointsTo3dPath(polygon).toShapes(true);

    let material = [
      new THREE.MeshBasicMaterial({color: "blue"}),
      new THREE.MeshBasicMaterial({color: "green"}),
    ]

    for (const shape of shapes) {
      let shape3d = new THREE.ExtrudeGeometry(shape, {
        depth: 10,
        bevelEnabled: false
      })

      let mesh = new THREE.Mesh(shape3d, material)
      scene.add(mesh);
    }

    


    /*
    puzzle.colorFaces([
      new THREE.Color(0xffffff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xffffff),
      new THREE.Color(0xffffff)
    ]);
    */
  }

  // Draw Scene
  function render() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
    render()
  }


  function pointsTo3dPath(points) {
    let path = new THREE.ShapePath();
    let start = true;
    for (const point of points) {
        if(start) {
            path.moveTo(point.x, point.y)
            start = false;
        } else {
            path.lineTo(point.x, point.y)
        }
    }
    return path;
  }


  


  function onFaceClicked(index) {
    puzzle.drawFace(index, (faces[index].selected) ? "blue" : "green")
    render();
    setFaces(
      faces.map((element, i) => {
        if(i === index) {
          return {
            ...element,
            selected: !element.selected
          }
        } else {
          return element
        }
      })
    )
  }


  createEffect(() => {
    init();
    render();
  })


  return (
    <div>
        <canvas ref={canvas3D} class={styles.canvas3D}></canvas>

        <div class={styles.view2DDiv}>
            <svg ref={canvas2D} class={styles.canvas2D}>
                <Puzzle 
                  x={10} y={10} 
                  faces={faces}
                  onFaceClicked={onFaceClicked}
                ></Puzzle>
            </svg>
        </div>
        
        <div id="labels"></div>
    </div>
  );
}

export default App;
