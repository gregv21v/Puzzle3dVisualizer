/**
 * geometry
 * A series of pure javascript functions that allow do some math
 */


/**
 * getPerpendicularVectorToLine()
 * @description gets the perpendicular vector to a line discribed by two points
 * @param {Point} start the starting point of the line
 * @param {Point} end the ending point of the line
 */
export function getPerpendicularVectorToLine(start, end) {
    // vector
    let vector = {
        x: end.x - start.x,
        y: end.y - start.y 
    }

    // get the length of the vector
    let vectorLength = Math.sqrt( vector.x * vector.x + vector.y * vector.y);
    
    // normalized vector
    var normalizedVector = {
        x: vector.x / vectorLength,
        y: vector.y / vectorLength
    }

    return {
        x: -normalizedVector.y,
        y: normalizedVector.x
    }
} 


/**
 * dist()
 * @description finds the distance between a start and end point
 * @param {Point} start the starting point
 * @param {Point} end the ending point
 */
export function dist(start, end) {
    return Math.sqrt(
        Math.pow(start.x - end.x, 2) + 
        Math.pow(start.y - end.y, 2)
    )
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
export function translatePoints(points, x, y) {
    let newPoints = [];
    for (const point of points) {
        newPoints.push({x: point.x + x, y: point.y + y});
    }
    return newPoints;
}


/**
 * scalePoints()
 * @description scales an array of points 
 * @param {Array[Point]} points the points to scale
 * @param {Number} scale the amount to scale the points
 * @returns the points scaled
 */
export function scalePoints(points, scale) {
    let newPoints = [];
    for (const point of points) {
        newPoints.push({
            x: point.x * scale,
            y: point.y * scale
        })
    }
    return newPoints;
}


/**
 * getXRange()
 * @description gets the x range in a list of points
 * @param {Array[Point]} points the list of points to get the range for
 * @returns an array of [xMin, xMax]
 */
export function getXRange(points) {
    let xMin = points[0].x
    let xMax = points[0].x

    for (const point of points) {
        if(xMin > point.x) {
            xMin = point.x
        }

        if(xMax < point.x) {
            xMax = point.x
        }
    }

    return [
        xMin, xMax
    ]
}


/**
 * getXRange()
 * @description gets the x range in a list of points
 * @param {Array[Point]} points the list of points to get the range for
 * @returns an array of [yMin, yMax]
 */
export function getYRange(points) {
    let yMin = points[0].y
    let yMax = points[0].y

    for (const point of points) {
        if(yMin > point.y) {
            yMin = point.y
        }

        if(yMax < point.y) {
            yMax = point.y
        }
    }

    return [
        yMin, yMax
    ]
}



