
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin, 
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();

  
  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-[100]">
      <NavLink to="/" className="flex items-center gap-2">
        <img src={assets.logo} alt="Logo" />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-products">All Products</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        {/* SEARCH BAR */}
        <div className="hidden lg:flex items-center border border-gray-300 px-3 rounded-full">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search products"
            className="py-1.5 bg-transparent outline-none"
          />
          <img src={assets.search_icon} className="w-4 h-4" alt="Search" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} className="w-6 opacity-80" alt="Cart" />
          <span className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

       
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-8 py-2 bg-primary text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="Profile"
            />

            <ul className="hidden group-hover:block absolute right-0 top-10 bg-white shadow border rounded-md w-40 text-sm text-gray-700">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

    
      <div className="flex items-center gap-6 sm:hidden">
        {/* CART */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img src={assets.cart_icon} className="w-6 opacity-80" alt="Cart" />
          <span className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* MENU */}
        <button onClick={() => setOpen(!open)}>
          <img src={assets.menu_icon} className="w-6 h-6" alt="Menu" />
        </button>
      </div>

    
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-5 text-sm sm:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/all-products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 bg-primary text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="px-6 py-2 bg-primary text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
