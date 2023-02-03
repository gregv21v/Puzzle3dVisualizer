/**
 * A series of functions that extent d3s SVG library
 * 
 * Point - an object with an x and y properties
 */
import * as d3 from "d3";
import { rotatePoint } from "./geometry-math";
import { getPointOnRegularPolygon } from "./geometry-shapes";


/**
 * pointsToPath()
 * @description converts an array of points to a path
 * @param {Array[Point]} points an array of points
 */
export function pointsToPath(points) {
    let path = d3.path();
    let start = true;
    for (const point of points) {
        if(start) {
            path.moveTo(point.x, point.y)
            start = false;
        } else {
            path.lineTo(point.x, point.y)
        }
    }

    path.closePath();
    return path;
}


/**
 * createPolygonPath()
 * @description creates the path for a regular polygon
 * @param {Integer} sideCount the number of sides to the polygon
 * @param {Number} radius the radius of the polygon
 * @param {Point} center the center point of the polygon
 * @returns the path for the regular polygon
 */
export function createPolygonPath(sideCount, radius, center) {
    let path = d3.path();
    let angle = (360 / sideCount); // interior angle
    // start the first angle such that the line formed by the first and second angle is parallel 
    // to the x plane

    // find the rotation
    let theta = angle / 2// angle between the first side of the polygon and the x axis

    let startPoint = getPointOnRegularPolygon(sideCount, radius, center, 0)
    
    path.moveTo(startPoint.x, startPoint.y);
    
    for (let i = 1; i < sideCount+1; i++) {
        let point = getPointOnRegularPolygon(sideCount, radius, center, i);
        point = rotatePoint(point, theta, startPoint)

        path.lineTo(point.x, point.y)
    }

    path.closePath();

    return path;
}