import * as d3 from "d3";

/**
 * getPointOnRegularPolygon()
 * @description gets a point on the regular polygon
 * @param {Number} angleOffset the amount to offset the angle 
 * @param {Number} sideCount the number of sides to the regular
 * @param {*} radius 
 * @param {Point} center the center point of the regular polygon
 * @param {Integer} index the index of the vertice of the polygon
 * @returns the point on the regular polygon
 */
export function getPointOnRegularPolygon(sideCount, radius, center, index) {
    let angle = 360 / sideCount;
    const angleOffset = 90;
    return {
        x: center.x + radius * Math.cos((angleOffset + angle * index) * Math.PI / 180),
        y: center.y + radius * Math.sin((angleOffset + angle * index) * Math.PI / 180)
    }
}


/**
 * rotatePoint()
 * @description rotate a point around another point for a certain number of degrees
 * @param {Point} point the point to rotate
 * @param {Number} angle the angle in degrees to rotate the point around
 * @param {Point} origin the other point to rotate point around
 * @returns the new rotated point
 */
export function rotatePoint(point, angle, origin) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x,
        y: Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y
    }
}


/**
 * createPolygon()
 * @description creates the path for a regular polygon
 * @param {Integer} sideCount the number of sides to the polygon
 * @param {Number} radius the radius of the polygon
 * @param {Point} center the center point of the polygon
 * @returns the path for the regular polygon
 */
export function createPolygon(sideCount, radius, center) {
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




/**
 * getRegularPolygonSides()
 * @description gets the vertices for the sides of the polygon
 * @param {Integer} sideCount the number of side the polygon will have
 * @param {Number} radius the radius of the polygon
 * @param {Point} center the center point of the polygon
 * @returns the points that form the sides of a regular polygon
 */
export function getRegularPolygonSides(sideCount, radius, center) {
    let path = [];
    // start the first angle such that the line formed by the first and second angle is parallel 
    // to the x plane
    for (let i = 0; i < sideCount+1; i++) {
        path.push(getPointOnRegularPolygon(sideCount, radius, center, i))
    }

    return path;
}

/**
 * getCenter()
 * @description gets the center of all the points on the polygon
 * @param {Array[Point]} points the points that make up the polygon
 */
export function getCenter(points) {
    let center = {x: 0, y: 0}
    // sum up all the points
    for (const point of points) {
        center.x += point.x
        center.y += point.y
    }

    center.x /= points.length;
    center.y /= points.length;

    return center;
}



/**
 * rotatePoints()
 * @description rotates an array of points around another point by a certain number of degrees.
 * @param {Array[Point]} points the set of points to rotate
 * @param {Number} angle the angle to rotate the points at
 * @param {Point} origin the point to rotate around
 * @returns a new array of rotated points
 */
export function rotatePoints(points, angle, origin) {
    let newPoints = [];
    for (const point of points) {
        newPoints.push(rotatePoint(point, angle, origin));
    }
    return newPoints;
}


/**
 * translatePoints()
 * @description translates an array of points
 * @param {Array[Point]} points the array of points
 * @param {Number} x the x amount to translate by
 * @param {Number} y the y amount to translate by
 */
function translatePoints(points, x, y) {
    let newPoints = [];
    for (const point of points) {
        newPoints.push({x: point.x + x, y: point.y + y});
    }
    return newPoints;
}

/**
 * pointsToPath()
 * @description converts an array of points to a path
 * @param {Array[Point]} points an array of points
 */
function pointsToPath(points) {
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