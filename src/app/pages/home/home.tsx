import { MobileLocalGalaxy } from "./mobileLocalGalaxy";
import { HeroCanvas } from "./hero";
import { MobileMenuBar } from "./mobileMenuBar";
import { DesktopMenuBar } from "./desktopMenuBar";

export function Home() {
  return (
    <>
      <MobileMenuBar />
      <DesktopMenuBar />
      <div className="w-full flex flex-col flex-grow relative">
        <div className="leading-none uppercase w-full font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
          <MobileLocalGalaxy />
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
        <HeroCanvas />
      </div>
    </>
  );
}
