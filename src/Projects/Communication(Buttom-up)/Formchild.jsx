import { useState } from "react"

export default function Formchild(props){
    const [inpt,setInput]=useState("");
    // const arr=[];
        
    
    const Submitted=(event)=>{
        event.preventDefault();
        // arr.push(inpt)
        props.SendToParent(inpt)
        setInput("")
        
    }

    return <form action="" onSubmit={Submitted}>
        <input type="text" value={inpt} onChange={(event)=>setInput(event.target.value)}/>
        <input type="submit" value="submit"/>
    </form>
}