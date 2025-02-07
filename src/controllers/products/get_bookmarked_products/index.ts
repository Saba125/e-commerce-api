import { Request, Response } from "express"
import { IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_bookmarked_products(
  req: Request,
  res: Response
) {
  const db: IDbTools = req.app.locals.db
  const user = req.user as IUser
  const bookmarkedProducts = await db.select(
    `select products.*, bookmarks.* from bookmarks join products on products.id = bookmarks.product_id where bookmarks.user_id = $1`,
    [user.id]
  )
  console.log(bookmarkedProducts.list)
}
