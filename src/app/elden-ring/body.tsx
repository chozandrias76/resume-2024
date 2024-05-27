"use client";
import React, { useState } from "react";

import Loading from "@/app/loading";
import { useYoutubeContent } from "@/hooks/useYoutubeContent";
import { motion, useAnimation } from "framer-motion";
import { Home } from "../pages/elden-ring/home/home";
import { Guide } from "../pages/elden-ring/home/guide";
import { useErApiData } from "@/hooks/useErApiData";
import { useDDS } from "@/hooks/useDDS";
import { useImageSchema } from "@/hooks/useImageSchema";
import { VideoFeed } from "../pages/elden-ring/video-feed/video-feed";

export default function Body() {
  const controls = useAnimation();

  // pageToken will be used in pagination
  const [pageToken, setPageToken] = useState("");
  // Max build stub in until proper state setting works
  const [buildId, setBuildID] = useState("1d5af2758c4c42");
  const {
    data: youtubeContent,
    isLoading,
    isFetched,
    isFetching,
    isRefetching,
    isSuccess,
  } = useYoutubeContent(pageToken);
  const { data: guideContent } = useErApiData(buildId);
  const { data: guideImageText } = useDDS("SB_Status_00.dds");
  const imageSchema = useImageSchema("SB_Status_00.json", "schema.json");
  const { schema: typescriptDefinitions, file: imageDefinitions } = imageSchema
    ?.data?.result || {
    data: { result: { schema: undefined, file: undefined } },
  };

  return (
    <Loading
      isLoading={isLoading}
      isFetched={isFetched}
      isFetching={isFetching}
      isRefetching={isRefetching}
      content={youtubeContent}
      isSuccess={isSuccess}
    >
      <div className="z-10 items-center justify-between roboto text-xs lg:flex flex-col">
        {[
          <Home key={0} />,
          <VideoFeed key={1} nextPageToken={youtubeContent?.nextPageToken} prevPageToken={youtubeContent?.prevPageToken} youtubeContent={(youtubeContent?.result || []).at(0)} setPageToken={setPageToken} />,
          guideContent?.data &&
          guideImageText &&
          typescriptDefinitions &&
          imageDefinitions ? (
            <Guide
              key={2}
              guideContent={guideContent.data}
              guideImageText={guideImageText}
              typescriptDefinitions={typescriptDefinitions}
              imageDefinitions={imageDefinitions}
            />
          ) : (
            <React.Fragment key={2}></React.Fragment>
          ),
        ].map((section, index) => (
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
