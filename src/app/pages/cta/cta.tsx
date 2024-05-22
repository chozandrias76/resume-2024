import { styles } from "@/util/styles";
import Image from "next/image";

function CTAItem({
  right,
  count,
  title,
  description,
  src = "https://place-hold.it/600x400",
  href = "#",
}: {
  right?: boolean;
  count: number;
  title: string;
  description: string;
  src?: string;
  href?: string;
}) {
  const rootClassNameRight = right ? ["justify-end"] : [];
  const rootClassName = styles(
    "w-full",
    "h-full",
    "p-4",
    "md:p-8",
    "mb-48",
    "mt-16",
    "grid",
    ...rootClassNameRight
  );
  return (
    <a href={href} className={rootClassName}>
      <h2 className="relative z-20 inset-x-[1rem] inset-y-[1rem] md:inset-x-[-4rem] md:inset-y-[-4rem] 2xl:text-[3.5rem] xl:text-[2.5rem] md:text-[2rem] sm:text-[1.4rem] text-[1.0rem]">
        {title}
      </h2>
      <p className="mono h-0 flex justify-end max-w-[600px] mb-6">
        PROJ. &#8470; {count}
      </p>
      <Image
        className="transition-all duration-500 hover:scale-[103%] blur-sm hover:blur-none"
        src={src}
        alt={`CTA${count}`}
        width={600}
        height={400}
      />
      <p className="flex mt-2 h-0 w-[600px]">{description}</p>
    </a>
  );
}

export function CTA() {
  return (
    <div className="flex-row md:w-9/12 mt-24 mb-24">
      <div className="mb-64">
        <h1 className="uppercase text-left flex justify-start reveal relative 2xl:text-[11rem] xl:text-[7rem] leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
          Highlighted
        </h1>
        <h1 className="uppercase flex justify-center reveal relative 2xl:text-[11rem] xl:text-[7rem] leading-[1] md:text-[5rem] sm:text-[4rem] text-[2.8rem] show-reveal">
          Works
        </h1>
      </div>
      <CTAItem
        src="/cta/elden-ring.jpg"
        description="Character Creator, Video Content, and Build Guides"
        title="Elden Ring Content Feed"
        count={1}
      />
      <CTAItem
        src="/cta/officiant.jpg"
        description="A non-profit non-denominational church that ordains people online so that they can officiate weddings for friends, family, and community"
        title="American Marriage Ministries"
        right
        count={2}
      />
      <CTAItem
        src="/cta/nzero.jpg"
        description="Emissions Capture, Tracking, Display, and Forecasting"
        title="nZero for The City of Reno"
        count={3}
      />
    </div>
  );
}
