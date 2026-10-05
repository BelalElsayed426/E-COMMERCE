"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Swiper as SwiperType } from "swiper";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const slides = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    description: "Get 20% off your first order",
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    description: "Fresh from farm to your table",
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    description: "Same day delivery available",
  },
];

const sliderImage = "/images/swiper-1.png";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HeroSlider() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        onSlideChange={(swiper: SwiperType) => {
          setActiveIndex(swiper.realIndex);
        }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex h-100 items-center justify-center">
              <Image
                src={sliderImage}
                alt={slide.title}
                className="object-cover"
                fill
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-linear-to-r from-primary-500/90 to-primary-400/50" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-8 pointer-events-auto text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              exit="hidden"
              variants={textVariants}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <h2 className="max-w-96 text-3xl font-bold">
                {activeSlide.title}
              </h2>
              <p>{activeSlide.description}</p>
              <div className="flex items-center gap-2">
                <Link
                  href="/products"
                  className="btn rounded-lg border-2 border-white/50 bg-white px-6 py-2 font-semibold text-primary-500 transition-transform hover:scale-105"
                >
                  Shop Now
                </Link>
                <Link
                  href="/deals"
                  className="btn rounded-lg border-2 border-white/50 bg-transparent px-6 py-2 font-semibold text-white transition-transform hover:scale-105"
                >
                  View Deals
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        ref={prevRef}
        className="absolute left-4 top-1/2 z-20 hidden cursor-pointer items-center justify-center h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-primary-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary-600 md:flex"
      >
        <FaChevronLeft className="text-lg" />
      </div>
      <div
        ref={nextRef}
        className="absolute right-4 top-1/2 z-20 hidden cursor-pointer items-center justify-center h-12 w-12 -translate-y-1/2 rounded-full bg-white/90 text-primary-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white hover:text-primary-600 md:flex"
      >
        <FaChevronRight className="text-lg" />
      </div>
    </div>
  );
}
