import axiosClient from "../../rest/restClient";
import React from "react";


class ProductsWithListener extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    axiosClient.get("/products")
      .then(response => {
        const products = response.data;
        this.setState({ products }); //ES6 shorten for this.setState({ products: products })
      })
  }

  render() {
    return (
      <div className="products">
        <div>Products with listener (deprecated)</div>
        {this.state.products && this.state.products.map(product =>
          <li key={product.id}>
            <span>id: </span><span>{product.id} </span>
            <span>name: </span><span>{product.name} </span>
            <span>price: </span><span>{product.price} </span>
          </li>
        )}
      </div>
    )
  }
}

export default ProductsWithListener