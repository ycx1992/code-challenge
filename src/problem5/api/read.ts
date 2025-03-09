import type { Application, Request, Response } from "express";
import type { Database } from "sqlite3";

export function init(app: Application, db: Database) {
  app.get("/sales", async (req: Request, res: Response) => {
    let page = 1;
    if (typeof req.query.page === "string") {
      page = parseInt(req.query.page);
    }

    // Basic month & year filter
    let where = "WHERE valid = 1 ";
    if (typeof req.query.month === "string") {
      where += `AND month = ${parseInt(req.query.month)} `;
    }
    if (typeof req.query.year === "string") {
      where += `AND year = ${parseInt(req.query.year)} `;
    }

    let sql = "";
    sql += `SELECT id, contact, product_code, product_type, price, `;
    sql += `profit, month, year `;
    sql += `FROM computer_sales `;
    sql += where;
    sql += `LIMIT 10 OFFSET ${(page - 1) * 10}`;

    let rows = await db.all(sql);

    res.json(rows);
  });

  app.get("/sales/:id", async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id);

    let sql = "";

    sql += `SELECT id, contact, gender, age, state, `;
    sql += `product_code, product_type, price, profit, lead, `;
    sql += `month, year `;
    sql += `FROM computer_sales `;
    sql += `WHERE id = ${id} AND valid = 1`;

    let data = await db.get(sql);

    res.json(data ?? {});
  });
}
