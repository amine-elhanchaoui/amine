import Message from "./Message"
export default function ListMessage(props){
    const {messages}=props
   
        
          return(
              (messages.length===0)?(<h1>Empty page!</h1>):(<ul>
            {
                messages.map((item)=>
                   <Message item={item} DeleteItem={()=>props.ToParent(item)}/> 
                )
            }
        </ul>)
          )

}