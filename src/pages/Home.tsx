import { arrowRight, handDrawnArrow } from "@/assets";
import ProductCard from "@/components/shared/ProductCard";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Input } from "@/components/ui/input";
import { SERVER_BASE_URL } from "@/config";
import { useAuthContext } from "@/context/AuthProvider";
import { ApiRequest } from "@/services/api.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { accessToken } = useAuthContext();
  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: (search: string) =>
      new ApiRequest(
        `${SERVER_BASE_URL}/api/product/addProduct`,
        "post"
      ).apiRequest(
        { url: search },
        {
          "Content-Type": "application/json",
        },
        accessToken
      ),
    mutationKey: ["AddProduct"],
    onSuccess: (data: any) => {
      toast.success(data.data.msg);
      console.log(data.data.data._id);
      navigate(`/products/${data.data.data._id}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.msg || error.message);
      if (error.message == "Unauthorized") {
        navigate("/login");
      }
    },
  });
  const { data, refetch } = useQuery({
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
  useEffect(() => {
    const isMounted = true;
    if (isMounted) {
      refetch();
    }
  }, [refetch]);
  const images = [
    "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addProduct(searchValue);
  };

  const allProducts = data?.data.data;

  return (
    <>
      <section className="px-6 md:px-20 py-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center flex-1">
            <p className="flex gap-2 text-sm font-medium text-primary">
              Smart Shopping Starts Here
              <img src={arrowRight} alt="arrow" />
            </p>
            <h1 className="mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900">
              Unleash the Power of{" "}
              <span className="text-primary">PriceSpy</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <div className="flex items-center gap-x-4">
              <Input
                placeholder="Enter amazon product link"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="min-w-[200px] my-4 w-full p-6 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none;"
              />
              <button
                disabled={searchValue === "" || isPending}
                onClick={handleSubmit}
                className={`bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 `}
              >
                {isPending ? "Searching..." : "Search"}
              </button>
            </div>

            <p className="text-xs font-bold opacity-50">
              Note: Some Amazon product pages may not be compatible with our
              scraper. To get the best results, ensure you paste the product
              description URL. If you encounter issues, please try a different
              product category or provide a direct link to the product.
            </p>
          </div>
          <div className="flex-1 relative">
            <ImagesSlider className=" h-[40rem] rounded-md" images={images} />
            <img
              src={handDrawnArrow}
              alt="arrow"
              className="absolute -bottom-5 -left-20 hidden xl:block"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
        <h2 className="text-secondary text-[32px] font-semibold">Trending</h2>
        <div className="flex flex-wrap gap-x-14 gap-y-16 mx-auto justify-center">
          {allProducts?.map((product: any) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
