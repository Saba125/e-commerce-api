import Joi from "joi"
const editProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  stock: Joi.number().optional(),
  category_id: Joi.number().optional(),
})
export default editProductSchema
