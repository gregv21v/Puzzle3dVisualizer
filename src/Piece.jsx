


export default function Piece(props) {


    return <g>
        <rect 
            width={props.width} 
            height={props.height} 
            x={props.x} 
            y={props.y}
            fill={(props.selected) ? "green" : "orange"}
        ></rect>
        <text 
            x={props.x + props.width / 2}
            y={props.y + props.height / 2}
            dominant-baseline="middle"
            text-anchor="middle"
            fill="black"
        >{props.index}</text>
        <rect 
            onclick={() => props.onFaceClicked(props.index)}
            width={props.width} 
            height={props.height} 
            x={props.x} 
            y={props.y}
            fill={"rgba(0, 0, 0, 0)"}
        ></rect>
    </g>
}