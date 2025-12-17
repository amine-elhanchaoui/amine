import { useEffect, useState } from "react";
import styled from "styled-components";


export default function Form() {

    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        age: ""
    });

    // useEffect
    useEffect(() => {
        document.title = input.firstname;
    }, [input.firstname]);

    // handleChange
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        // update state
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // handleSubmit
    const handleSubmit = (event) => {
        event.preventDefault();

        // 1. text fields validation
        if (input.firstname.trim() === "" || input.lastname.trim() === "") {
            alert("Tu dois remplir tous les champs !");
            return;
        }

        // 2. date validation
        const today = new Date().toISOString().split("T")[0];
        if (input.age === "") {
            alert("La date est obligatoire !");
            return;
        }
        if (input.age > today) {
            alert("La date ne peut pas être dans le futur !");
            return;
        }

        console.log("Form valid, data:", input);
    };

    let Label=styled.label`
    color:red;
    `;
    let Input=styled.input({
        background:"lightgray",
        color:'darkgray',
        borderRadius:'20px',
        display:'block'

    })

    return (
        <form onSubmit={handleSubmit}>

            <Label>prenom
                <Input
                    type="text"
                    name="firstname"
                    onChange={handleChange}
                />
            </Label>

            <Label>nom
                <Input
                    type="text"
                    name="lastname"
                    onChange={handleChange}
                />
            </Label>

            <Label>date
                <Input
                    type="date"
                    name="age"
                    onChange={handleChange}
                />
            </Label>

            <Input type="submit" value="submit" />
        </form>
    );
}
