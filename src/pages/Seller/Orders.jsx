import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Seller orders sync nahi ho sakay");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List (Admin)</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">Filhal koi order mojud nahi hai.</p>
        ) : (
          orders.map((order, index) => (
            <div
              key={order._id || index}
              className="flex flex-col md:flex-row md:items-center gap-5 p-5 justify-between max-w-4xl rounded-md border border-gray-300 bg-white shadow-sm"
            >
              {/* LEFT SIDE - ITEMS */}
              <div className="flex gap-5 max-w-80">
                <img
                  className="w-12 h-12 object-cover rounded bg-gray-100 p-1"
                  src={assets.box_icon}
                  alt="boxIcon"
                />
                <div className="flex flex-col gap-1 text-sm">
                  {order.items.map((item, i) => (
                    <p key={i} className="font-medium text-gray-800">
                      {item.product?.name || "Deleted Product"}{" "}
                      {item.quantity > 1 && (
                        <span className="text-primary font-semibold">
                          x {item.quantity}
                        </span>
                      )}
                    </p>
                  ))}
                </div>
              </div>

            
              <div className="text-xs md:text-sm text-black/60">
                <p className="text-black/80 font-semibold">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p>
                  {order.address?.street}, {order.address?.city}
                </p>
                <p>
                  {order.address?.state}, {order.address?.zipcode},{" "}
                  {order.address?.country}
                </p>
                <p className="font-medium text-gray-700">
                  {order.address?.phone}
                </p>
              </div>

          
              <p className="font-semibold text-lg text-gray-900">
                {currency}
                {order.amount}
              </p>

          
              <div className="flex flex-col text-xs text-gray-600 gap-0.5">
                <p>
                  <span className="font-medium">Method:</span>{" "}
                  {order.paymentType}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  <span
                    className={
                      order.isPaid
                        ? "text-green-600 font-bold"
                        : "text-amber-600 font-bold"
                    }
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
