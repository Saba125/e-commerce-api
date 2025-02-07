import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_products(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const products = await db.select(
    `select products.*, categories.name as category_name from products join categories on products.category_id = categories.id order by products.price asc `
  )
  Utils.sendSuccess(res, {
    products: products.list,
  })
}
