"use client";
import React from "react";

import { usePresignedImageUrl } from "@/hooks/usePresignedImageUrl";
import Loading from "./loading";
import {Home} from "./pages/home/home";

export default function Body() {
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
      <div className="z-10 w-full items-center justify-between roboto text-xs lg:flex">
        <Home />
      </div>
    </Loading>
  );
}
