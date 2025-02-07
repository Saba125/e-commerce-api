import { Request, Response } from "express"
import { IDbTools, IProduct } from "../../../interfaces"
import Utils from "../../../utils"
import editProductSchema from "./schema"
export default async function edit_product(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const id = parseInt(req.params.id)
  const body = req.body
  const { error } = editProductSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const existingProduct = (await db.selectSingle(
    `select * from products where id = $1`,
    [id]
  )) as IProduct
  if (!existingProduct) {
    return Utils.sendError(res, {
      status: "error",
      message: `Product with id ${id} is not found`,
    })
  }
  const images = req.files
    ? (req.files as Express.Multer.File[]).map(
        (file) => `/images/${file.filename}`
      )
    : existingProduct.images
  const dbRes = await db.update("products", {
    id,
    ...body,
    images,
  })
  if (dbRes.error) {
    return Utils.sendError(res, dbRes.error.message)
  }
  Utils.sendSuccess(res, {
    product: dbRes.data,
  })
}
