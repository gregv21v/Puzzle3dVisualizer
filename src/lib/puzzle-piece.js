/**
 * puzzle-piece
 * Functions for create puzzle pieces in pure javascript
 */

import { dovetailLine } from "./geometry-pieces";
import { createEdgesForPoints } from "./geometry-shapes";


export function createPuzzlePieceFromPoints(points, selected = false) {
    return {
        name: "Test",
        selected,
        points, // the points that make up the basic outline of the shape of the piece
        edges: createEdgesForPoints(points.length).map(
            (element) => {
                return {
                    startIndex: {type: "integer", value: element[0], enabled: true, computed: true},
                    endIndex: {type: "integer", value: element[1], enabled: true, computed: true},
                    subdivisions: {type: "integer", value: 5, enabled: true, computed: true},
                    tabLength: {type: "float", value: 5, enabled: true, computed: true},
                    startIn: {type: "boolean", value: true, enabled: true, computed: true}
                }
            }
        ),
    }
}


/**
 * convertPieceFromLegacy()
 * @description converts this piece from the version used in the Puzzle Generation tool to the new version
 * @param {piece} piece the piece to be converted
 */
export function convertPieceFromLegacy(piece) {
    let newPiece = {name: piece.name, points: [], edges: []}
    for (const id of piece.order) {
        newPiece.points.push({...piece.sides[id].constraints.startPoint.value})
    }

    for (const id of piece.order) {
        newPiece.edges.push({
            startIndex: {type: "integer", value: parseInt(id), enabled: true, computed: true},
            endIndex: {type: "integer", value: (parseInt(id) + 1) % newPiece.points.length, enabled: true, computed: true},
            subdivisions: {...piece.sides[id].constraints.subdivisions},
            tabLength: {...piece.sides[id].constraints.tabLength},
            startIn: {...piece.sides[id].constraints.startIn}
        })
    }
    

    console.log(newPiece);
    return newPiece
}


/**
 * generatePointsForPiece()
 * @description generates the points that make up the piece
 */
export function generatePointsForPiece(piece) {
    console.log(piece);

    let points = [];
    for (const edge of piece.edges) {
        let startPoint = piece.points[edge.startIndex.value]
        let endPoint = piece.points[edge.endIndex.value] 

        points.push(startPoint)
        points = points.concat(
            dovetailLine(
                startPoint, endPoint, 
                edge.subdivisions.value, 
                edge.tabLength.value, 
                edge.startIn.value
            )
        )
        points.push(endPoint)
    }

    return points;
}