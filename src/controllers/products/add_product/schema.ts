import Joi from "joi"
const addProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category_id: Joi.number().required(),
})
export default addProductSchema
