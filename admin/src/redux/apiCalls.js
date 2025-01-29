// apiCalls.js
import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getProductsFailure, getProductsStart, getProductsSuccess, UpdateProductsStart, UpdateProductsSuccess,UpdateProductsFailure, InsertProductsStart, InsertProductsSuccess, InsertProductsFailure } from "./productRedux";
import { publicRequest, userRequest } from "../requestMethod";


export const login = async (dispatch, user) => {
    console.log('Attempting to login with:', user); // Log the user data
    dispatch(loginStart());

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", user);
      console.log('Login successful:', res.data); // Log the response data
      dispatch(loginSuccess(res.data));
    } catch (err) {
      console.error('Login error:', err); // Log any errors
      dispatch(loginFailure());
    }
};
export const getProducts = async (dispatch) => {

  dispatch(getProductsStart());

  try {
    const res = await userRequest.get("/product/find");
    console.log('Login successful:', res.data); // Log the response data
    dispatch(getProductsSuccess(res.data));
  } catch (err) {
    console.error('Login error:', err); // Log any errors
    dispatch(getProductsFailure());
  }
};


export const updateProducts = async (dispatch,product) => {

  dispatch(UpdateProductsStart());

  try {
    const res = await userRequest.put(`/product/${product.id}`,product);
    console.log('Login successful:', res.data); // Log the response data
    dispatch(UpdateProductsSuccess(res.data));
  } catch (err) {
    console.error('Login error:', err); // Log any errors
    dispatch(UpdateProductsFailure());
  }
};

export const InsertProducts = async (dispatch,product) => {

  dispatch(InsertProductsStart());

  try {
    const res = await userRequest.post("/product/",product);
    console.log('Login successful:', res.data); // Log the response data
    dispatch(InsertProductsSuccess(res.data));
  } catch (err) {
    console.error('Login error:', err); // Log any errors
    dispatch(InsertProductsFailure());
  }
};

