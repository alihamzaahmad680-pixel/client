import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");

      if (data.success) {
        setMyOrders(data.orders || []);
      } else {
        toast.error(data.message || "Orders load nahi ho sakay");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Orders sync karne mein masla aya");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 max-w-4xl shadow-sm">
          <p className="text-gray-500 text-lg font-medium">
            Aapka koi order nahi mila.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Shopping shuru karein aur apna pehla order place karein!
          </p>
        </div>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={order._id || `order-${index}`}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl bg-white shadow-sm"
          >
            <div className="flex justify-between md:items-center text-gray-500 pb-3 border-b border-gray-200 mb-4 text-xs md:text-sm max-md:flex-col gap-2">
              <span>
                <strong className="text-gray-700">Order ID:</strong> {order._id}
              </span>
              <span>
                <strong className="text-gray-700">Payment Method:</strong>{" "}
                {order.paymentType}
              </span>
              <span>
                <strong className="text-gray-700">Total Amount:</strong>{" "}
                {currency}
                {order.amount}
              </span>
            </div>

            {order.items.map((item, itemIndex) => (
              <div
                key={item._id || item.product?._id || `item-${itemIndex}`}
                className={`relative bg-white text-gray-500/70 ${order.items.length !== itemIndex + 1 && "border-b"} border-gray-100 flex flex-col md:flex-row md:items-center justify-between py-4 md:gap-16 w-full`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-primary/5 p-2 rounded-lg border border-gray-100">
                    <img
                      src={
                        item.product?.image?.[0] ||
                        item.product?.image ||
                        assets.box_icon
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 px-3">
                      {item.product?.name || "Product Deleted"}
                    </h2>
                    <p className="px-3 text-xs">
                      Category: {item.product?.category || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center mb-4 md:mb-0 text-sm">
                  <p>
                    <span className="font-medium text-gray-700">Quantity:</span>{" "}
                    {item.quantity || "1"}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Status:</span>{" "}
                    <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded text-xs">
                      {order.status || "Order Placed"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Date:</span>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <p className="text-primary text-lg font-medium md:text-right">
                  {currency}
                  {(item.product?.offerPrice || 0) * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
