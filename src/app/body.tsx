"use client";
import Image from "next/image";

import { usePresignedImageUrl } from "@/hooks/usePresignedImageUrl";
import Loading from "./loading";
const author = "Colin Swenson-Healey";
const title = "Personal Portfolio & Resume";

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
      <div className="z-10 w-full max-w-5xl items-center justify-between roboto text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {title}
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com/chozandrias76s-projects/resume-2024"
            target="_blank"
            rel="noopener noreferrer"
          >
            By and For{" "}
            <Image
              src="https://avatars.githubusercontent.com/u/2087677?v=4"
              alt="My Github Profile Image"
              className="dark"
              width={100}
              height={24}
              priority
            />
            <p>{author}</p>
          </a>
        </div>
      </div>
      <Image
        src={data || ""}
        alt="My Website banner"
        className="dark"
        width={1920}
        height={1080}
        priority={true}
        placeholder="blur"
        blurDataURL="https://place-hold.it/1920x1080"
        loading="eager"
      />
    </Loading>
  );
}
