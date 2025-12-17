import { useEffect, useState, useRef } from "react";

export default function Cnt(){
    const [number, setNumber] = useState(0);
    const intervalIdRef = useRef(null);
    
    const increment = () => {
        setNumber(prev => prev + 1);
    };
    
    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            increment();
        }, 3000);
        console.log('mount');
        
        return () => {
            if (intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
                console.log('unmount!');
            }
        };
    }, []);
    
    useEffect(() => {
        console.log('update!');
    }, [number]);
    
    return (
    <>
        <p>{number}</p>
        <button onClick={increment}>increment</button>
    </>
    );
}