import { useState } from "react"
import Formchild from "./Formchild"
import ListMessage from "./ListMessage"
export default function Formparent(props){
    const [msg,SetMsg]=useState([])
    const Message=(messagefromparent)=>{
        SetMsg([...msg,messagefromparent])
        if (props.Deleteitem) {
            props.Deleteitem(messagefromparent)
        }
    }
    const suppItem=(item)=>{
        SetMsg(msg.filter((message)=> message!=item));
    }
    return <div>
        <Formchild SendToParent={Message}/>
        <ListMessage messages={msg} ToParent={suppItem}/>

    </div>
}