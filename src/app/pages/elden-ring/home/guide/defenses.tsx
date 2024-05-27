import { IDefenses } from "@/lib/erApiData.interface";
import { styles, statBlockStyles } from "@/util/styles";

function Defenses({ data }: { data: IDefenses }) {
  return (
    <div>
      <p>Defenses: </p>
      <div className="grid grid-cols-4 mt-2 gap-2">
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

export default Defenses;