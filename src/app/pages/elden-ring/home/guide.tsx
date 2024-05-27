import { Ajv } from "ajv";

import { useRGBABase64String } from "@/hooks/useRGBABase64String";
import type {
  ERApiData,
} from "@/lib/erApiData.interface";
import { styles, titleStyles } from "@/util/styles";
import { useRef, useEffect, useCallback, useState } from "react";
import { Schema } from "@/types/schemaTypes";
import PvE from "./guide/pve";
import CharacterStats from "./guide/characterStats";
import CharacterName from "./guide/characterName";
import Inventory from "./guide/inventory";
import Computed from "./guide/computed";


function getSubImage(imageData: ImageData, config: any): ImageData | null {
  const { x, y, width, height, margin, padding }: Schema['standards'][0] & {x: number, y: number} = config;
  const { width: imgWidth, data: imgData } = imageData;

  // Calculate the actual coordinates considering margin and padding
  const actualX = margin + x * (width + padding * 2 + margin * 2);
  const actualY = margin + y * (height + padding * 2 + margin * 2);
  const actualWidth = width;
  const actualHeight = height;

  // Create a new ImageData object for the sub-image
  const subImageData = new ImageData(actualWidth, actualHeight);
  const subData = subImageData.data;

  // Loop through the sub-image dimensions and copy the pixel data
  for (let row = 0; row < actualHeight; row++) {
    for (let col = 0; col < actualWidth; col++) {
      const sourceIndex = ((actualY + row) * imgWidth + (actualX + col)) * 4;
      const destIndex = (row * actualWidth + col) * 4;

      subData[destIndex] = imgData[sourceIndex]; // Red
      subData[destIndex + 1] = imgData[sourceIndex + 1]; // Green
      subData[destIndex + 2] = imgData[sourceIndex + 2]; // Blue
      subData[destIndex + 3] = imgData[sourceIndex + 3]; // Alpha
    }
  }

  return subImageData;
}

export function Guide({
  guideContent,
  guideImageText,
  typescriptDefinitions,
  imageDefinitions,
}: {
  guideContent: ERApiData["data"];
  guideImageText: string;
  typescriptDefinitions: any;
  imageDefinitions: any;
}) {
  const { name, isPvE, inventory, stats, computed } = guideContent;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data: buffer } = useRGBABase64String(guideImageText);
  const [definitionKey, setDefinitionKey] = useState("");

  const validator = useCallback(() => {
    const ajv = new Ajv();
    try {
      return ajv.compile(typescriptDefinitions);
    } catch (error: any) {
      console.error(error);
      return () => false;
    }
  }, [typescriptDefinitions]);

  useEffect(() => {
    if (isPvE) setDefinitionKey("cooperator");
    if (!isPvE) setDefinitionKey("invader");
  }, [isPvE]);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!buffer) return;
    if (!typescriptDefinitions) return;
    if (!imageDefinitions) return;
    if (!validator()(imageDefinitions)) return;
    if (!definitionKey) return;

    const allDefinitionAttributes: Schema[] = imageDefinitions.definitions;
    const definitionAttributes: any = allDefinitionAttributes.find((elm) => {
      try {
        if (!Object.keys(elm)) return {};

        return Object.keys(elm).includes(definitionKey);
      } catch (e: any) {
        console.error(e);
        return {};
      }
    });
    const imageConfig = {
      ...imageDefinitions.standards[0],
      ...(definitionAttributes[definitionKey] || {}),
    };

    const canvas = canvasRef.current;
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext("2d");

    const imageDataObj = new ImageData(buffer, canvas.width, canvas.height);

    const subImageData = getSubImage(imageDataObj, imageConfig);
    if (!subImageData) return;
    canvas.width = imageConfig.width;
    canvas.height = imageConfig.height;
    context?.putImageData(subImageData, 0, 0);
  }, [
    buffer,
    definitionKey,
    imageDefinitions,
    typescriptDefinitions,
    validator,
  ]);

  return (
    <div id="guide" className="flex flex-col flex-grow relative h-screen">
      <div className="leading-none uppercase font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
        <h1 className={styles(titleStyles)}>Build Guides</h1>
        <CharacterName name={name} />
        <PvE isPvE={isPvE}>
          <canvas className="w-fit h-fit" ref={canvasRef}></canvas>
        </PvE>
        <CharacterStats stats={stats} />
        <Computed computed={computed} />
        <Inventory inventory={inventory} />
      </div>
    </div>
  );
}
