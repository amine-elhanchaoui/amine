export default function CHild (props){
    const message='Hello World!';
    const changeMessage=()=>{props.onChangeMessage(message)}
    return(
        <button onClick={changeMessage}>CLick me</button>
    )
}