import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import { useState } from "react";
import { useSelector } from "react-redux";

function App() {
  // Simulating a logged-in user. Replace with actual authentication logic.
 const user=useSelector(state=>state.user.currentUser);

  return (
    <Router>
      {/* Conditional Topbar and Sidebar rendering */}
      {user && <Topbar />}

      <div className="container">
        {user && <Sidebar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          
          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
