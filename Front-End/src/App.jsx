import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/Home/Home.jsx";
import MenuPage from "./Screens/Menu/Menu.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./Layout.jsx";
import SignUp from "./Screens/SignUp/SignUp.jsx";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* Ensure ReactQueryDevtools is inside QueryClientProvider */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
