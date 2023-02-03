import { createSignal } from "solid-js";
import Piece from "./Piece";

export function PiecePanel(props) {
    const [showMore, setShowMore] = createSignal(false);


    return <div style={{
        border: "2px solid black"
    }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            padding: "2px"
        }}>
            <div style={{
                flex: 0.2
            }}>
                <svg style={{
                    border: "2px solid black"
                }} width={100} height={100}>
                    <Piece 
                        iconWidth={100} 
                        iconHeight={100} 
                        piece={props.piece} 
                        isLegacy={true}                        
                    ></Piece>
                </svg>
            </div>
            <div style={{
                flex: 0.8,
                "padding-left": "10px",
                "vertical-align": "middle",
                "line-height": "100px",
                "height": "100px",
                "text-align": "center"
            }}>
                <h2>{props.piece.name}</h2>
            </div>
        </div>
        
        <div>
            <button>Duplicate</button>
            <button>Remove</button>
            <button 
                style={{
                    "float": "right"
                }}
                onclick={() => {
                    if(showMore()) {
                        setShowMore(false)
                    } else {
                        setShowMore(true)
                    }
                }}>
                    {(showMore()) ? "Show More..." : "Show Less"}
            </button>
            <div
                style={{
                    "display" : (showMore()) ? "none" : "block"
                }}
            >
                Info
            </div>
            
        </div>

        
    </div>
}