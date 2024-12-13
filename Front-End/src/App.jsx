import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Screens/Home/Home.jsx";
import MenuPage from "./Screens/Menu/Menu.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./Layout.jsx";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* Ensure ReactQueryDevtools is inside QueryClientProvider */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
