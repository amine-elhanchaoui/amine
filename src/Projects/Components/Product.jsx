import React, { Component } from 'react';
import './product.css'
class Product extends Component {
    constructor(props) {
        super(props)
        
    }
    render() {
        const { url,category ,title, information } = this.props;
        return <div className="card">
                        <img className="card-img-top" src={url} alt={category}/>
                        <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                            <p className="card-text">{information}</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                </div>
        
         
        }
        }


export default  Product