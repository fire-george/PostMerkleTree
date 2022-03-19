import type { Readable } from "stream";
import { parse } from "csv";
import { transform } from "stream-transform";
import keccak256 from "keccak256";
import { Buffer } from "buffer";

export async function pipeline(stream: Readable) {
  const parser = parse();
  const transformer = transform(function (data) {
    return data[1];
  });
  const regex = /0x[a-fA-F0-9]{40}/;
  const filter = transform(function (data: string) {
    const found = data.match(regex);
    if (found) return found[0];
  });
  const pipe = stream
    .pipe(parser)
    .pipe(transformer)
    .pipe(filter);
  const result = [];
  for await (const record of pipe) {
    result.push(record);
  }
  return result.sort().map((value: string) => {
    return Buffer.from(value.slice(2), "hex").toString("base64");
  });
}
