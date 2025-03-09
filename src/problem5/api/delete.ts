import type { Application, Request, Response } from "express";
import type { Database } from "sqlite3";

import type { Sales, Rtn } from "../models";
import { checkDataType } from "../helper";

export function init(app: Application, db: Database) {
  app.delete("/sales/:id", async (req: Request, res: Response) => {
    let rtn: Rtn = { code: 0, msg: "success", data: {} };
    let sales: Sales = {},
      dtype_opt;
    let id: number = parseInt(req.params.id);

    rtn = checkDataType({ id: id }, { id: "INTEGER" });

    if (rtn.code == 0) {
      let result;
      let sql = "";
      sql += `UPDATE computer_sales `;
      sql += `SET valid = 0 `;
      sql += `WHERE id = ${id} AND valid = 1`;

      try {
        // Soft delete data
        result = await db.run(sql);
        rtn.msg = `Delete successful.`;
      } catch (error) {
        console.error(error);
        rtn.code = -1;
        rtn.msg = "Database error";
      }
    }

    res.json(rtn);
  });
}
