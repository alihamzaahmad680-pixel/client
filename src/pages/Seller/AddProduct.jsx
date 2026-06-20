// import { useState } from "react";
// import { assets, categories } from "../../assets/assets";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";

// const AddProduct = () => {
//   const [files, setFiles] = useState([]);
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");

//   const { axios, fetchProducts } = useAppContext();

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       const productData = {
//         name,
//         description: description.split("\n"),
//         category,
//         price,
//         offerPrice,
//       };

//       const formData = new FormData();
//       formData.append("productData", JSON.stringify(productData));

//       files.forEach((file) => {
//         if (file && file instanceof File) {
//           formData.append("images", file);
//         }
//       });

//       const { data } = await axios.post("/api/product/add", formData);

//       if (data.success) {
//         toast.success(data.message);

//         await fetchProducts();

//         setName("");
//         setDescription("");
//         setCategory("");
//         setPrice("");
//         setOfferPrice("");
//         setFiles([]);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//       <form
//         onSubmit={onSubmitHandler}
//         className="md:p-10 p-4 space-y-5 max-w-lg"
//       >
//         <div>
//           <p className="text-base font-medium">Product Image</p>

//           <div className="flex flex-wrap items-center gap-3 mt-2">
//             {Array(4)
//               .fill("")
//               .map((_, index) => (
//                 <label key={index} htmlFor={`image${index}`}>
//                   <input
//                     type="file"
//                     hidden
//                     id={`image${index}`}
//                     accept="image/*"
//                     onChange={(e) => {
//                       const updated = [...files];
//                       if (e.target.files[0]) {
//                         updated[index] = e.target.files[0];
//                         setFiles(updated);
//                       }
//                     }}
//                   />

//                   <img
//                     src={
//                       files[index] && files[index] instanceof File
//                         ? URL.createObjectURL(files[index])
//                         : assets.upload_area
//                     }
//                     alt="upload"
//                     className="max-w-24 cursor-pointer object-cover h-24 w-24 rounded border"
//                   />
//                 </label>
//               ))}
//           </div>
//         </div>

//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Product Name"
//           className="w-full border p-2"
//           required
//         />

//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Product Description"
//           className="w-full border p-2"
//           rows={4}
//         />

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="w-full border p-2"
//           required
//         >
//           <option value="">Select Category</option>

//           {categories.map((item, index) => (
//             <option key={index} value={item.path}>
//               {item.path}
//             </option>
//           ))}
//         </select>

//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Price"
//           className="w-full border p-2"
//           required
//         />

//         <input
//           type="number"
//           value={offerPrice}
//           onChange={(e) => setOfferPrice(e.target.value)}
//           placeholder="Offer Price"
//           className="w-full border p-2"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors"
//         >
//           ADD PRODUCT
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
import { useState } from "react";
import { assets, categories } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const { axios, fetchProducts } = useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const productData = {
        name,
        description: description.split("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file && file instanceof File) {
          formData.append("images", file);
        }
      });

      const { data } = await axios.post("/api/product/add", formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      if (data.success) {
        toast.success(data.message);

        await fetchProducts();

        setFiles([]);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
      } else {
        toast.error(data.message || data.meassage || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.meassage ||
          error.message,
      );
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-5 max-w-lg"
      >
        <div>
          <p className="text-base font-medium">Product Image</p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    hidden
                    id={`image${index}`}
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...files];

                      if (e.target.files[0]) {
                        updated[index] = e.target.files[0];
                        setFiles(updated);
                      }
                    }}
                  />

                  <img
                    src={
                      files[index] && files[index] instanceof File
                        ? URL.createObjectURL(files[index])
                        : assets.upload_area
                    }
                    alt="upload"
                    className="max-w-24 cursor-pointer object-cover h-24 w-24 rounded border"
                  />
                </label>
              ))}
          </div>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full border p-2"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full border p-2"
          rows={4}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
          required
        >
          <option value="">Select Category</option>

          {categories.map((item, index) => (
            <option key={index} value={item.path}>
              {item.path}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          placeholder="Offer Price"
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors"
        >
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
