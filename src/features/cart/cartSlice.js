import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "shopping-cart",
  initialState: { cartItems: [] },
  reducers: {
    addtoCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );

      if (existingItem) {
        if (existingItem.qty < 5) {
          existingItem.qty += 1;
        }
      } else {
        state.cartItems.push(action.payload);
      }

      // Update localStorage after modifying the cart
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    loadFromLocalStorage: (state) => {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        state.cartItems = JSON.parse(savedCart);
      }
    },

    removeCart: (state, action) => {
      const id = action.payload.id;

      state.cartItems = state.cartItems.filter((cart) => cart.id !== id);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    updateQty: (state, action) => {
      const { id, qty, operation } = action.payload;

      //find the product by id
      const item = state.cartItems.find((item) => item.id === id);

      if (operation === "decrease" && qty > 1) {
        item.qty -= 1;
      }
      if (operation === "increase" && qty < 5) {
        item.qty += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addtoCart, loadFromLocalStorage, removeCart, updateQty } =
  cartSlice.actions;

export default cartSlice.reducer;
