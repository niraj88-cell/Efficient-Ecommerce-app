import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        cart: [],
        quantity: 0,
        total: 0,
        error: false,  // Error state is still useful
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            // state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },

        cartStart: (state) => {
            state.cart = null;
            state.error = false;
        },
        cartSuccess: (state, action) => {
            state.cart = action.payload;
      
            state.error = false;
        },
        cartFailure: (state) => {
            state.cart = null;
            state.error = true;
        }
    }
});

export const { addProduct, cartStart, cartSuccess, cartFailure } = cartSlice.actions;
export default cartSlice.reducer;
