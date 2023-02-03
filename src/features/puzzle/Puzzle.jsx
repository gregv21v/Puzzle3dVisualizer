import { For } from "solid-js";
import { PiecePanel } from "../piece/PiecePanel";

export default function Puzzle(props) {
    return (
        <For each={Object.values(props.pieces)}>
            {
                (piece, i) => <PiecePanel
                    piece={piece}
                >

                </PiecePanel>
            }
        </For>
    )
}