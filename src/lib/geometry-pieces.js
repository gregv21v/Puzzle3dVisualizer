/**
 * geometry-pieces
 * A series of function that allows you to create puzzle pieces with dovetail edges
 */

import { dist, getPerpendicularVectorToLine } from "./geometry-math"


/**
 * @description creates dovetails on a line. In otherwords makes it into a square wave
 * @param {Point} start the starting point of the line
 * @param {Point} end the ending point of the line 
 * @param {Integer} subdivisions the number of subdivisions the line is divided into
 * @param {Boolean} startIn true if the dovetail starts in the inward direction, 
 *  otherwise it starts in the outward direction
 */
export function dovetailLine(start, end, subdivisions, tabLength, startIn = false) {
    let points = [start]
    let deltaX = (end.x - start.x) / subdivisions
    let deltaY = (end.y - start.y) / subdivisions

    let perpendicularVector = getPerpendicularVectorToLine(start, end);

    for(let j = 0; j < subdivisions+1; j++) {

        let D1 = {
            x: (start.x + deltaX * (j-1)) + tabLength * perpendicularVector.x,
            y: (start.y + deltaY * (j-1)) + tabLength * perpendicularVector.y
        }

        let D2 = {
            x: (start.x + deltaX * j) + tabLength * perpendicularVector.x,
            y: (start.y + deltaY * j) + tabLength * perpendicularVector.y
        }

        if(startIn) { // output: _-_
            if(j % 2 === 0 && j > 0) {
                // outward tab 
                points.push({x: D1.x, y: D1.y}) // line outward perpendicular to the start point 
                points.push({x: D2.x, y: D2.y}) // line across
                points.push({x: start.x + deltaX * j, y: start.y + deltaY * j})
            } else { // inward tab
                points.push({x: start.x + deltaX * j, y: start.y + deltaY * j})
            }
        } else { // output: -_-
            if(j % 2 === 1) {
                points.push({x: D1.x, y: D1.y}) // line outward perpendicular to the start point 
                points.push({x: D2.x, y: D2.y}) // line across
                points.push({x: start.x + deltaX * j, y: start.y + deltaY * j})
            } else {
                points.push({x: start.x + deltaX * j, y: start.y + deltaY * j})
            }
        }   
    }

    points.push(end);

    return points
}


/**
 * dovetailPoints()
 * @description dovetails between every two points. In otherwords makes each side of the shape into square waves
 * @param {Array[Point]} shape the points that make up the shape
 * @param {Integer} subdivisions the number of subdivisions to divide each side of the shape into
 * @param {*} startIn whether the dovetails starts in or out
 */
export function dovetailPoints(shape, subdivisions, tabLength, startIn) {
    let newShape = []
    for (let i = 0; i < shape.length; i++) {
        let current = shape[i]
        let next = (i+1 < shape.length) ? shape[i+1] : shape[0]

        newShape = newShape.concat(dovetailLine(current, next, subdivisions, tabLength, startIn))
    }

    return newShape;
}




