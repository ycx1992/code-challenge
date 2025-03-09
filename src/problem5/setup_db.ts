import fs from "fs";

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import toml from "toml";

// Load config
let config = toml.parse(fs.readFileSync("config.toml", "utf8"));

// Load database
let db = await open({
  filename: config["database"]["path"],
  driver: sqlite3.Database,
});

let sql_files = fs.readdirSync("./sql");

for (let file of sql_files) {
  let sql = fs.readFileSync(`./sql/${file}`, "utf8");
  await db.exec(sql);
}
