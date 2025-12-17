import { useState } from "react";
import styled from "styled-components";
import './list.css';

let FORM=styled.form`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
    margin-bottom:20px;
    input{
    border: none;
    padding: 10px;
    border-radius: 8px;
    margin: 10px;
    outline: none;
    font-size: 16px;
    background-color: #58a776;
    color: rgb(0, 238, 246);
    }
    button{
    border: none;
    padding: 10px 15px;
    border-radius: 8px;
    background-color: #056952;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background-color .2s ease;
    &:hover{
        background-color: #034d40;
        }`;
export default function Addhabits(props){
    const [hbt,setHabit]=useState('')
        

    
    
    
    let submmited=(e)=>{
        e.preventDefault()
        props.AddhandelHabit(hbt);
        setHabit('')
        console.log('.............')
        console.log(hbt)
    }
    return(
        <FORM action="" onSubmit={submmited}>
            <input type="text" name="habit" value={hbt} id="habit" placeholder="Add New Habit" onChange={(event)=>{setHabit(event.target.value)}}/>
            <button type="submit">Add Habit</button>
        </FORM>
    )
}