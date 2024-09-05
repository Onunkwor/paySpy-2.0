import { Link } from "react-router-dom";

interface ProductProps {
  product: any;
}
const ProductCard = ({ product }: ProductProps) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="max-w-[292px] flex-1 flex flex-col gap-4 rounded-md"
    >
      <div className="flex-1 relative flex-col gap-5 p-4 rounded-md flex items-center justify-center">
        <img src={product.image} alt="product image" width={200} height={200} />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-secondary text-xl leading-6 font-semibold truncate">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-black opacity-50 text-sm capitalize">
            {product.category}
          </p>
          <p className="text-black text-lg flex font-semibold">
            <span>{product.currency === "USD" && "$"}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
