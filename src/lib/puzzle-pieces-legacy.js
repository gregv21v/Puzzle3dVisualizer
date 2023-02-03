/**
 * puzzle-pieces-legacy
 * This is old code from the puzzle generator tool that will be slowely phased out
 */

/**
 * createPathForLineEdge()    
 * @description creates the Path for an edge of the piece
 * @param {Edge} edge the edge to draw
 */
export function createPathForLineEdge(path, piece, edge) {

    let start = getGlobalCoordinate(piece, piece.vertices[edge.constraints.start.value])
    let end = getGlobalCoordinate(piece, piece.vertices[edge.constraints.end.value])

    let deltaX = (end.x - start.x) / edge.constraints.subdivisions.value
    let deltaY = (end.y - start.y) / edge.constraints.subdivisions.value
    let line = new Line(start, end)
    let perpendicularVector = line.getPerpendicularVector();
    
    for(let j = 0; j < edge.constraints.subdivisions.value+1; j++) {

        let D1 = {
            x: (start.x + deltaX * (j-1)) + edge.constraints.tabLength.value * perpendicularVector.x,
            y: (start.y + deltaY * (j-1)) + edge.constraints.tabLength.value * perpendicularVector.y
        }

        let D2 = {
            x: (start.x + deltaX * j) + edge.constraints.tabLength.value * perpendicularVector.x,
            y: (start.y + deltaY * j) + edge.constraints.tabLength.value * perpendicularVector.y
        }

        if(edge.constraints.startIn.value) { // output: _-_
            if(j % 2 === 0 && j > 0) {
                // outward tab 
                path.lineTo(D1.x, D1.y) // line outward perpendicular to the start point 
                path.lineTo(D2.x, D2.y) // line across
                path.lineTo(start.x + deltaX * j, start.y + deltaY * j)
            } else { // inward tab
                path.lineTo(start.x + deltaX * j, start.y + deltaY * j)
            }
        } else { // output: -_-
            if(j % 2 === 1) {
                path.lineTo(D1.x, D1.y) // line outward perpendicular to the start point 
                path.lineTo(D2.x, D2.y) // line across
                path.lineTo(start.x + deltaX * j, start.y + deltaY * j)
            } else {
                path.lineTo(start.x + deltaX * j, start.y + deltaY * j)
            }
        }

        
        
    }
    path.lineTo(end.x, end.y);

    return path;
}