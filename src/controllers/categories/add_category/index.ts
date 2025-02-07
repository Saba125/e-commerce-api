import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function add_category(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const dbRes = await db.insert("categories", {
    name: req.body.name,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    category: dbRes.data,
  })
}
