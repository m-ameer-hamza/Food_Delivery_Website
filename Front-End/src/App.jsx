import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/Home/Home.jsx";
import MenuPage from "./Screens/Menu/Menu.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./Layout.jsx";
import SignUp from "./Screens/SignUp/SignUp.jsx";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./Screens/Profile/EditProfile.jsx";
import Cart from "./Screens/Cart/Cart.jsx";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../Redux/store.js";
import CheckOut from "./Screens/Checkout/CheckOut.jsx";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PersistGate loading={<p>Loading.....</p>} persistor={persistor}>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/userProfile" element={<EditProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/checkout" element={<CheckOut />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Layout>
          </PersistGate>
        </BrowserRouter>
        {/* Ensure ReactQueryDevtools is inside QueryClientProvider */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </Provider>
  );
};

export default App;
