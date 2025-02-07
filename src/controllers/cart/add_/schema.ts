import Joi from "joi"
const cartSchema = Joi.object({
  product_id: Joi.number().required(),
  quantity: Joi.number().required(),
})
export default cartSchema
