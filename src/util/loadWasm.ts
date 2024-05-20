import init, * as wasm from "../../public/wasm";

export async function loadWasm() {
  await init();
  return wasm;
}
