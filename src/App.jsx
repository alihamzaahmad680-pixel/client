// // import { Navbar } from "./components/Navbar";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import { Route, Routes } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
// import { Login } from "./components/Login";
// import { useAppContext } from "./context/AppContext";
// import { AllProducts } from "./pages/AllProducts";
// import ProductCategory from "./pages/ProductCategory";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import AddAdress from "./pages/AddAdress";
// import MyOrders from "./pages/MyOrders";
// import SellerLogin from "./components/Seller/SellerLogin";
// import SellerLayout from "./pages/Seller/SellerLayout";
// import ProductList from "./pages/Seller/ProductList";
// import Orders from "./pages/Seller/Orders";
// import AddProduct from "./pages/Seller/AddProduct";
// export const App = () => {
//   const isSellerPath = useLocation().pathname.includes("seller");
//   const { showUserLogin, isSeller } = useAppContext();
//   return (
//     <div className="text-default min-h-screen text-gray-700 bg-white">
//       {isSellerPath ? null : <Navbar />}
//       {showUserLogin ? <Login /> : null}
//       <Toaster />
//       <div
//         className={`px-6 md:px-16 lg:px-24 xl:px-32 ${isSellerPath ? "bg-blue-100" : "bg-gray-100"}`}
//       >
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/all-products" element={<AllProducts />} />
//           <Route path="/all-products/:category" element={<ProductCategory />} />
//           <Route path="/products/:category/:id" element={<ProductDetail />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/add-address" element={<AddAdress />} />
//           <Route path="/my-orders" element={<MyOrders />} />
//           <Route
//             path="/seller"
//             element={isSeller ? <SellerLayout /> : <SellerLogin />}
//           >
//             <Route index element={<AddProduct />} />
//             <Route path="product-list" element={<ProductList />} />
//             <Route path="orders" element={<Orders />} />
//           </Route>
//         </Routes>
//       </div>
//       {!isSellerPath && <Footer />}
//     </div>
//   );
// };
// export default App;
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components & Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Login } from "./components/Login";
import Home from "./pages/Home";
import { AllProducts } from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AddAdress from "./pages/AddAdress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerLayout from "./pages/Seller/SellerLayout";
import ProductList from "./pages/Seller/ProductList";
import Orders from "./pages/Seller/Orders";
import AddProduct from "./pages/Seller/AddProduct";

// Context
import { useAppContext } from "./context/AppContext";

export const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller, fetchUserData } = useAppContext();

  // Page refresh hone par session check karega
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      
      <div
        className={`px-6 md:px-16 lg:px-24 xl:px-32 ${
          isSellerPath ? "bg-blue-100" : "bg-gray-100"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/all-products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAdress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;