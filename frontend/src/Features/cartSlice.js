import { createSlice } from "@reduxjs/toolkit";

// initailize default value
const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers:{

        // add product to cart 

        addToCart(state, action){
            const product = {...action.payload, quantity: 1};
            state.cartItems.push(product);
            state.totalQuantity += 1;
            state.totalAmount += product.price;
        },

        // remove perticular cart item

        removeCartItem(state, action){
            state.cartItems = state.cartItems.filter((items)=> items.id !== action.payload.id)
        }, 

                // function to clear the cart


        clearCart(state){
            state.cartItems = []
        },


        // function to increase the quantity of the item

        incItemQty(state, action){
            for (var i = 0; i < state.cartItems.length; i++) {
                if (state.cartItems[i].id === action.payload.id) {
                  state.cartItems[i].quantity++;
                }
              }
        }, 

        // function to decrease the quantity of the item

        decItemQty(state, action){
            for (var i = 0; i < state.cartItems.length; i++) {
                if (state.cartItems[i].id === action.payload.id) {
                    if(state.cartItems[i].quantity > 1){
                  state.cartItems[i].quantity--;
                    }else{
                        console.log('dfsfs')
                    }
                }
              }
        }, 
    }

})

export const {addToCart, removeCartItem, clearCart, incItemQty, decItemQty} = cartSlice.actions;

export default cartSlice.reducer;
