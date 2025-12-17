import { Component } from "react";

export default class Conteur extends Component{
    constructor(){
        super()
        this.state={
            conteur:0
        }
        
        
    }
    increment=()=>{this.setState({conteur:this.state.conteur+1})}
    decrement=()=>{this.setState({conteur:this.state.conteur-1})}
    componentDidMount(){
        console.log('componentDidMount')
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }
    render(){
        return <div>
            <button onClick={this.increment}>+</button>
            <button onClick={this.decrement}>-</button>
            <p>{this.state.conteur}</p>
        </div>
    }
    
}