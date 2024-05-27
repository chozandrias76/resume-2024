import { Ajv } from "ajv";

import { useRGBABase64String } from "@/hooks/useRGBABase64String";
import type {
  ERApiData,
  IComputed,
  IDefenses,
  IInventory,
  IPoise,
  IResistances,
  IStats,
} from "@/lib/erApiData.interface";
import { styles } from "@/util/styles";
import { useRef, useEffect, useCallback, useState } from "react";
import { Schema } from "@/types/schemaTypes";

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
  "mt-2",
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

const PvE = ({
  isPvE,
  children,
}: {
  isPvE: boolean;
  children: React.ReactNode;
}) => {
  const className = styles(captionStyles);
  return (
    <div>
      {isPvE ? (
        <div className={className}>
          For PvE Players<div>{children}</div>
        </div>
      ) : (
        <div className={className}>
          For PvP Players<div>{children}</div>
        </div>
      )}
    </div>
  );
};

const CharacterName = ({ name }: { name: string }) => {
  return (
    <div>
      <h1 className={styles(blockTextStyles)}>{name}</h1>
    </div>
  );
};

const CharacterStats = ({ stats }: { stats: IStats }) => {
  const orderedStats: readonly [string, keyof IStats][] = Object.freeze([
    ["Vigor", "vig"],
    ["Mind", "mnd"],
    ["Endurance", "vit"],
    ["Strength", "str"],
    ["Dexterity", "dex"],
    ["Intelligence", "int"],
    ["Faith", "fth"],
    ["Arcane", "arc"],
  ]);

  return (
    <>
      <div className={styles("mb-4", ...statBlockStyles)}>
        <p className="mb-2">Rune Level: {stats.rl}</p>
        <div className="grid grid-cols-4">
          {orderedStats.map((statKeys, idx) => {
            return (
              <p key={idx}>
                {statKeys[0]}: {stats[statKeys[1]]}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

function Resistances({ data }: { data: IResistances }) {
  return (
    <div>
      Resistances:{" "}
      <div className="grid grid-cols-2 mt-2">
        {Object.keys(data).map((resistance, idx) => {
          return (
            <div className={styles(...statBlockStyles)} key={idx}>
              {resistance}: {data[resistance as keyof IResistances]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Poise({ data }: { data: IPoise }) {
  return <div>Poise: {data.original}</div>;
}
function Defenses({ data }: { data: IDefenses }) {
  return (
    <div>
      <p>Defenses: </p>
      <div className="grid grid-cols-4 mt-2">
        {Object.keys(data).map((defense, idx) => {
          return (
            <div className={styles(...statBlockStyles)} key={idx}>
              {defense}: {data[defense as keyof IDefenses]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Absorption({ data }: { data: IDefenses }) {
  return (
    <div>
      Absorption:{" "}
      <div className="grid grid-cols-2 mt-2">
        {Object.keys(data).map((defense, idx) => {
          return (
            <div className={styles(...statBlockStyles)} key={idx}>
              {defense}: {Math.round(data[defense as keyof IDefenses])}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const DefaultComputedKey = ({
  data,
  computedKey,
}: {
  data: number;
  computedKey: keyof IComputed;
}) => {
  let colorClassName = "";
  switch (computedKey) {
    case "maxHealth":
      colorClassName = "pl-0.5 bg-red-600";
      break;
    case "maxStamina":
      colorClassName = "pl-0.5 bg-lime-600";
      break;
    case "maxFP":
      colorClassName = "pl-0.5 bg-sky-600";
    default:
      break;
  }
  return (
    <div className={styles(colorClassName, ...statBlockStyles)}>
      {splitAndTitleize(computedKey)}: {data}
    </div>
  );
};

const ComputedKey = ({ computedKey }: { computedKey: keyof IComputed }) => {
  switch (computedKey) {
    case "poise":
      return Poise;
    case "defenses":
      return Defenses;
    case "absorption":
      return Absorption;
    case "resistances":
      return Resistances;
    case "maxEquipLoad" ||
      "maxStamina" ||
      "maxEquipLoad" ||
      "maxFP" ||
      "maxHealth":
      return DefaultComputedKey;
    default:
      return DefaultComputedKey;
  }
};

const splitAndTitleize = (input: string): string => {
  const splitString = input.split(/(?=[A-Z])/);
  return splitString
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Computed = ({ computed }: { computed: IComputed }) => {
  const sortedComputedKeys: readonly (keyof IComputed)[] = Object.freeze([
    "defenses",
    "absorption",
    "resistances",
    "maxEquipLoad",
    "poise",
    "maxHealth",
    "maxFP",
    "maxStamina",
  ]);

  return (
    <div>
      <p className="mb-1 font-extrabold">Computed Stats</p>
      <div className="grid gap-3">
        {sortedComputedKeys.map((computedKey, idx) => {
          const Component = ComputedKey({ computedKey });
          return (
            <div key={idx}>
              <Component
                computedKey={computedKey}
                data={
                  computed[computedKey] as number &
                    IPoise &
                    IDefenses &
                    IResistances
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Inventory = ({ inventory }: { inventory: IInventory }) => {
  const stdGridWidth = 5;
  const urlForName = (name: string) =>
    `/elden-ring/weapons/${encodeURIComponent(name.replaceAll("'", ""))}.png`;

  return (
    <>
      <h1 className={styles(subTitleStyles)}>Current Inventory</h1>
      <div className="grid grid-cols-5 gap-2">
        {inventory.slots.map((slot, idx) => (
          <div
            key={idx}
            className="h-48 text-center cursor-grab select-none border border-red-600 bg-no-repeat bg-center bg-cover flex items-center justify-center pop-out-hard-shadow"
            style={{
              backgroundImage: `url(${urlForName(slot.name)})`,
            }}
          >
            <p
              className="p-2.5"
              style={{
                filter: "drop-shadow(2px 4px 6px black)",
                backgroundClip: "text",
                backdropFilter: "blur(1px)",
              }}
            >
              {slot.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

interface SubImageConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  margin: number;
  padding: number;
}

interface SubImageDefinitions {
  [key: string]: SubImageConfig;
}

const SB_Status_00_dds = {
  margin: 1,
  padding: 2,
  width: 38,
  height: 38,
};

const subImageDefinitions: SubImageDefinitions = {
  image1: { x: 1, y: 1, ...SB_Status_00_dds },
  image2: { x: 2, y: 1, ...SB_Status_00_dds },
  blueBuff: { x: 3, y: 5, ...SB_Status_00_dds },
  host: { x: 4, y: 5, ...SB_Status_00_dds },
  paperTime: { x: 3, y: 10, ...SB_Status_00_dds },
  endurance: { x: 10, y: 6, ...SB_Status_00_dds },
  enduranceTransparent: { x: 12, y: 9, ...SB_Status_00_dds },
  // Add more definitions as needed
};

function getSubImage(imageData: ImageData, config: any): ImageData | null {
  const { x, y, width, height, margin, padding } = config;
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
    console.log(imageConfig);

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
    <div
      id="guide"
      className=" flex flex-col flex-grow relative h-screen"
    >
      <div className="leading-none uppercase w-full font-bold px-4 mx-auto lg:mt-10 mt-12 md:flex md:flex-col md:flex-grow">
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
