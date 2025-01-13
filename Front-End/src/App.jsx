import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/Home/Home.jsx";
import MenuPage from "./Screens/Menu/Menu.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./Layout.jsx";
import SignUp from "./Screens/Authentication/SignUp.jsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./Screens/Profile/EditProfile.jsx";
import Cart from "./Screens/Cart/Cart.jsx";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../Redux/store.js";
import PaymentSuccess from "./Screens/Checkout/PaymentSuccess.jsx";
import PaymentFailure from "./Screens/Checkout/PaymentFaliure.jsx";
import VerifyEmail from "./Screens/Authentication/VerifyEmail.jsx";
import Login from "./Screens/Authentication/Login.jsx";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PersistGate loading={<p>Loading.....</p>} persistor={persistor}>
            <Layout>
              <ToastContainer
                position="top-right"
                style={{ marginTop: "2rem", zIndex: 1000 }}
              />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/userProfile" element={<EditProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<PaymentSuccess />} />
                <Route path="/cancel" element={<PaymentFailure />} />
                <Route path="/verifyEmail" element={<VerifyEmail />} />
                <Route path="*" element={<h1>Not Found</h1>} />
              </Routes>
            </Layout>
          </PersistGate>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
