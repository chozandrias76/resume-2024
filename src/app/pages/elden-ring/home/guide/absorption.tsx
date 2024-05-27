import { IDefenses } from "@/lib/erApiData.interface";
import { styles, statBlockStyles } from "@/util/styles";

function Absorption({ data }: { data: IDefenses }) {
  return (
    <div>
      Absorption:{" "}
      <div className="grid grid-cols-2 mt-2 gap-2">
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

export default Absorption;
