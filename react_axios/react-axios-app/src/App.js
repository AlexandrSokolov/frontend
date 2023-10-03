import Products from './components/products/Products'
import Users from "./components/users/Users";
import ProductsWithListener from "./components/products/ProductsWithListener";
import AddProductWithListener from "./components/products/AddProductWithListener";

function App() {
  return (
    <div className="App">
      <Products/>
      <Users/>
      <AddProductWithListener />
      <ProductsWithListener/>
    </div>
  );
}

export default App;
