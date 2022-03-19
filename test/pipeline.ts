import { createReadStream } from "fs";
import { pipeline } from "../src/pipeline.js";
import { dirname, join } from "path";
import { URL } from "url";
import { expect } from "chai";

describe("The pipeline", function () {
  it("should parse the csv correctly", async function () {
    const currentDir = dirname(import.meta.url);
    const stream = createReadStream(
      new URL(join(currentDir, "./assets/a.csv"))
    );
    const result = await pipeline(stream);
    expect(result).to.be.deep.equal([
      "YtufQLrpX0SbrPvpDCckRr7xjAQ=",
      "troEvtory4EHV4mOgA6ml5nyn44=",
      "x5CdkGa3pW8K1WvvvPCInYLFyV8=",
    ]);
  });
});
