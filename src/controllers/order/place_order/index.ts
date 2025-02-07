import { Request, Response } from "express"
import { IDbTools, IUser } from "../../../interfaces"
import Utils from "../../../utils"
import { send_order_confirmation_email } from "../../../mail"
function generateOrderNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000)
  return `ORD-${randomNumber.toString().padStart(6, "0")}`
}
export default async function place_order(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const user = req.user as IUser
  const products = []
  const cart = await db.select(
    `select products.*, cart.* from cart join products on cart.product_id = products.id where cart.user_id = $1`,
    [user.id]
  )
  if (cart.error) {
    return Utils.sendError(res, cart.error.message)
  }
  if (cart.list?.length! < 0) {
    return Utils.sendError(res, "Your cart is empty")
  }
  const totalAmount = cart.list?.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.quantity
  }, 0)
  for (const item of cart.list!) {
    products.push({
      id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })
  }
  const order = await db.insert("orders", {
    order_number: generateOrderNumber(),
    user_id: user.id,
    total_amount: totalAmount,
  })
  if (order.error) {
    return Utils.sendError(res, order.error.message)
  }
  const emailData = {
    orderNumber: order.data.order_number,
    customerEmail: user.email,
    orderItems: products,
  }
  await send_order_confirmation_email(user.email, emailData)
  Utils.sendSuccess(res, {
    order: order.data,
    message: "Your order has been placed",
  })
}
