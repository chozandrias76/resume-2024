"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";

import { usePresignedImageUrl } from "@/hooks/usePresignedImageUrl";
import Loading from "./loading";
import spaceNeedleIcon from "../../public/space-needle.svg";
import galaxyIcon from "../../public/galaxy.svg";
import rocketIcon from "../../public/rocket.svg";
import astroIcon from "../../public/astronaut.svg";
import alienIcon from "../../public/alien.svg";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { Sparkles } from '@react-three/drei'

const name = process.env.name?.replaceAll("-", " ");
const stdSVGSize = 16;
const developerTimezone = "America/Los_Angeles";

async function fetchAndParseModel(url: string) {
  const response = await fetch(url);
  const base64 = await response.text(); // Assuming the endpoint directly gives you base64

  return base64;
}

function HeroModel({ modelContent }: { modelContent: string }) {
  const [model, setModel] = useState<any>(null);

  useEffect(() => {
    if (modelContent) {
      const loader = new OBJLoader();
      const lodedModel = loader.parse(modelContent);
      setModel(lodedModel);
    }
  }, [modelContent]);

  return model ? <primitive scale={0.275} object={model} /> : null;
}

function HeroCanvas({ modelUrl }: { modelUrl: string }) {
  const [modelContent, setModelContent] = useState("");

  useEffect(() => {
    fetchAndParseModel(modelUrl).then(setModelContent);
  }, [modelUrl]);

  return (
    <Canvas
      style={{ height: "48vh" }}
      className="bg-zinc-900"
      camera={{
        fov: 75,
        near: 0.1,
        far: 10,
        position: [2, 1, 2.5],
        rotation: [0, 45 * (Math.PI / 180), 0],
      }}
    >
      <Sparkles scale={7.5} color={"black"} count={1e4} size={0.4}/>
      <ambientLight intensity={0.01} />
      <pointLight intensity={250} color={"rgb(71, 100, 85)"} position={[10, 10, 10]} />
      <pointLight intensity={100} color={"rgb(71, 85, 0)"} position={[0, 10, 10]} />
      {modelContent && <HeroModel modelContent={modelContent} />}
    </Canvas>
  );
}

function getCurrentYearInDeveloperTimezone() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    timeZone: developerTimezone,
  });
  return formatter.format(now);
}

function getCurrentHourAndMinuteInDeveloperTimezone() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: developerTimezone,
  });
  return formatter.format(now);
}

function LocalGalaxy() {
  return (
    <div className="flex justify-center gap-1 uppercase">
      <Image
        alt="i"
        className="invert"
        priority
        width={stdSVGSize}
        src={galaxyIcon}
      />
      <p>Milky Way</p> <p>/</p> <p>{getCurrentYearInDeveloperTimezone()}</p>
    </div>
  );
}

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
      <div className="z-10 w-full max-w-5xl items-center justify-between roboto text-xs lg:flex">
        <div className="lg:hidden uppercase px-4 fixed left-0 py-4 top-0 flex w-full justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <p className="items-center">Colin</p>
          <div className="flex items-top gap-1">
            <Image
              className="invert"
              priority
              width={16}
              height={16}
              src={spaceNeedleIcon}
              alt="Space Needle"
            />
            <p>Seattle, Washington, USA</p>
            <p>/</p>
            <p>{getCurrentHourAndMinuteInDeveloperTimezone()}</p>
          </div>
          <p>Menu</p>
        </div>

        <div className="left-0 w-full fixed flex top-0 hidden grid-cols-5 justify-between py-4 px-4 uppercase blur-[1px] lg:grid">
          <div className="flex gap-1">
            <Image
              alt="i"
              className="invert rotate-90"
              priority
              width={20}
              src={rocketIcon}
            />
            <p>
              {name} {process.env.version}
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              alt="i"
              className="invert"
              priority
              width={stdSVGSize}
              src={astroIcon}
            />
            <p>Wearer of many hats</p>
            <Image
              alt="i"
              className="invert"
              priority
              width={stdSVGSize}
              src={alienIcon}
            />
          </div>
          <div id="large-time">
            <LocalGalaxy />
          </div>
          <div className="flex justify-end gap-1 text-xs">
            <Image
              alt="i"
              className="invert"
              priority
              width={stdSVGSize}
              src={alienIcon}
            />
            <p>Video & Tabletop Gamer</p>
            <Image
              alt="i"
              className="invert"
              priority
              width={stdSVGSize}
              src={astroIcon}
            />
          </div>
          <div className="flex justify-end gap-1">
            <p>all rights reserved</p>
            <Image
              alt="i"
              className="invert -rotate-90"
              priority
              width={stdSVGSize}
              src={rocketIcon}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col flex-grow relative">
        <div className="leading-none uppercase w-full font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
          <div className="lg:hidden p-8" id="small-time">
            <LocalGalaxy />
          </div>
          <h1 className="text-center flex justify-center reveal relative mt-2 2xl:text-[11rem] xl:text-[7rem] lg:leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
            Colin
          </h1>
          <h1 className="text-left flex justify-start reveal relative mt-2 2xl:text-[11rem] xl:text-[7rem] lg:leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
            Software
          </h1>
          <h1 className="text-right flex justify-end reveal relative mt-2 2xl:text-[11rem] xl:text-[7rem] lg:leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
            Engineer
          </h1>
        </div>
        <HeroCanvas modelUrl="/api/models?file_type=obj" />
      </div>
    </Loading>
  );
}
