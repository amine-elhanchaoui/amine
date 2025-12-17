import { useEffect, useState } from "react";
import styled from "styled-components";
import './list.css';
let Habit = styled.li`
        background:${props => props.statue ? "lightgrey" : "lightgreen"};
        padding: 10px;
    border-radius: 15px;
    color: darkgrey;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover{
    transform: scale(1.02) translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
    }
    `;
let Button = styled.button`
    background: ${props => props.statue ? "red" : "green"};
    color: white;
    border: none;
    padding: 8px 10px;
    margin:5px;
    border-radius: 8px;
    cursor: pointer;
    transition: transform .12s ease, opacity .12s ease;
    &:hover{ transform: translateY(-2px); opacity: .95 }
`;
export default function Listhabits({ habit }) {
    const [data, setData] = useState([])
    const [statues, setStatues] = useState({}) // Track done status per habit

    useEffect(() => {
        setData(habit || [])
    }, [habit])

    console.log(data)
    const toggleStatus = (index) => {
        setStatues(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <ul>
            {
                data.map((h, index) => (
                    <Habit key={index} statue={statues[index]}>
                        <p>{h}</p>
                        <Button statue={statues[index]} onClick={() => toggleStatus(index)}>
                            {!statues[index] ? 'Done' : 'Mark done'}
                        </Button>
                    </Habit>
                ))
            }
        </ul>
    )
}