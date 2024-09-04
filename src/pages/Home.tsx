import { arrowRight } from "@/assets";
import { ImagesSlider } from "@/components/ui/images-slider";

const Home = () => {
  // const allProducts = await getAllProducts();
  const images = [
    "https://images.unsplash.com/photo-1527385352018-3c26dd6c3916?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <>
      <section className="px-6 md:px-20 py-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
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
          </div>
          <ImagesSlider className="h-[40rem] rounded-md" images={images} />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-14 gap-y-16 mx-auto justify-center"></div>
      </section>
    </>
  );
};

export default Home;
