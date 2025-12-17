import { useState } from "react";

export default function Carre(){
    let [taille,setTaille]=useState(100);
    let [colors,setColors]=useState('red')
    let [borderRadius,setBorder]=useState(0)
    let changePlus=()=>{setTaille(taille+10)}
    let changeMinus=()=>{setTaille(taille-10)}
    let changeColor=()=>{setColors(colors==='blue'?'red':'blue')}
    let changeBorder=()=>{setBorder(borderRadius+10)}
    return <div>
        <div style={{
            background:colors,
            height:`${taille}px`,
            width:`${taille}px`,
            margin:'auto',
            borderRadius:borderRadius
        }}></div>
        <button onClick={changeColor}>{colors==='blue'?'red':'blue'}</button>
        <button onClick={changePlus}>+</button>
        <button onClick={changeMinus}>-</button>
        <button onClick={changeBorder}>border-radius</button>
    </div>
}