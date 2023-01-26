import * as THREE from 'three';

/**
 * Puzzle3D - a 3d representation of the puzzle
 */
export default class Puzzle3D {


    constructor(x = 0, y = 0, z = 0) {
        this._geometry = new THREE.BoxGeometry(50, 50, 50);

        this._contexts = []
        this._textures = []
        this._materials = []

        // create the contexts for each face 
        for (let index = 0; index < 6; index++) {
            this._contexts.push(document.createElement("canvas").getContext("2d"))
        }

        // create the textures for each face
        for (let index = 0; index < 6; index++) {
            this._textures.push(new THREE.CanvasTexture(this._contexts[index].canvas))
        }

        // create the materials for each face
        for (let index = 0; index < 6; index++) {
            this._materials.push(new THREE.MeshBasicMaterial({ map: this._textures[index] }))
        }

        // draw something to each texture
        for (let index = 0; index < 6; index++) {
            this._contexts[index].canvas.width = 500;
            this._contexts[index].canvas.height = 500;

            this.drawFace(index, "#ffffff");
        }

        this._cube = new THREE.Mesh(this._geometry, this._materials);
        this._cube.material.needsUpdate = true;
    }

    /**
     * drawFace()
     * @description draws the given face of the cube
     * @param {Integer} index the index of the face
     * @param {string} color the color of the face to draw
     */
    drawFace(index, color) {
        this._contexts[index].fillStyle = color
        this._contexts[index].fillRect(0, 0, 500, 500)

        this._contexts[index].font = "250px Arial";
        this._contexts[index].textBaseline = "middle";
        this._contexts[index].textAlign = "center";
        this._contexts[index].fillStyle = "#000000";
        this._contexts[index].fillText(index, 250, 250)

        this._textures[index].needsUpdate = true;
    }

    /**
     * selectFace() 
     * @description selects the face specified by index
     * @param {Integer} index the index of the face to select
     */
    selectFace(index) {
        this.drawFace(index, "green")
    }



    /**
     * colorFaces()
     * @description colors the faces 
     * @param {Array[THREE.Color]} colors an array of colors for each face 
     */
    colorFacesByVertex(colors) {

        let colorsArray = [];

        for (const color of colors) {

            /// color the current face
            for (let i = 0; i < 4; i++) {
                colorsArray.push(color.toArray()[0])
                colorsArray.push(color.toArray()[1])
                colorsArray.push(color.toArray()[2])
            }
            
        }

        let typedArray = new Float32Array(colorsArray);

        
        
        this._geometry.setAttribute('color', new THREE.BufferAttribute(typedArray, 3))
        
    }


    /**
     * update()
     * @description updates the Puzzle3D
     */
    update() {

    }


    /**
     * addToScene()
     * @description adds the puzzle to the scene
     * @param {Scene} scene the scene to add the puzzle to
     */
    addToScene(scene) {
        scene.add(this._cube)
    }
}