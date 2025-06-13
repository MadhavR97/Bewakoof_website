import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Product from "./pages/product"
import SingleProduct from "./pages/singleProduct"
import Wishlist from "./pages/wishlist"
import Cart from "./pages/cart"
import PrivateRoute from "./PrivateRoute/PrivateRoute"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/product/:id" element={<SingleProduct />}></Route>
          <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>}></Route>
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
