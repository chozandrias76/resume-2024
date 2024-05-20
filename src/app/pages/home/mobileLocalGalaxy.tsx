import Image from "next/image";

import { stdSVGSize } from "@/constants/constants";
import { getCurrentYearInDeveloperTimezone } from "@/util/getCurrentHourAndMinuteInDeveloperTimezone";

import galaxyIcon from "../../../../public/galaxy.svg";


export function MobileLocalGalaxy() {
  return (
    <div className="lg:hidden p-8" id="small-time">
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
    </div>
  );
}
