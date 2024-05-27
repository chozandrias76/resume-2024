import { IPoise } from "@/lib/erApiData.interface";

function Poise({ data }: { data: IPoise }) {
  return <div>Poise: {data.original}</div>;
}

export default Poise;