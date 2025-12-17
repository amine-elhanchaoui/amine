import { useState } from "react";
import Child from "./Child";
export default function Parent(){
    const [msg,setMsg]=useState('')
    const onChangeMessageparent =(msg)=>{
        setMsg(msg)
    }
    return <div>
        <h1>Message:{msg}</h1>
        <Child onChangeMessage={onChangeMessageparent}/>
    </div>
}