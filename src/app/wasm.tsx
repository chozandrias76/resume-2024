import { useEffect, useState } from "react";
import { loadWasm } from "../util/loadWasm";

const Wasm: React.FC = () => {
  const [response, setResponse] = useState<{data: Uint16Array}>();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) return;

    const readFile = async (file: File) => {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      const wasm = await loadWasm();
      const checksum = wasm.read_checksum_from_bytes(bytes, 0);
      console.info("Checksum read: ", checksum)
      setResponse(checksum);
    };

    readFile(file);
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <ul>
        {response && response?.data.length > 0 && Array.from(response.data)?.map((val, idx) => {
          return <li key={idx}>{val}</li>;
        })}
      </ul>
    </div>
  );
};

export default Wasm;
