import { useState } from "react";

export default function Colors(){
    let [indexC,setIndexC]=useState(0)
    let colors=['red','green','yellow']
    let changeColor=()=>{
        setIndexC(indexC===2?indexC-2:indexC+1)
    }
    return( <div>
        <div style={{
            background:(colors[indexC]==='red'?'red':'grey'),
            borderRadius:`${50}%`,
            height:30,
            width:30
        }}></div>{colors[0]}
        <div style={{
            background:(colors[indexC]==='green'?'green':'grey'),
            borderRadius:`${50}%`,
            height:30,
            width:30
        }}></div>{colors[1]}
        <div style={{
            background:(colors[indexC]==='yellow'?'yellow':'grey'),
            borderRadius:`${50}%`,
            height:30,
            width:30
        }}></div>{colors[2]}
        <button onClick={changeColor}>Passer</button>
    </div>
   )

}