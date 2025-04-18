'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Loading from "./Loading";

const HeaderSlider = () => {
  //const sliderData = [
  //  {
   //   id: 1,
   //   title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
   //   offer: "Limited Time Offer 30% Off",
   //   buttonText1: "Buy now",
   //   buttonText2: "Find more",
   //   imgSrc: assets.header_headphone_image,
   // },
  //];
  const {router} = useAppContext()
  const {products} = useAppContext()
  const [currentSlide, setCurrentSlide] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return ( <>{products.length?(
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {product.name}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 rounded-full text-white font-medium"   onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}>
                  Order now
                </button>
            
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={`${product.image[0]}`}
                alt ={`${product.name} `}
                height ={500}
                width={500}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {products.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  ) : <Loading/>
}
</>
  );
};

export default HeaderSlider;
