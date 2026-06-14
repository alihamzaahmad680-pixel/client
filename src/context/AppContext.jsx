import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  // import.meta.env.VITE_BACKEND_URL || "https://server-kohl-nine-68.vercel.app/";
  import.meta.env.VITE_BACKEND_URL || "server-kohl-nine-68.vercel.app";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "Rs ";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.log("Product fetch failed:", err.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
        const sellerStatus = data.user.isSeller || false;
        setIsSeller(sellerStatus);
        localStorage.setItem("isSeller", sellerStatus);

        if (data.user.cartItems) {
          setCartItems(data.user.cartItems);
        }
      }
    } catch (err) {
      console.log("User data fetch failed:", err.message);
    }
  };

  const addToCart = async (id) => {
    let updatedCart = {};
    setCartItems((prev) => {
      updatedCart = { ...prev };
      updatedCart[id] = (updatedCart[id] || 0) + 1;
      return updatedCart;
    });
    toast.success("Added to cart 🛒");

    if (user) {
      try {
        await axios.post("/api/cart/update", {
          cartItems: updatedCart,
        });
      } catch (error) {
        console.log("Cart sync error:", error.message);
      }
    }
  };

  const removeFromCart = async (id) => {
    let updatedCart = {};
    setCartItems((prev) => {
      updatedCart = { ...prev };
      if (!updatedCart[id]) return prev;

      updatedCart[id] -= 1;
      if (updatedCart[id] <= 0) delete updatedCart[id];
      return updatedCart;
    });
    toast.success("Removed ❌");

    if (user) {
      try {
        await axios.post("/api/cart/update", {
          cartItems: updatedCart,
        });
      } catch (error) {
        console.log("Cart sync error:", error.message);
      }
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        navigate,
        currency,
        user,
        setUser,
        isSeller,
        setIsSeller: (value) => {
          setIsSeller(value);
          localStorage.setItem("isSeller", value);
        },
        showUserLogin,
        setShowUserLogin,
        products,
        setProducts,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        getCartCount,
        axios,
        fetchProducts,
        fetchUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
