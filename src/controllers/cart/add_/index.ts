import { Request, Response } from "express"
import { IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
import cartSchema from "./schema"
export default async function add_to_cart(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const { error } = cartSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const user = req.user as IUser
  const body = req.body
  const existingProduct: any = await db.selectSingle(
    `select * from cart where user_id = $1 and product_id = $2`,
    [user.id, body.product_id]
  )
  if (existingProduct) {
    const dbRes = await db.update("cart", {
      id: existingProduct.id,
      quantity: existingProduct.quantity + 1,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    Utils.sendSuccess(res, {
      message: "Increased quantity",
    })
  } else {
    const dbRes = await db.insert("cart", {
      user_id: user.id,
      product_id: body.product_id,
      quantity: body.quantity,
    })
    if (dbRes.error) {
      return Utils.sendError(res, dbRes.error.message)
    }
    Utils.sendSuccess(res, {
      message: "Product added",
    })
  }
}
