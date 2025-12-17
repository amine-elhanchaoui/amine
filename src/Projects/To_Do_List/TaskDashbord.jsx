import TaskList from "./TaskList"
import data from "./data"
import TaskForm from "./TaskForm"
import {useState } from "react"
import './style.css'
export default function TaskDashbord() {
    const [tasks,setTask]=useState(data)
    let addData=(newtask)=>{
        setTask([...tasks,newtask])
    }
    
    
    const updateTaskStatus = (index, newStatus) => {
        setTask(prev => prev.map((t,i) => i === index ? {...t, statue: newStatus} : t))
    }
    return (
        <div className="motherboard">
            <h1 className="text-center text-primary fw-bold my-4">
                Task Manager
            </h1>
            <TaskForm addTask={addData} />
            <TaskList tasks={tasks} onStatusChange={updateTaskStatus} />
        </div>
    )
}