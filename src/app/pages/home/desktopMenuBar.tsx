import Image from "next/image";
import rocketIcon from "../../../../public/rocket.svg"
import astronautIcon from "../../../../public/astronaut.svg"
import alienIcon from "../../../../public/alien.svg"
import { stdSVGSize } from "@/constants/constants";
import { MobileLocalGalaxy } from "./mobileLocalGalaxy";
const name = process.env.name?.replaceAll("-", " ");

export function DesktopMenuBar() {
  return (
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
          src={astronautIcon}
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
        <MobileLocalGalaxy />
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
          src={astronautIcon}
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
  );
}
