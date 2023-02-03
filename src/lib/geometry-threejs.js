/**
 * geometry-threejs
 * A series of functions that allow geometry to work with threejs
 */

import * as THREE from 'three';


export function pointsToShapePath(points) {
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