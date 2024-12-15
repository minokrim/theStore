import './App.css';
// import Home from './home/home';
import Body from './homebody/body';
import { HashRouter,Route,Routes } from "react-router-dom";
import Product from './product/product';
import Signin from './signin/signin';
import Catbody from './categories/catbody';
import Wishlist from './wishcart/wishlist';
import Cart from './wishcart/cart';
function App() {
  return (
    <HashRouter>
    <Routes>
    <Route path="/" element={<Body/>}/>
    <Route path="/product/:id/:category" element={<Product/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/Category/:id/" element={<Catbody/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
    <Route path="/cart" element={<Cart/>}/>
    </Routes>
  </HashRouter>
  );
}

export default App;
