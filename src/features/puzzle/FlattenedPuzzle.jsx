import { For } from "solid-js";
import Piece from "../piece/Piece";
import { translatePoints } from "../../lib/geometry-math";



export default function FlattenedPuzzle(props) {
    const spacing = 40;
    return <g>
        <For each={props.faces}>
            {
                (face, i) => <Piece
                    points={translatePoints(face.points, -100, (i()-1) * (100 + spacing))}
                    index={i()}
                    selected={face.selected}
                    onFaceClicked={props.onFaceClicked}
                ></Piece>
            }
        </For>
    </g>
}