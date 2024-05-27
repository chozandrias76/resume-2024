import { IInventory } from "@/lib/erApiData.interface";
import { styles, subTitleStyles } from "@/util/styles";

const Inventory = ({ inventory }: { inventory: IInventory }) => {
  const stdGridWidth = 5;
  const urlForName = (name: string) =>
    `/elden-ring/weapons/${encodeURIComponent(name.replaceAll("'", ""))}.png`;

  return (
    <>
      <h1 className={styles(subTitleStyles)}>Current Inventory</h1>
      <div className={`grid grid-cols-${stdGridWidth} gap-3`}>
        {inventory.slots.map((slot, idx) => (
          <div
            key={idx}
            className="aspect-square sm:h-24 md:h-36 lg:h-48 text-center cursor-grab select-none border border-red-600 bg-no-repeat bg-center bg-cover flex items-center justify-center pop-out-hard-shadow"
            style={{
              // Needs to be replaced with S3 retrieval or DDS
              // backgroundImage: `url(${urlForName(slot.name)})`,
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

export default Inventory;