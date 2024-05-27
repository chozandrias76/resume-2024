import { styles } from "@/util/styles";

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
  "pl-1"
];

export function Home() {
  return (
    <>
      <div className="w-full flex flex-col flex-grow relative h-screen">
        <div className="leading-none uppercase w-full font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
          <h1 className={styles(titleStyles)}>Elden Ring</h1>
          <a className={styles(...titleStyles, "elden-link", "text-zinc-600", "ml-16")} href="#">
            Feed &#x219A;
          </a>
          <a className={styles(...titleStyles, "elden-link", "text-zinc-600", "ml-32")} href="#guide">
            Guide &#x219A;
          </a>
          <a className={styles(...titleStyles, "elden-link", "text-zinc-600", "ml-64")} href="#">
            Save File Viewer &#x219A;
          </a>
        </div>
      </div>
    </>
  );
}
