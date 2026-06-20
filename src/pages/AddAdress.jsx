// import { useEffect, useState } from "react";
// import { assets } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//   <input
//     type={type}
//     placeholder={placeholder}
//     onChange={handleChange}
//     name={name}
//     value={address[name]}
//     required
//     className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
//   />
// );

// const AddAdress = () => {
//   const { axios, user, navigate } = useAppContext();
//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipcode: "",
//     country: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setAddress((prevAddress) => ({
//       ...prevAddress,
//       [name]: value,
//     }));
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {

//       const { data } = await axios.post("/api/address/add", {
//         userId: user?._id,
//         address,
//       });

//       if (data.success) {
//         toast.success(data.message);
//         navigate("/cart"); // Address save hone ke baad wapas cart ya checkout par le jayein
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       navigate("/cart");
//     }
//   }, [user]);

//   return (
//     <div className="mt-16 pb-16">
//       <p className="text-2xl md:text-3xl text-gray-500">
//         Add Shipping <span className="font-semibold text-primary">Address</span>
//       </p>

//       <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
//         <div className="flex-1 max-w-md">
//           <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="firstName"
//                 type="text"
//                 placeholder="First Name"
//               />

//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="lastName"
//                 type="text"
//                 placeholder="Last Name"
//               />
//             </div>

//             <InputField
//               handleChange={handleChange}
//               address={address}
//               name="email"
//               type="email"
//               placeholder="Email"
//             />

//             <InputField
//               handleChange={handleChange}
//               address={address}
//               name="street"
//               type="text"
//               placeholder="Street"
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="city"
//                 type="text"
//                 placeholder="City"
//               />

//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="state"
//                 type="text"
//                 placeholder="State"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="zipcode"
//                 type="number"
//                 placeholder="Zip Code"
//               />

//               <InputField
//                 handleChange={handleChange}
//                 address={address}
//                 name="country"
//                 type="text"
//                 placeholder="Country"
//               />
//             </div>

//             <InputField
//               handleChange={handleChange}
//               address={address}
//               name="phone"
//               type="tel"
//               placeholder="Phone Number"
//             />

//             <button
//               type="submit"
//               className="w-full text-white bg-primary hover:bg-primary-dull cursor-pointer py-3 transition uppercase"
//             >
//               Save Address
//             </button>
//           </form>
//         </div>

//         <img
//           className="md:mr-16 md:mt-0"
//           src={assets.add_address_iamge}
//           alt="address"
//         />
//       </div>
//     </div>
//   );
// };

// export default AddAdress;
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    className="w-full border border-gray-300 rounded px-3 py-2 outline-none"
  />
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      navigate("/cart");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/address/add",
        {
          userId: user._id,
          address,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (data.success) {
        toast.success(data.message || "Address saved successfully");
        navigate("/cart");
      } else {
        toast.error(data.message || data.meassage || "Address not saved");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.meassage ||
          error.message,
      );
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={onSubmitHandler}>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zip Code"
              />

              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="tel"
              placeholder="Phone Number"
            />

            <button
              type="submit"
              className="w-full text-white bg-primary hover:bg-primary-dull cursor-pointer py-3 transition uppercase"
            >
              Save Address
            </button>
          </form>
        </div>

        <img
          className="md:mr-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
