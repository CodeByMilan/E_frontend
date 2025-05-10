import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import "./index.css";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import PaymentSuccess from "./pages/checkout/PaymentSuccess";
import Home from "./pages/home/Home";
import MyOrderDetails from "./pages/orders/MyOrderDetails";
import { MyOrders } from "./pages/orders/MyOrders";
import Product from "./pages/product/Product";
import SingleProduct from "./pages/singlePage/SingleProduct";
import store from "./store/store";
import Protected from "./validation/Protected";

export const socket = io("http://localhost:3000", {
  auth: {
    token: localStorage.getItem("token"),
  },
});
function App() {
 
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product/>}/>
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/myorders" element={<Protected><MyOrders /></Protected>} />
            <Route path="/myorders/:id" element={<Protected><MyOrderDetails /></Protected>} />
            <Route path="/success" element={<PaymentSuccess />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
