import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { encryptTransform } from "redux-persist-transform-encrypt";

import { authReducer } from "./authSlice";
import { userReducer } from "./userSlice";
import { cartReducer } from "./cartSlice";

// 1. setting up the encryptor
const encryptor = encryptTransform({
  secretKey: "your-strong-secret-key", // Replace with a strong key
  onError: function (error) {
    console.error("Encryption error:", error);
  },
});

// 2. Persist Config for `authReducer` and `userReducer`
const authPersistConfig = {
  key: "auth", // Key under which the encrypted data will be stored
  storage,
  transforms: [encryptor], // Apply encryption
};

const userPersistConfig = {
  key: "user", // Key under which the encrypted data will be stored
  storage,
  transforms: [encryptor], // Apply encryption
};

// 3. Persist Config for `cartReducer`
const cartPersistConfig = {
  key: "cart", // Key under which the cart data will be stored
  storage, // Use localStorage for cart (no encryption)
};

// 4. Wrap reducers with `persistReducer` as needed
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // Encrypted storage for auth
  user: persistReducer(userPersistConfig, userReducer), // Encrypted storage for user
  cart: persistReducer(cartPersistConfig, cartReducer), // LocalStorage for cart
});

// 5. Create the store with the persisted root reducer
const store = createStore(rootReducer);

// 6. Persist the store
export const persistor = persistStore(store);

export default store;
