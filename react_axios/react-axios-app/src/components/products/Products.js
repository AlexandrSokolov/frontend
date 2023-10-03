import axiosClient from "../../rest/restClient";
import {useEffect, useState} from "react";


function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function getProducts() {
      const response = await axiosClient.get("/products");
      setProducts(response.data);
    }
    getProducts();
  }, []);

  return (
    <div className="products">
      <div>Products</div>
      {products && products.map(product =>
        <li key={product.id}>
          <span>id: </span><span>{product.id} </span>
          <span>name: </span><span>{product.name} </span>
          <span>price: </span><span>{product.price} </span>
        </li>
      )}
    </div>
  )
}

export default Products