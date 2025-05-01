// jay dinesh bhagat na navkhand neja vada meldi maa.

import "./App.css";
import Categories from "./pages/Categories";
import Hero from "./section/Home/Hero";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import DetailView from "./pages/detailView";
import CartItem from "./pages/CartItem";
import FoodItem from "./section/categories/FoodItem";
import Restaurants from "./section/Home/Restaurants";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { Bounce, ToastContainer } from "react-toastify";
import { ROUTES } from "../src/constant/constant";
import SearchPage from "./pages/SearchPage";
import OrderPage from "./pages/OrderPage";
import OrderSummary from "./section/orderView/OrderSummary";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentFail from "./section/orderView/PaymentFail";
import PaymentSuccess from "./section/orderView/PaymentSuccess";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Hero />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path={ROUTES.SEARCH} element={<SearchPage />} />
            <Route path={ROUTES.RESTAURANT} element={<Restaurants />} />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.DETAILVIEW} element={<DetailView />} />
            <Route path={ROUTES.FOODITEM} element={<FoodItem />} />
            <Route path={ROUTES.CART} element={<CartItem />} />
            <Route path={ROUTES.AUTH} element={<AuthPage />} />
            <Route path={ROUTES.ORDER} element={<OrderPage />} />
            <Route path={ROUTES.ORDERSUMMARY} element={<OrderSummary />} />
            <Route path={ROUTES.PAYMENTFAIL} element={<PaymentFail />} />
            <Route path={ROUTES.PAYMENTSUCCESS} element={<PaymentSuccess />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

      <ToastContainer
        aria-label="notification"
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
