"use client";
import React, { useState } from "react";

import Loading from "@/app/loading";
import { useYoutubeContent } from "@/hooks/useYoutubeContent";
import { motion, useAnimation } from "framer-motion";
import { Home } from "../pages/elden-ring/home/home";

const sections: any[] = [<Home key={0} />];

export default function Body() {
  const controls = useAnimation();
  
  const [pageToken, setPageToken] = useState("");
  const { data: youtubeContent, isLoading, isFetched, isFetching, isRefetching, isSuccess } = useYoutubeContent(pageToken);


  return (
    <Loading
      isLoading={isLoading}
      isFetched={isFetched}
      isFetching={isFetching}
      isRefetching={isRefetching}
      content={youtubeContent}
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