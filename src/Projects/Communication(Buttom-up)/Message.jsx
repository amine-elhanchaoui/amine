export default function Message(props){
    const {item,DeleteItem}=props

    return(
        <li  style={{color:'darkred'}}>{item} <button onClick={()=>DeleteItem(item)}>Delete</button></li>
    )
}