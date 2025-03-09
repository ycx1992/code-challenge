import type { Application } from "express";
import type { Database } from "sqlite";
import fs from "fs";

export async function initApi(app: Application, db: Database) {
  let file_arr = fs.readdirSync(__dirname);

  for (let file of file_arr) {
    if (file.startsWith("index")) {
      continue;
    }

    let api = await import(`./${file}`);
    try {
      api.init(app, db);
    } catch (error) {
      console.warn(`Error initializing API for ${file}:`, error);
    }
  }
}
