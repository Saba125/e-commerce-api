import { Request, Response } from "express"
import { IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_cart_products(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const user = req.user as IUser
  const dbRes = await db.select(
    `select products.*,cart.* from cart join products on cart.product_id = products.id where cart.user_id = $1`,
    [user.id]
  )
  Utils.sendSuccess(res, {
    res: dbRes.list,
  })
}
