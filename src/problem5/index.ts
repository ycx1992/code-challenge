import fs from "fs";

import express from "express";
import toml from "toml";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { initApi } from "./api";

async function run() {
  // Load config
  let config = toml.parse(fs.readFileSync("config.toml", "utf8"));

  // Load database
  let db = await open({
    filename: config["database"]["path"],
    driver: sqlite3.Database,
  });

  // Load app
  let app = express();
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // Load API
  initApi(app, db);

  // Start app
  app.listen(config["express"]["port"], () => {
    console.log(`App listening on port ${config["express"]["port"]}`);
  });
}

try {
  run();
} catch (error) {
  console.error(error);
}
