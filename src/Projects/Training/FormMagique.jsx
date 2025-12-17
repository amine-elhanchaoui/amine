import { useState } from "react";


export default function FormMagique() {
    let [indexC, setIndexC] = useState(0)
    let [indexF,setIndexF]=useState(0)
    let [taille,setTaille]=useState(20)

    let colors = ['red', 'green', 'black', 'blue', 'orange']
    let Form = [100, 0, 7, 50, 20]
    const changeColor = () => {
        setIndexC((indexC + 1) % colors.length)
    }
    let changeForm = () => {
        setIndexF((indexF + 1) % Form.length)
    }
    let changePlus=()=>{
        setTaille(taille+20)
    }
    let changeMinus=()=>{
        setTaille(taille-10)
    }
    return <div>
        <div style={{
            background: colors[indexC],
            height: `${taille}px`,
            width: `${taille}px`,
            margin: 'auto',
            borderRadius: Form[indexF]
        }}></div>
        <button onClick={changeColor}>color</button>
        <button onClick={changeForm}>Form</button>
        <button onClick={changePlus}>+</button>
        <button onClick={changeMinus}>-</button>
    </div>

}