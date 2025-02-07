import { Request, Response } from "express"
import { IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
export default async function add_or_remove_bookmark(
  req: Request,
  res: Response
) {
  const db: IDbTools = req.app.locals.db
  const user = req.user as IUser
  const body = req.body
  const bookmark: any = await db.selectSingle(
    `select * from bookmarks where product_id = $1 and user_id = $2`,
    [body.product_id, user.id]
  )
  if (bookmark) {
    const dbRes = await db.delete("bookmarks", {
      id: bookmark.id,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    Utils.sendSuccess(res, "Bookmark has been removed")
  } else {
    const dbRes = await db.insert("bookmarks", {
      user_id: user.id,
      product_id: body.product_id,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    Utils.sendSuccess(res, "Bookmark has been added")
  }
  
}
