import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
export default async function delete_product(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const db: IDbTools = req.app.locals.db
  const user: any = req.user
  const existingProduct = await db.selectSingle(
    `select * from products where id = $1`,
    [id]
  )
  if (!existingProduct) {
    return Utils.sendError(res, {
      status: "error",
      message: `product with id ${id} does not exist`,
    })
  }
  const dbRes = await db.delete("products", {
    id,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    message: `Product with id ${id} has been deleted`,
  })
}
