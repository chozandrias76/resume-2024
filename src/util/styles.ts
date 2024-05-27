import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function styles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const titleStyles = [
  "text-left",
  "flex",
  "justify-start",
  "reveal",
  "relative",
  "mt-2",
  "2xl:text-[7rem]",
  "xl:text-[5rem]",
  "lg:leading-[1]",
  "md:text-[4rem]",
  "sm:text-[2.8rem]",
  "text-[2.3rem]",
  "show-reveal",
  "w-fit",
  "pr-7",
  "pl-1",
  "mb-4",
];
const subTitleStyles = [
  "text-left",
  "flex",
  "justify-start",
  "reveal",
  "relative",
  "mt-8",
  "mb-4",
  "2xl:text-[5rem]",
  "xl:text-[4rem]",
  "lg:leading-[1]",
  "md:text-[2.8rem]",
  "sm:text-[2.5rem]",
  "text-[2.0rem]",
  "show-reveal",
  "w-fit",
  "pr-7",
  "pl-1",
];

const blockTextStyles = [
  "text-left",
  "flex",
  "justify-start",
  "w-fit",
  "pl-3",
  "lg:leading-[1]",
  "2xl:text-[2.5rem]",
  "xl:text-[2rem]",
  "md:text-[1.8rem]",
  "sm:text-[1.5rem]",
  "text-[1.0rem]",
];

const captionStyles = [
  "text-left",
  "grid",
  "grid-col-2",
  "justify-start",
  "reveal",
  "relative",
  "mt-2",
  "2xl:text-[1rem]",
  "xl:text-[0.75rem]",
  "lg:leading-[1]",
  "md:text-[0.5rem]",
  "sm:text-[0.3rem]",
  "text-[0.2rem]",
  "show-reveal",
  "w-fit",
  "pr-7",
  "pl-6",
  "mb-16",
];

const statBlockStyles = ["pt-0.5", "pb-0.5"];

export {styles, statBlockStyles, captionStyles, blockTextStyles, subTitleStyles, titleStyles}