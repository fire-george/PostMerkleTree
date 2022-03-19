import { Command } from "commander";
import { join } from "path";
import { createReadStream } from "fs";
import { pipeline } from "./pipeline.js";
import axios from "axios";

const program = new Command();
program.requiredOption("-f, --file <file>", "input csv file");
program.parse(process.argv);

const options = program.opts();
const filename = options.file;
if (!filename.match(/\.csv$/)) throw new Error("File should be a csv file.");
const filePath = join(process.cwd(), options.file);

const stream = createReadStream(filePath);
const result = await pipeline(stream);

const response = await axios.post(
  "https://lf8d031acj.execute-api.ap-east-1.amazonaws.com/api/v1/merkle_tree/create",
  { leaves: result }
);
console.log(response.status);
console.log(response.data);
