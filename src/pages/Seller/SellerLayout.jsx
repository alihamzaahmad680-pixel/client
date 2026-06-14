import { NavLink, Link, Outlet, data } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const {axios,navigate } = useAppContext();

  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: assets.add_icon,
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
  ];

  const logout =async () => {
    try {
      const {data} = await axios.get('/api/seller/logout')
      if (data.success) {
      toast.success("Logged out successfully");
      navigate("/");
      }
      else{
        toast.error(data.message)
        
      }
      
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b shadow-sm">
        <Link to="/">
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 md:w-36 cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-4">
          <p className="text-gray-600 font-medium">
            Hi, <span className="text-primary">Admin</span>
          </p>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm border rounded-full hover:bg-red-50 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 bg-white border-r min-h-[calc(100vh-73px)]">
          <div className="py-4">
            {sidebarLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/seller"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 transition-all duration-200
                  ${
                    isActive
                      ? "bg-primary/10 text-primary border-r-4 border-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6" />

                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
