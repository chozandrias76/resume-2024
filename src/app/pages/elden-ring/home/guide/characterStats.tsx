import { IStats } from "@/lib/erApiData.interface";
import { styles, statBlockStyles } from "@/util/styles";

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
        <div className="grid grid-cols-4 gap-2">
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
export default CharacterStats