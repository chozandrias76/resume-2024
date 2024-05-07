"use client";
import Image from "next/image";

import { usePresignedImageUrl } from "@/hooks/usePresignedImageUrl";

export default function Body() {
  const { data } = usePresignedImageUrl("banner");

  return (
      <Image
        src={data || "https://place-hold.it/1920x1080"}
        alt="My Website banner"
        className="dark"
        width={1920}
        height={1080}
        priority
      />
  );
}
