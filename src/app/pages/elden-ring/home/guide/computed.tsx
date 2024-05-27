import { IComputed, IPoise, IDefenses, IResistances } from "@/lib/erApiData.interface";
import Absorption from "./absorption";
import Defenses from "./defenses";
import Poise from "./poise";
import Resistances from "./resistances";
import { statBlockStyles, styles } from "@/util/styles";

const splitAndTitleize = (input: string): string => {
  const splitString = input.split(/(?=[A-Z])/);
  return splitString
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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

export default Computed;