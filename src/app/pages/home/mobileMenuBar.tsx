import Image from "next/image";

import { getCurrentHourAndMinuteInDeveloperTimezone } from "@/util/getCurrentHourAndMinuteInDeveloperTimezone";
import { stdSVGSize } from "@/constants/constants";

import spaceNeedleIcon from "../../../../public/space-needle.svg";

export function MobileMenuBar() {
  return (
    <div className="lg:hidden uppercase px-4 fixed left-0 py-4 top-0 flex w-full justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <p className="items-center">Colin</p>
      <div className="flex items-top gap-1">
        <Image
          className="invert"
          priority
          width={stdSVGSize}
          height={stdSVGSize}
          src={spaceNeedleIcon}
          alt="Space Needle"
        />
        <p>Seattle, Washington, USA</p>
        <p>/</p>
        <p>{getCurrentHourAndMinuteInDeveloperTimezone()}</p>
      </div>
      <p>Menu</p>
    </div>
  );
}
