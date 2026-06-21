import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const { products } = useAppContext();

  const best = products?.filter((p) => p.inStock !== false).slice(0, 4);

  return (
    <div className="mt-10 px-4 md:px-10">
      <h2 className="text-2xl font-semibold mb-5">Best Seller</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {best?.length > 0 ? (
          best.map((p) => <ProductCard key={p._id} product={p} />)
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
