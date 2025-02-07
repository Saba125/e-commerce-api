import Joi from "joi"
const orderSchema = Joi.object({
  total_amount: Joi.number().required(),
  status: Joi.string().valid("pending", "shipped", "delivered").required(),
})
export default orderSchema
