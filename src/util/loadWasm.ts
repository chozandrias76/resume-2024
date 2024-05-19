import init, * as wasm from "../../rust/er-save-file-readers/pkg/er_save_file_readers";

export async function loadWasm() {
  await init();
  return wasm;
}
