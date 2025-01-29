import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { cartFailure, cartStart, cartSuccess } from "./cartRedux";
import { userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  console.log('Attempting to login with:', user); // Log the user data
  dispatch(loginStart());
  
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", user);
    console.log('Login successful:', res.data); // Log the response data
    dispatch(loginSuccess(res.data));
  } catch (err) {
    const errorMessage = err.response ? err.response.data : err.message;
    console.error('Login error:', errorMessage); // Log any errors with detailed message
    dispatch(loginFailure());
  }
};

export const insertCart = async (dispatch, cart) => {
  dispatch(cartStart());
  try {
    const res = await userRequest.post("/cart", cart);
    console.log('Cart insertion successful:', res.data); // Verify success
    dispatch(cartSuccess(res.data));
  } catch (err) {
    console.error("Insert cart error:", err.response ? err.response.data : err.message);
    dispatch(cartFailure());
  }
};

