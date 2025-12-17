import { Component } from "react";
import Conteur from "./Conteur";

export default class Appconteur extends Component{
    constructor(){
        super()
        this.state = { isDisplay:true }
    }
    ChageDisplay=()=>{this.state.isDisplay===true?this.setState({isDisplay:false}):this.setState({isDisplay:true})}
    render(){
        return <div>
            <button disabled={!this.state.isDisplay} onClick={this.ChageDisplay }>hidde</button>
            <button disabled={this.state.isDisplay} onClick={this.ChageDisplay }>show</button>
            {this.state.isDisplay===true?<Conteur/>:null}
        </div>
    }


}