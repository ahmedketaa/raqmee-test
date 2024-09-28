import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Products from './pages/products';
import Header from './components/Header';
import AddProduct from './pages/AddProduct';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import { saveProducts } from './utilities/saveProducts';
import products from './data/products';
function App() {
  if (!localStorage.getItem('products')) {
    saveProducts(products)
  }
  return (
    <div className="">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/add-product' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
