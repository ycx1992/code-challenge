import type { Application, Request, Response } from "express";
import type { Database, RunResult } from "sqlite3";
import type { Sales, Rtn } from "../models";
import { checkEmpty, checkDataType, runQuery } from "../helper";

export function init(app: Application, db: Database) {
  function checkSales(sales: { [key: string]: any }) {
    let rtn = { code: 0, msg: "", data: {} };

    if (rtn.code == 0) {
      let keys = [
        "contact",
        "gender",
        "age",
        "state",
        "product_code",
        "product_type",
        "price",
        "profit",
        "lead",
        "month",
        "year",
      ];
      rtn = checkEmpty(sales, keys);
    }

    if (rtn.code == 0) {
      let dtype_opt = {
        contact: "TEXT",
        gender: "TEXT",
        age: "INTEGER",
        state: "TEXT",
        product_code: "TEXT",
        product_type: "TEXT",
        price: "REAL",
        profit: "REAL",
        lead: "TEXT",
        month: "TEXT",
        year: "INTEGER",
      };
      rtn = checkDataType(sales, dtype_opt);
    }

    return rtn;
  }

  app.post("/sales", async (req: Request, res: Response) => {
    let rtn: Rtn = { code: 0, msg: "success", data: {} };
    let sales: Sales;

    sales = {
      contact: req.body.contact,
      gender: req.body.gender,
      age: req.body.age,
      state: req.body.state,
      product_code: req.body.product_code,
      product_type: req.body.product_type,
      price: req.body.price,
      profit: req.body.profit,
      lead: req.body.lead,
      month: req.body.month,
      year: req.body.year,
    };
    rtn = checkSales(sales);

    if (rtn.code == 0) {
      let result;
      let sql = "";
      sql += `INSERT INTO computer_sales `;
      sql += `(${Object.keys(sales).join(",")}) `;
      sql += `VALUES `;
      sql += `(${Object.keys(sales)
        .map((k) => `:${k}`)
        .join(",")})`;

      let insertSale = Object.fromEntries(
        Object.entries(sales).map(([key, value]) => [`:${key}`, value]),
      );

      try {
        result = await db.run(sql, insertSale);
        rtn.data["lastID"] = result.lastID;
      } catch (error) {
        console.error(error);
        rtn.code = -1;
        rtn.msg = "Database error";
      }
    }

    res.json(rtn);
  });
}
