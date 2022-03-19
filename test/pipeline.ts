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
    expect(result).to.deep.equal([
      "MzQ4ODc4MDQ1ZDQ3ZDc1NjU0NWU5YzUyZjVhMGFjZTE5NjVkNDliOTU2MjNhNGJhZTBlNDNmMGVmYmExYTQ2MQ==",
      "N2EwOWRjYTkyOWNlYzZkYmEyZjg0MzEzOWYyN2I2NDE5YWQwMmQ4M2I1NzYzYzFmNWNhYjM3YzRmMjY2NGY0MA==",
      "ZGNmZGU3M2Q0Y2Q5YzE0ZWFmYmIwZWQxMmFkODI2MzU0NjY2MTdiYmZkZDM4YmUxN2UyMmU5MjM5YmU3MTNlNQ==",
    ]);
  });
});
