import { Request, Response } from "express"
import { IDbTools } from "../../../interfaces"
import Utils from "../../../utils"
import addProductSchema from "./schema"
export default async function add_product(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const body = req.body
  const images = req.files
    ? (req.files as Express.Multer.File[]).map(
        (file) => `/images/${file.filename}`
      )
    : []
  const { error } = addProductSchema.validate(req.body)
  if (error) {
    return Utils.sendError(res, {
      status: "error",
      message: error.details.map((item) => item.message),
    })
  }
  const dbRes = await db.insert("products", {
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
