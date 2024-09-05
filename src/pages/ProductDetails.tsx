import { SERVER_BASE_URL } from "@/config";
import { useAuthContext } from "@/context/AuthProvider";
import { ApiRequest } from "@/services/api.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import {
  arrowDown,
  arrowUp,
  bag,
  bookMark,
  chart,
  comment,
  priceTag,
  redHeart,
  share,
  star,
} from "@/assets";
import PriceInfoCard from "@/components/shared/PriceInfoCard";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

const ProductDetails = () => {
  const { id } = useParams(); // Retrieve product id from the URL
  const { accessToken } = useAuthContext();
  const navigate = useNavigate();
  // Use query with `refetch`
  const { data, refetch, isPending, error } = useQuery({
    queryFn: () =>
      new ApiRequest(
        `${SERVER_BASE_URL}/api/product/getProduct/${id}`, // Pass `id` as part of the URL
        "get"
      ).apiRequest(
        {},
        {
          "Content-Type": "application/json",
        },
        accessToken
      ),
    queryKey: ["getProduct", id],
    enabled: false,
  });
  const { data: getAllData, refetch: getAllADataRefetch } = useQuery({
    queryFn: () =>
      new ApiRequest(
        `${SERVER_BASE_URL}/api/product/getProductsHome`,
        "get"
      ).apiRequest(
        {},
        {
          "Content-Type": "application/json",
        },
        accessToken
      ),
    queryKey: ["getProductsHome"],
    enabled: false,
  });
  const { mutate: deleteProduct, isPending: isDeleting }: any = useMutation({
    mutationFn: (id: string) =>
      new ApiRequest(
        `${SERVER_BASE_URL}/api/product/delete`,
        "delete"
      ).apiRequest(
        id,
        {
          "Content-Type": "application/json",
        },
        accessToken
      ),
    mutationKey: ["deleteProduct"],
    onSuccess: (data: any) => {
      toast.success(data.data.msg);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.msg || error.message);
    },
  });
  useEffect(() => {
    const isMounted = true;
    if (isMounted) {
      getAllADataRefetch();
    }
  }, [getAllADataRefetch]);
  // Manually trigger the query when the component mounts or `id` changes
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

  if (isPending)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loader">
          <Loader />
        </div>
      </div>
    );
  if (error) return <div>Error loading product details.</div>;
  const handleDelete = async () => {
    await deleteProduct({ id });
  };
  const product = data.data.data;
  const allProducts = getAllData?.data.data;
  const priceHistoryExists =
    product.priceHistory && product.priceHistory.length > 0;

  const lowestPriceArr = priceHistoryExists
    ? product.priceHistory.map(({ currentPrice }: any) =>
        parseFloat(currentPrice)
      )
    : [parseFloat(product.currentPrice)];

  const lowestPrice = Math.min(...lowestPriceArr).toFixed(2);
  const highestPrice = Math.max(...lowestPriceArr).toFixed(2);

  const averagePrice = priceHistoryExists
    ? (
        product.priceHistory
          .map(({ currentPrice }: any) => parseFloat(currentPrice))
          .reduce((acc: any, item: any) => item + acc, 0) /
        product.priceHistory.length
      ).toFixed(2)
    : parseFloat(product.currentPrice).toFixed(2); // Fix average price to two decimal places

  return (
    <div>
      <p className="bg-red-300 w-full h-30px p-2 text-sm text-black text-center flex justify-center items-center gap-x-2">
        <span>
          <FaTriangleExclamation />
        </span>
        Please ensure that the product name and price match the actual product.
        If they don't, delete the entry and try again.
      </p>
      <div className="flex w-full justify-around mt-5 items-center h-10">
        <Link to="/">
          <Button
            variant="secondary"
            className="text-white flex gap-x-2 items-center"
          >
            <FaArrowLeft />
            Back
          </Button>
        </Link>
        <Button
          className="bg-primary text-white disabled:opacity-20"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <MdDeleteOutline className="text-white size-5" />
          {isDeleting ? "Deleting" : "Delete"}
        </Button>
      </div>

      <div className="flex flex-col gap-16 flex-wrap px-6 md:px-20 py-16">
        <div className="flex gap-28 xl:flex-row flex-col">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
              <div className="flex flex-col gap-3">
                <p className="text-[28px] text-secondary font-semibold text-wrap">
                  {product.title}
                </p>
                <Link
                  to={product.productUrl}
                  target="_blank"
                  className="text-base text-black opacity-50"
                >
                  Visit Product
                </Link>
              </div>
              <div className="flex items-center gap-3 justify-between w-full">
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-[10px]">
                  <img src={redHeart} alt="heart" width={20} height={20} />
                  <p className="text-base font-semibold text-[#D46F77]">
                    {product.reviewsCount}
                  </p>
                </div>

                <div className="flex gap-x-2">
                  <div className="p-2 bg-white-200 rounded-[10px]">
                    <img src={bookMark} alt="Bookmark" width={20} height={20} />
                  </div>
                  <div className="p-2 bg-white-200 rounded-[10px]">
                    <img src={share} alt="Bookmark" width={20} height={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]">
              <div className="flex flex-col gap-2">
                <p className="text-[34px] text-secondary font-semibold">
                  {product.currency === "USD" && "$"}
                  {product.currentPrice}
                </p>
                <p className="text-[21px] text-secondary opacity-50 line-through">
                  {product.currency === "USD" && "$"}
                  {highestPrice}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-start h-full">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]">
                    <img src={star} alt="star" width={16} height={16} />
                    <p className="text-sm text-primary-orange font-semibold">
                      {product.stars}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]">
                    <img src={comment} alt="comments" width={16} height={16} />
                    <p className="text-sm text-secondary font-semibold">
                      {product.reviewsCount} Reviews
                    </p>
                  </div>
                </div>
                <p className="text-sm text-black opacity-50">
                  <span className="text-primary-green font-semibold">
                    {product.reviewsCount}%
                  </span>{" "}
                  of buyers have recommended this.
                </p>
              </div>
              <p className="text-xs font-bold opacity-50">
                You'll be sent an email when the price drops
              </p>
            </div>
            <div className="my-7 flex flex-col gap-5">
              <div className="gap-5 flex flex-wrap">
                <PriceInfoCard
                  title="Current Price"
                  iconSrc={priceTag}
                  value={`${product.currency === "USD" && "$"} ${
                    product.currentPrice
                  }`}
                  borderColor="#b6dbff"
                />
                <PriceInfoCard
                  title="Average Price"
                  iconSrc={chart}
                  value={`${product.currency === "USD" && "$"} ${averagePrice}`}
                  borderColor="#b6dbff"
                />
                <PriceInfoCard
                  title="Highest Price"
                  iconSrc={arrowUp}
                  value={`${product.currency === "USD" && "$"} ${highestPrice}`}
                  borderColor="#b6dbff"
                />
                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc={arrowDown}
                  value={`${product.currency === "USD" && "$"} ${lowestPrice}`}
                  borderColor="#b6dbff"
                />
              </div>
            </div>
            {/* <Modal productId={id} /> */}
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl text-secondary font-semi-bold">
              Product Description
            </h3>
            <ul className="flex flex-col gap-4 px-4">
              {product.description.map((item: any, index: number) => {
                return (
                  <li key={index} className="list-disc">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <button className="py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold w-fit mx-auto flex items-center">
            <img src={bag} alt="bag" width={22} height={22} />{" "}
            <Link to={product.productUrl} target="_blank">
              Buy Now
            </Link>
          </button>
        </div>
        <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
          <h2 className="text-secondary text-[32px] font-semibold">Trending</h2>
          <div className="flex flex-wrap gap-x-14 gap-y-16 mx-auto justify-center">
            {allProducts?.map((product: any) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
