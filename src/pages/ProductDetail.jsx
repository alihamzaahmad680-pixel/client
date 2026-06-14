import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { products, navigate, addToCart, currency } = useAppContext();

  const { id } = useParams();

 
  const selectedProduct = products?.find((item) => item._id === id);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

 
  useEffect(() => {
    if (selectedProduct?.image?.length > 0) {
      setThumbnail(selectedProduct.image[0]);
    }
  }, [selectedProduct]);


  useEffect(() => {
    if (selectedProduct && products.length > 0) {
      const filtered = products
        .filter((item) => item.category === selectedProduct.category)
        .slice(0, 5);

      setRelatedProducts(filtered);
    }
  }, [selectedProduct, products]);


  if (!selectedProduct) {
    return (
      <div className="mt-10 text-center text-gray-500">Loading product...</div>
    );
  }

  return (
    <div className="mt-12">
    
      <p>
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
        <Link to={`/products/${selectedProduct.category.toLowerCase()}`}>
          {selectedProduct.category}
        </Link>{" "}
        / <span className="text-primary">{selectedProduct.name}</span>
      </p>


      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {selectedProduct.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

       
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{selectedProduct.name}</h1>

          
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {selectedProduct.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {selectedProduct.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {selectedProduct.description?.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(selectedProduct._id)}
              className="w-full py-3.5 font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(selectedProduct._id);
                navigate("/cart");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3.5 font-medium bg-primary text-white hover:bg-primary-dull transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-max items-center">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 rounded-full mt-2 bg-primary"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 w-full">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
        </div>

        <button
          onClick={() => {
            navigate("/all-products");
            window.scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer py-2.5 my-16 px-12 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
