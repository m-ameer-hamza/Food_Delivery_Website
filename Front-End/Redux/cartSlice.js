const initialStateCart = {
  cartArray: [],
  total: 0,
  totalItems: 0,
};

const addToCart = "ADD_TO_CART";
const removeFromCart = "REMOVE_FROM_CART";
const clearCart = "CLEAR_CART";
const deleteItem = "DELETE_ITEM";

const calcTotal = "CALC_TOTAL";

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
        return {
          ...state,
          cartArray: updatedCart,
          totalItems: state.totalItems + 1,
        };
      }
    }
    case removeFromCart: {
      const productId = action.payload;
      // Find the index of the product in the cart
      const index = state.cartArray.findIndex((item) => item._id === productId);

      if (index !== -1) {
        const product = state.cartArray[index];
        let updatedCart;
        let updatedTotalItems = state.totalItems;

        // Decrease the quantity or remove the item if quantity is 1
        if (product.quantity > 1) {
          updatedCart = state.cartArray.map((item) =>
            item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          // totalItems remains the same because the product is not removed completely
        } else {
          updatedCart = state.cartArray.filter(
            (item) => item._id !== productId
          );
          updatedTotalItems -= 1; // Decrease totalItems because the product is removed
        }

        return {
          ...state,
          cartArray: updatedCart,
          totalItems: updatedTotalItems,
        };
      }
      return state;
    }

    case clearCart: {
      return initialStateCart;
    }

    case deleteItem: {
      const productId = action.payload;
      // Filter out the product from the cart
      const updatedCart = state.cartArray.filter(
        (item) => item._id !== productId
      );

      // Decrease totalItems count by 1 since one item is completely removed
      const updatedTotalItems = state.totalItems - 1;

      return {
        ...state,
        cartArray: updatedCart,
        totalItems: updatedTotalItems,
      };
    }
    case calcTotal: {
      const total = state.cartArray.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      return {
        ...state,
        total: Math.round(total),
      };
    }

    default:
      return state;
  }
};

export const incItemQuantity = (item) => {
  return {
    type: addToCart,
    payload: item,
  };
};
export const decItemQuantity = (itemId) => {
  return {
    type: removeFromCart,
    payload: itemId,
  };
};
export const removeItem = (itemId) => {
  return {
    type: deleteItem,
    payload: itemId,
  };
};
export const calcTotalPrice = () => {
  return {
    type: calcTotal,
  };
};
export const cartClear = () => {
  return {
    type: clearCart,
  };
};
