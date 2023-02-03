import { pointsToPath } from "../../lib/geometry-d3";
import { getCenter, scalePoints, translatePoints } from "../../lib/geometry-math";
import { convertPieceFromLegacy, generatePointsForPiece } from "../../lib/puzzle-piece";


export default function Piece(props) {
    let newPiece = (props.isLegacy) ? convertPieceFromLegacy(props.piece) : props.piece;
    let scaledPiece = scalePoints(generatePointsForPiece(newPiece), 0.45)
    let translatePiece = translatePoints(scaledPiece, props.iconWidth / 2, props.iconHeight / 2 )
    let center = getCenter(translatePiece);
    
    return <g>
        <path 
            d={pointsToPath(translatePiece)}
            fill={(newPiece.selected) ? "green" : "orange"}
        ></path>
        <text 
            x={center.x}
            y={center.y}
            dominant-baseline="middle"
            text-anchor="middle"
            fill="black"
        >{newPiece.id}</text>
        <path 
            d={pointsToPath(translatePiece)}
            fill={"rgba(1, 1, 1, 0.0)"}
            onclick={() => props.onFaceClicked(newPiece.id)}
        ></path>
    </g>
}