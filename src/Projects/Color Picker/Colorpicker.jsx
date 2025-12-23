import { useState } from "react"
import './picker.css'
export default function Colorpicker() {
    const [color,setColor]=useState('#000000ff')
    let handelColor=(event)=>{
        setColor(event.target.value)
    }
    console.log(color)
    return(
        <div className="container-color">
            <h1>Color Picker</h1>
            <div style={{backgroundColor:color}} className="color-display"></div>
            <h3>Chose your Color</h3>
            <input type="color"  value={color} onChange={handelColor}/>
        </div>
    )
}