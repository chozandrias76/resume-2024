export async function readStreamAsText(stream: ReadableStream<Uint8Array> | null) {
  if(!stream) {
    return "";
  }
  const reader = stream.getReader();
  let result = '';
  let decoder = new TextDecoder(); // Default is utf-8
  while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
  }
  result += decoder.decode(); // flush the decoder
  return result;
}