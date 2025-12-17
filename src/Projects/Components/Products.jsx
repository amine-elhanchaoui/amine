import { Component } from "react";
import Product from "./Product.jsx";

export default class Products extends Component {
    render() {
        const { products } = this.props
        console.log(products)
        return (
            <div className="parent">
                {products.map(({ url, category, title, information }, index) => (
                    <Product
                        key={index}
                        url={url}
                        category={category}
                        title={title}
                        information={information}
                    />
                ))}
            </div>
        );
    }
}
