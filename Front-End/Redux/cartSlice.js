const initialStateCart = {
  cartArray: [],
  total: 0,
};

const addToCart = "ADD_TO_CART";
const removeFromCart = "REMOVE_FROM_CART";
const clearCart = "CLEAR_CART";

export const cartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case addToCart: {
      const product = action.payload;
      // Check if product is already in the cart
      const existingProduct = state.cartArray.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // If the product exists, increment the quantity
        const updatedCart = state.cartArray.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
        return { ...state, cartArray: updatedCart };
      } else {
        // If the product doesn't exist, add it with quantity 1
        const updatedCart = [...state.cartArray, { ...product, quantity: 1 }];
        return { ...state, cartArray: updatedCart };
      }
    }
    case removeFromCart: {
      const productId = action.payload;
      // Find the index of the product in the cart
      const index = state.cartArray.findIndex((item) => item._id === productId);

      if (index !== -1) {
        const product = state.cartArray[index];
        // Decrease the quantity or remove the item if quantity is 1
        let updatedCart;
        if (product.quantity > 1) {
          updatedCart = state.cartArray.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          updatedCart = state.cartArray.filter(
            (item) => item._id !== productId
          );
        }
        return { ...state, cartArray: updatedCart };
      }
      return state;
    }
    case clearCart: {
      return initialStateCart;
    }
  }
};

export const addItem = (item) => {
  return {
    type: addToCart,
    payload: item,
  };
};
export const removeItem = (itemId) => {
  return {
    type: removeFromCart,
    payload: itemId,
  };
};
export const clearItem = () => {
  return {
    type: clearCart,
  };
};
