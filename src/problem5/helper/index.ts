import type { Database, RunResult } from "sqlite3";

export function checkEmpty(data: { [key: string]: any }, key_arr: string[]) {
  let rtn = { code: 0, msg: "", data: {} };

  for (let key of key_arr) {
    if (!data[key]) {
      rtn.code = -1;
      rtn.msg = `Missing key: ${key}`;
      break;
    }
  }

  return rtn;
}

export function checkDataType(
  data: { [key: string]: any },
  dtype_opt: { [key: string]: string },
) {
  let rtn = { code: 0, msg: "", data: {} };

  for (let key in data) {
    switch (dtype_opt[key]) {
      case "TEXT":
        if (typeof data[key] !== "string") {
          rtn.code = -2;
          rtn.msg = `Invalid data type for key: ${key}. Should be string.`;
          break;
        }
        break;
      case "INTEGER":
        if (typeof data[key] !== "number" || !Number.isInteger(data[key])) {
          rtn.code = -2;
          rtn.msg = `Invalid data type for key: ${key}. Should be integer.`;
          break;
        }
        break;
      case "REAL":
        if (typeof data[key] !== "number") {
          rtn.code = -2;
          rtn.msg = `Invalid data type for key: ${key}. Should be number.`;
          break;
        }
        break;
      default:
        rtn.code = -2;
        rtn.msg = `Not supported data type check: ${dtype_opt[key]}`;
        break;
    }
  }

  return rtn;
}
