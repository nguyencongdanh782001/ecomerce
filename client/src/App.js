import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Cart from "./feature/pages/Cart";
import Home from "./feature/pages/Home";
import Login from "./feature/pages/Login";
import ProductDetail from "./feature/pages/ProductDetail";
import ProductList from "./feature/pages/ProductList";
import Register from "./feature/pages/Register";
import SearchProduct from "./feature/pages/Search";
import Success from "./feature/pages/Success";
import { getUser } from "./feature/redux/userRedux";
import AuthRoute from "./routes/AuthRoute";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    const getCurrentUser = async () => {
      await dispatch(getUser());
    };
    getCurrentUser();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/" element={<SearchProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
