import styles from './App.module.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createSignal, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createRectanglePoints } from './lib/geometry-shapes';
import { pointsToShapePath } from './lib/geometry-threejs';
import Puzzle3D from './features/puzzle/Puzzle3D';
import { getCenter, scalePoints, translatePoints } from './lib/geometry-math';
import { convertPieceFromLegacy, createPuzzlePieceFromPoints, generatePointsForPiece } from './lib/puzzle-piece';
import { Modal } from './features/modal/Modal';
import Puzzle from './features/puzzle/Puzzle';

function App() {
  let canvas3D;
  var camera, scene, renderer, light, cube;
  var orbitControls;
  var puzzle;
  let inputFile;
  const [scale, setScale] = createSignal(1);
  const [faces, setFaces] = createStore([
    createPuzzlePieceFromPoints(createRectanglePoints({x: 0, y: 0}, 100, 100))
  ])
  const [pieces, setPieces] = createStore({})
  const [isModalShown, setIsModalShown] = createSignal(true);
  const [file, setFile] = createSignal(null)

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

  function renderPuzzle() {
    let z = 0; 
    for (const piece of Object.values(pieces)) {
      z += 20
      let newerPiece = convertPieceFromLegacy(piece)
      console.log(newerPiece);
      let center = getCenter(newerPiece.points)


      let points = generatePointsForPiece(newerPiece)
      points = translatePoints(points, -center.x, -center.y);
      points = scalePoints(points, 0.25);
      
      let shapes = pointsToShapePath(points).toShapes(true);

      let material = [
        new THREE.MeshBasicMaterial({color: "blue"}),
        new THREE.MeshBasicMaterial({color: "green"}),
      ]

      for (const shape of shapes) {
        let shape3d = new THREE.ExtrudeGeometry(shape, {
          depth: 5,
          bevelEnabled: false
        })

        let mesh = new THREE.Mesh(shape3d, material)

        mesh.position.set(0, 0, z);
        scene.add(mesh);
      }
    }
      
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


  /**
     * importFile()
     * @description imports a file
     */
  function importFile() {
    setIsModalShown(false)

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        setPieces(JSON.parse(event.target.result))
        renderPuzzle();
    })

    reader.readAsText(file())

    
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


  onMount(() => {
    init();
    render();
  })


  function renderModal(type) {
    switch(type) {
        case "export":
            /*return (
                <Modal show={isModalShown} handleClose={() => setIsModalShown(false)}>
                    <h1>Export as {fileType}</h1>
                    <p>Do not add the file extension to the end of the filename. That will be done automatically.</p>
                    Filename: <input onChange={(event) => filenameChange(event)} type="text" value={filename}></input>
                    <button onClick={exportFile}>Export</button>
                </Modal>
            )*/
            return <div></div>
        case "import": 
            return (
                <Modal 
                  show={isModalShown()} 
                  handleClose={() => {
                    setIsModalShown(false)
                    console.log(isModalShown());
                    console.log("closed");
                  }}>
                    <h1>Select a file of type .json to import</h1>
                    <input 
                        type="file" 
                        id="file" 
                        ref={inputFile} 
                        accept=".json" 
                        onChange={event => setFile(event.target.files[0])}
                    ></input>
                    <button onClick={importFile}>Import</button>
                </Modal>
            )
        default: break;
    }
  }


  return (
    <div style={{overflow: "hidden"}}>
        

        <canvas ref={canvas3D} class={styles.canvas3D}></canvas>
        

        <div class={styles.view2DDiv}>
            <button onclick={() => setIsModalShown(true)}>Load</button>
            <button>Save</button>
            <Puzzle pieces={pieces}>

            </Puzzle>

            
        </div>

        {renderModal("import")}
        
        
        <div id="labels"></div>

        
    </div>
  );
}

export default App;
