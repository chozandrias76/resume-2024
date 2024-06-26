import { IYoutubeContent } from "@/hooks/useYoutubeContent";
import { styles } from "@/util/styles";
import { useEffect, useMemo, useRef } from "react";

const titleStyles = [
  "text-left",
  "flex",
  "justify-start",
  "reveal",
  "relative",
  "mt-2",
  "2xl:text-[5rem]",
  "xl:text-[4rem]",
  "lg:leading-[1]",
  "md:text-[2.8rem]",
  "sm:text-[2.3rem]",
  "text-[2.0rem]",
  "show-reveal",
  "w-fit",
  "pr-7",
  "pl-1",
];

const videoContainerStyles = styles(
  "absolute",
  "bottom-12",
  "right-12",
  "transform",
  "w-full",
  "h-full",
  "flex",
  "items-center",
  "justify-center",
  "bg-no-repeat",
  "bg-cover",
  "bg-center",
  "border-zinc-600",
  "border",
  "border-2",
  "outline-offset-8",
  "video-player",
  "bg-[url('https://place-hold.it/1280x720/666')]"
);

const nextLinkStyles = (page: string, maxPage: string) =>
  styles(
    "absolute",
    "bottom-12",
    "left-12",
    "xl:text-9xl",
    "lg:text-7xl",
    "md:text-6xl",
    "text-5xl",
    ...(parseInt(page, 10) < parseInt(maxPage, 10) - 1
      ? [
          "elden-link",
          "text-zinc-500",
          "underline",
          "decoration-zinc-800",
          "decoration-4",
          "cursor-pointer",
          "underline-offset-8",
        ]
      : ["text-zinc-800", "cursor-not-allowed"])
  );

export function VideoFeed({
  thumbnail: youtubeContent,
  setPage,
  page,
  maxPage,
}: {
  thumbnail?: {
    data?: {
      id: string;
      embed_html: string;
      description: string;
      title: string;
      thumbnail_url: string;
    };
    length?: string;
  };
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  maxPage: string;
}) {
  const videoTitle = useMemo(
    () => youtubeContent?.data?.title,
    [youtubeContent]
  );

  const ref = useRef(null);
  function playEmbed() {
    if (!youtubeContent?.data?.embed_html) {
      return;
    }
    if (!ref.current) {
      return;
    }
    const currentRef: HTMLElement = ref.current;
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = youtubeContent?.data.embed_html || "";

    // Get the iframe element and modify the src to include autoplay
    const iframeElement: HTMLElement = tempContainer.firstChild as HTMLElement;
    if (iframeElement && iframeElement.tagName === "IFRAME") {
      const iframe: HTMLIFrameElement = iframeElement as HTMLIFrameElement;
      const src = new URL(iframe.src.replace("http:", "https:"));
      src.searchParams.set("autoplay", "1");
      iframe.src = src.toString();
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    }

    iframeElement.className = currentRef.className;
    currentRef.replaceWith(iframeElement);
  }

  useEffect(() => {
    if (!youtubeContent?.data?.thumbnail_url) {
      return;
    }
    if (!ref.current) {
      return;
    }
    const currentRef: HTMLElement = ref.current;

    currentRef.style.backgroundImage = `url("${youtubeContent?.data.thumbnail_url}")`;
  }, [ref, youtubeContent]);

  const nextVideo = useMemo(() => {
    if (parseInt(page, 10) === parseInt(maxPage, 10) - 1) return () => {};
    const pageNumber = parseInt(page, 10);
    return () => {
      setPage((pageNumber + 1).toString());
    };
  }, [page, setPage, maxPage]);

  return (
    <>
      <div className="w-full flex flex-col flex-grow relative h-screen">
        <div className="leading-none uppercase w-full font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
          <div className="relative w-full h-full">
            <h2 id="feed" className={styles(titleStyles)}>
              Content Feed
            </h2>
            <div className="absolute top-1/2 left-12 transform translate-x-1/2 text-base max-w-half">
              {videoTitle}
            </div>
            <div className={nextLinkStyles(page, maxPage)} onClick={nextVideo}>
              next
            </div>
            <div ref={ref} className={videoContainerStyles}>
              <span
                className="text-7xl elden-link text-zinc-600 cursor-pointer"
                onClickCapture={playEmbed}
              >
                {" "}
                &#9665;
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
