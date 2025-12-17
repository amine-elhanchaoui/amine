import { Component } from "react";

export default class Inscription extends Component {
    constructor() {

        super()
        this.state = { value: '' }
    }
    handlsubmit = (event) => { event.preventDefault() }
    handlchanges = (event) => {
        this.setState({ value: event.target.value })
    }
    handlpass = (event) => {
        let password = event.target.value;
        password.length < 4 ? alert('invalid password') : alert('Good')
    }

    render() {
        return (

            <form action="" onSubmit={this.handlsubmit}>
                nom:
                <input type="text" onChange={this.handlchanges} />
                prenom:
                <input type="text" onChange={this.handlchanges} />
                password:
                <input type="password" onChange={this.handlpass} />

            </form>
        )
    }
}