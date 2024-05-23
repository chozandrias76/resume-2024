"use client";
import React, { useEffect } from "react";

import { usePresignedImageUrl } from "@/hooks/usePresignedImageUrl";
import Loading from "./loading";
import { Home } from "./pages/home/home";
import { motion, useAnimation } from "framer-motion";
import { CTA } from "./pages/cta/cta";
import { About } from "./pages/about/about";
const sections = [<Home key={0}/>, <About key={1} />, <CTA key={2}/>];

export default function Body() {
  const controls = useAnimation();

  const { data, isLoading, isFetched, isFetching, isRefetching, isSuccess } =
    usePresignedImageUrl("banner");

  return (
    <Loading
      isLoading={isLoading}
      isFetched={isFetched}
      isFetching={isFetching}
      isRefetching={isRefetching}
      content={data}
      isSuccess={isSuccess}
    >
      <div className="z-10 w-full items-center justify-between roboto text-xs lg:flex flex-col">
        {sections.map((section, index) => (
          <motion.div
            id="motion"
            key={index}
            className="flex w-full items-center justify-center"
            animate={controls}
          >
            {section}
          </motion.div>
        ))}
      </div>
    </Loading>
  );
}