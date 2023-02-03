/**
 * geometry-shapes
 * I library of functions that allow you to create simple geometrical shapes
 */



/**
 * getPointOnRegularPolygon()
 * @description gets a point on the regular polygon
 * @param {Number} angleOffset the amount to offset the angle 
 * @param {Number} sideCount the number of sides to the regular polygon
 * @param {Number} radius the radius of the regular polygon
 * @param {Point} center the center point of the regular polygon
 * @param {Integer} index the index of the vertice of the polygon
 * @returns {Point} the point on the regular polygon
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
 * getPolygonRadius()
 * @description gets the radius of a polygon given its side length
 * @param {number} sideCount the number of sides on the regular polygon
 * @param {number} sideLength the sideLength of the regular polygon
 */
export function getPolygonRadius(sideCount, sideLength) {
    let theta = 360 / sideCount;
    return sideLength / (Math.tan((theta/2) * (Math.PI / 180)))
}


/**
 * createRegularPolygonPoints()
 * @description creates the points for the sides of a regular polygon
 * @param {Integer} sideCount the number of side the polygon will have
 * @param {Number} radius the radius of the polygon
 * @param {Point} center the center point of the polygon
 * @returns the points that form the sides of a regular polygon
 */
export function createRegularPolygonPoints(sideCount, radius, center) {
    let path = [];

    for (let i = 0; i < sideCount+1; i++) {
        path.push(getPointOnRegularPolygon(sideCount, radius, center, i))
    }

    return path;
}


/**
 * createRegularPolygonEdges()
 * @description creates the edges for a regular polygon
 * @param {Integer} sideCount the number of side the polygon will have
 * @param {Number} radius the radius of the polygon
 * @param {Point} center the center point of the polygon
 * @returns the edges that form the regular polygon
 */
export function createRegularPolygonEdges(sideCount, radius, center) {
    let edges = [];

    for (let i = 0; i < sideCount; i++) {
        let current = getPointOnRegularPolygon(sideCount, radius, center, i);
        let next = getPointOnRegularPolygon(sideCount, radius, center, (i+1 < sideCount) ? i+1 : 0)
        edges.push(
            {start: current, end: next}
        )
    }

    return edges;
}



/**
 * createRectanglePoints()
 * @description creates a rectangle
 * @param {Point} center the center of the rectangle
 * @param {Number} width the width of the rectangle
 * @param {Number} height the height of the rectangle
 */
export function createRectanglePoints(center, width, height) {
    return [
        {x: center.x + width/2, y: center.y - height/2},
        {x: center.x - width/2, y: center.y - height/2},
        {x: center.x - width/2, y: center.y + height/2},
        {x: center.x + width/2, y: center.y + height/2}
    ]
} 



/**
 * createEdgesForPoints() 
 * @description creates edges for a given number of points. The edges are specify indices in
 *  the points array 
 * @param {Integer} count the number of points to create edges for
 */
export function createEdgesForPoints(count) {
    let edges = [];
    for(let i = 0; i < count; i++) {
        edges.push([i, (i+1 < count) ? i+1 : 0])
    }
    return edges;
}