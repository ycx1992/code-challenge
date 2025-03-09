import type { Application, Request, Response } from "express";
import type { Database } from "sqlite3";

import type { Sales, Rtn } from "../models";
import { checkDataType } from "../helper";

export function init(app: Application, db: Database) {
  app.put("/sales/:id", async (req: Request, res: Response) => {
    let rtn: Rtn = { code: 0, msg: "success", data: {} };
    let sales: Sales = {},
      dtype_opt;
    let id: number = parseInt(req.params.id);

    rtn = checkDataType({ id: id }, { id: "INTEGER" });

    if (rtn.code == 0) {
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

      dtype_opt = {
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

      // Select the data that have value: Assume data undefined means not changes
      sales = Object.fromEntries(
        Object.entries(sales).filter(([_, v]) => v != undefined),
      );

      rtn = checkDataType(sales, dtype_opt);
    }

    if (rtn.code == 0) {
      let result;
      let sql = "";
      sql += `UPDATE computer_sales `;
      sql += `SET `;
      sql += `${Object.keys(sales)
        .map((k) => `${k} = :${k} `)
        .join(",")}`;
      sql += `WHERE id = ${id} AND valid = 1`;

      let updateSale = Object.fromEntries(
        Object.entries(sales).map(([key, value]) => [`:${key}`, value]),
      );

      try {
        result = await db.run(sql, updateSale);
        rtn.msg = `Update successful. Changed ${result.changes} rows.`;
      } catch (error) {
        console.error(error);
        rtn.code = -1;
        rtn.msg = "Database error";
      }
    }

    res.json(rtn);
  });
}
