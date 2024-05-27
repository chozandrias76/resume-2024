import { IResistances } from "@/lib/erApiData.interface";
import { styles, statBlockStyles } from "@/util/styles";

function Resistances({ data }: { data: IResistances }) {
  return (
    <div>
      <p>Resistances: </p>
      <div className="grid grid-cols-2 mt-2 gap-2">
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

export default Resistances;
