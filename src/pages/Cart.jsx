import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    cartItems,
    setCartItems,
    currency,
    removeFromCart,
    navigate,
    axios,
    user,
  } = useAppContext();

  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]); // Saved addresses list
  const [selectedAddress, setSelectedAddress] = useState(null); // Selected shipping address

  
  const [paymentMethod, setPaymentMethod] = useState("COD");

 
  const cartProducts = products.filter((product) => cartItems[product._id]);


  const getTotal = () => {
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.offerPrice * cartItems[product._id];
    });
    return total;
  };


  const fetchUserAddresses = async () => {
    try {
      const { data } = await axios.post("/api/address/get");
      if (data.success && data.addresses.length > 0) {
        setAddresses(data.addresses);
        setSelectedAddress(data.addresses[0]);
      }
    } catch (error) {
      console.log("Error fetching addresses:", error.message);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      return toast.error("Please add or select a delivery address first!");
    }
    if (cartProducts.length === 0) {
      return toast.error("Your cart is empty!");
    }

    try {
      const orderData = {
        address: selectedAddress._id,
        items: cartProducts.map((product) => ({
          product: product._id,
          quantity: cartItems[product._id],
        })),
      };

      if (paymentMethod === "Stripe") {
        const { data } = await axios.post("/api/order/stripe", orderData);

        if (data.success) {
          toast.loading("Redirecting to Stripe Checkout... 💳");
          window.location.replace(data.url);
        } else {
          toast.error(data.message || "Stripe session creation failed");
        }
      } else {
        const { data } = await axios.post("/api/order/cod", orderData);

        if (data.success) {
          toast.success("Order Placed Successfully! 🎉");
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log("Order placement failed:", error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {cartProducts.length} Items
          </span>
        </h1>

       
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

       
        {cartProducts.length === 0 ? (
          <p className="text-gray-500 py-10 text-lg">Your cart is empty.</p>
        ) : (
          cartProducts.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3 border-b border-gray-100 pb-3"
            >
              <div className="flex items-center gap-3 md:gap-6">
                <div className="w-24 h-24 border border-gray-300 rounded overflow-hidden">
                  <img
                    src={product.image[0] || product.image}
                    className="w-full h-full object-cover"
                    alt={product.name}
                  />
                </div>

                <div>
                  <p className="font-semibold text-black">{product.name}</p>
                  <p className="text-gray-500/70">
                    Size: {product.size || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Qty: {cartItems[product._id]}
                  </p>
                </div>
              </div>

              <p className="text-center text-black">
                {currency}
                {product.offerPrice * cartItems[product._id]}
              </p>

              <button
                onClick={() => removeFromCart(product._id)}
                className="mx-auto text-red-500 cursor-pointer"
              >
                <img
                  src={assets.remove_icon}
                  alt="Remove"
                  className="w-6 h-6"
                />
              </button>
            </div>
          ))
        )}

        <button
          onClick={() => navigate("/all-products")}
          className="mt-8 text-primary font-medium cursor-pointer"
        >
          &larr; Continue Shopping
        </button>
      </div>

     
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70 h-fit">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-5 border-gray-300" />

 
        <div className="mb-6 relative">
          <p className="text-sm font-medium uppercase">Delivery Address</p>

          <div className="flex justify-between items-start mt-2">
            {selectedAddress ? (
              <div className="text-sm text-gray-700 bg-white p-2 rounded border border-gray-200 w-[75%]">
                <p className="font-semibold">
                  {selectedAddress.firstName} {selectedAddress.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {selectedAddress.street}, {selectedAddress.city}
                </p>
                <p className="text-xs text-gray-500">{selectedAddress.phone}</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No address found</p>
            )}

            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline text-sm cursor-pointer"
            >
              Change
            </button>
          </div>

         
          {showAddress && (
            <div className="absolute top-16 w-full bg-white border border-gray-300 text-sm z-10 shadow-lg max-h-48 overflow-y-auto rounded">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className={`p-2 hover:bg-gray-100 cursor-pointer border-b last:border-0 ${
                    selectedAddress?._id === addr._id
                      ? "bg-primary/5 font-medium"
                      : ""
                  }`}
                >
                  <p>
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {addr.street}, {addr.city}
                  </p>
                </div>
              ))}

              <p
                onClick={() => {
                  setShowAddress(false);
                  navigate("/add-address");
                }}
                className="p-2 text-primary text-center hover:bg-primary/10 cursor-pointer font-medium bg-gray-50"
              >
                + Add New Address
              </p>
            </div>
          )}

      
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full bg-white border border-gray-300 px-3 py-2 mt-2 outline-none rounded text-sm cursor-pointer"
          >
            <option value="COD">Cash On Delivery (COD)</option>
            <option value="Stripe">Stripe (Card Payment)</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getTotal()}
            </span>
          </p>

          <p className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
          </p>

          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getTotal() * 0.02).toFixed(2)}
            </span>
          </p>

          <p className="flex justify-between text-base font-semibold text-black pt-2 border-t border-dashed border-gray-300">
            <span>Total:</span>
            <span>
              {currency}
              {(getTotal() + getTotal() * 0.02).toFixed(2)}
            </span>
          </p>
        </div>

     
        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition rounded shadow cursor-pointer uppercase text-sm"
        >
          {paymentMethod === "Stripe" ? "Pay with Stripe" : "Place Order (COD)"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
