import { Request, Response } from "express"
import { IDbTools, IProduct } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_single_product(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const product = await db.selectSingle(
    "select * from products where id = $1",
    [id]
  )
  if (!product) {
    return Utils.sendError(res, "Product not found")
  }
  Utils.sendSuccess(res, {
    product,
  })
}
