/**
 * geometry-canvas
 * Functions that allow geometry to work with canvas js
 */

/**
 * drawPointsAsPathOnCanvas()
 * @description draws a path on a 2d context using a list of points
 * @param {Array[Point]} points a list of points
 * @param {2dContext} context the 2d context to draw the points to
 */
export function drawPointsAsPathOnCanvas(points, context, lineWidth=2, strokeStyle="blue", fillStyle="blue") {
    let start = true;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle
    for (const point of points) {
        if(start) {
            context.moveTo(point.x, point.y);
            start = false;
        } else {
            context.lineTo(point.x, point.y)
        }       
    }
    context.stroke()
    context.fill()
    context.closePath();
}

/**
 * drawPointsAsPathOnCanvas()
 * @description draws a path on a 2d context using a list of points
 * @param {Array[Point]} points a list of points
 * @param {2dContext} context the 2d context to draw the points to
 */
export function drawEdgesAsPathOnCanvas(edges, context, lineWidth=2, strokeStyle="blue", fillStyle="blue") {
    let start = true;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle
    for (const point of points) {
        if(start) {
            context.moveTo(point.x, point.y);
            start = false;
        } else {
            context.lineTo(point.x, point.y)
        }       
    }
    context.stroke()
    context.fill()
    context.closePath();
}