import { useState } from "react";

export default function Message(){
    const [message, setMessage] = useState("Bonjour Amine");
    const [btn, setBtn] = useState("inscription");
    
    const change = () => {
        setMessage("succes!");
        setBtn("merci");
    };
    
    return (
        <div>
        <h1>{message}</h1>
        <button onClick={change}>{btn}</button>
        </div>
    );
}
