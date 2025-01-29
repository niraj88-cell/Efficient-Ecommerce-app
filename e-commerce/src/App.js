import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Productlist from './components/Product_List/Productlist';
import Register from './components/Register/Register';
import Order from './components/Order/Order';
import Product from './components/Product/Product';
import Login from './components/Login/Login'; // Assuming you have a Login component
import { useSelector } from 'react-redux';

function App() {
  const user=useSelector(state=>state.user.currentUser);
  console.log("currentUser",user); // Set this to true to simulate a logged-in user

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<Productlist />} />
        <Route path="/products/:category" element={<Product />} />
        {/* Conditional route based on user login status */}
        <Route path="/cart" element={user ? <Order /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
