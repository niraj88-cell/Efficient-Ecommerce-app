// userRedux.js
import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: "product",
    initialState: {
     products: [],
      isFetching: false,
      error: false,
    },
     reducers:{
        //GET ALL
        getProductsStart:(state)=>{
            state.isFetching=true
            state.error=false
        },
        getProductsSuccess:(state,action)=>{
            state.products=action.payload
            state.isFetching=false
            state.error=false
        },
        getProductsFailure:(state)=>{
         
            state.isFetching=false
            state.error=true
        },

        UpdateProductsStart:(state)=>{
            state.isFetching=false
            state.error=false
        },
        UpdateProductsSuccess:(state,action)=>{
            state.products=action.payload
            state.isFetching=false
            state.error=false
        },
        UpdateProductsFailure:(state)=>{
            state.isFetching=false
            state.error=false
        },
        InsertProductsStart:(state)=>{
            state.isFetching=false
            state.error=false
        },
        InsertProductsSuccess:(state,action)=>{
            state.products=action.payload
            state.isFetching=false
            state.error=false
        },
        InsertProductsFailure:(state)=>{
            state.isFetching=false
            state.error=false
        },





     }
  });
  
  export const {InsertProductsStart,InsertProductsSuccess,InsertProductsFailure,UpdateProductsStart,UpdateProductsSuccess,UpdateProductsFailure, getProductsStart, getProductsSuccess, getProductsFailure} = productSlice.actions;
  export default productSlice.reducer;
  