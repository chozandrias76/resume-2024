"use client";
import { styles } from "@/util/styles";
import React, { useEffect, useState } from "react";

function splitTextIntoSpans(text: string): React.JSX.Element[] {
  return text.split("").map((char, index) => (
    <span
      key={index}
      className="inline-block"
      style={{
        animation: `wave 2s infinite ${index * 0.3}s`,
      }}
    >
      {char}
    </span>
  ));
}

function LoadingContent({
  isReady,
  children,
}: Readonly<{
  isReady: boolean;
  children: React.ReactNode;
}>) {
  const [loadingText, setLoadingText] = useState<React.JSX.Element[]>([]);
  const [experienceText, setExperienceText] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    setLoadingText(splitTextIntoSpans("loading"));
    setExperienceText(splitTextIntoSpans("experience"));
  }, []);

  return (
    <>
      <div
        className={styles(
          "z-20",
          "bg-slate-800",
          "w-full",
          "h-screen",
          "roboto",
          "align-text-bottom",
          "2xl:text-[11rem]",
          "xl:text-[7rem]",
          "lg:leading-[1]",
          "md:text-[5rem]",
          "sm:text-[4rem]",
          "text-[2.8rem]",
          isReady ? "peel-away-bottom-right" : "",
        )}
      >
        <h1 className={styles("uppercase")}>{loadingText}</h1>
        <h1 className={styles("uppercase", "pl-4")}>{experienceText}</h1>
      </div>
      {children}
    </>
  );
}

export default function Loading({
  children,
  isLoading,
  isFetched,
  isFetching,
  isRefetching,
  isSuccess,
  content,
}: Readonly<{
  children: React.ReactNode;
  isLoading: boolean;
  isFetched: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isSuccess: boolean;
  content: string | undefined;
}>) {
  const [isReady, setIsReady] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading && !isFetching && !isRefetching && isSuccess) {
      setIsReady(true);
      setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match the duration of the peel-away animation
    }
  }, [isLoading, isFetching, isRefetching, isSuccess]);

  if (isLoading || isFetching || isRefetching || !isSuccess || shouldRender) {
    return <LoadingContent isReady={isReady}>{children}</LoadingContent>;
  }

  return <>{children}</>;
}
