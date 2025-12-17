import { useState } from "react";
import styled from "styled-components";
import Addhabits from "./Addhabits.jsx";
import Listhabits from "./Listhabits.jsx";
export default function Parent() {

  const [habitsList,setHabitsList]=useState([]);
 
  
    
  
  const Addhabit = (newhbt) => {
    if (newhbt !== '') {
      setHabitsList([...habitsList, newhbt]);
    }
  };
  return(
    <div>
        <Addhabits AddhandelHabit={Addhabit}/>
        <Listhabits habit={habitsList}/>
    </div>
  )

  
}