import { Request, Response } from "express"
import { ICart, IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
export default async function delete_cart(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const user = req.user as IUser
  const existingCart = (await db.selectSingle(
    `select * from cart where id = $1`,
    [id]
  )) as ICart
  if (!existingCart) {
    return Utils.sendError(res, "Cart not found")
  }

  if (existingCart.user_id !== user.id) {
    return Utils.sendError(res, "You can only delete your cart")
  }
  const dbRes = await db.delete("cart", {
    id,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    message: `Cart has been deleted`,
  })
}
