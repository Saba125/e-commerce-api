import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function delete_category(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const dbRes = await db.delete("categories", {
    name: req.body.name,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    message: `Category has been deleted`,
  })
}
