import axiosClient from "../../rest/restClient";
import React from "react";


class AddProductWithListener extends React.Component {
  state = {
    name: '',
    price: null
  }

  nameChange = event => {
    this.setState({ ...this.state, name: event.target.value });
  }

  priceChange = event => {
    this.setState({ ...this.state, price: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axiosClient.post('/products', this.state )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div className="products">
        <div>Add product with listener (deprecated)</div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Product name:
            <input type="text" name="name" onChange={this.nameChange} />
          </label>
          <label>
            Product price:
            <input type="text" name="price" onChange={this.priceChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
}

export default AddProductWithListener