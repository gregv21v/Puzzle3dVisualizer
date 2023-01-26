import { For } from "solid-js";
import Piece from "./Piece";



export default function FlattenedPuzzle(props) {
    const spacing = 10
    
    return <g>
        <For each={props.faces}>
            {
                (face, i) => <Piece
                    x={props.x}
                    y={props.y + i() * (face.height + spacing)}
                    width={face.width}
                    height={face.height}
                    index={i()}
                    selected={face.selected}
                    onFaceClicked={props.onFaceClicked}
                ></Piece>
            }
        </For>
    </g>
}