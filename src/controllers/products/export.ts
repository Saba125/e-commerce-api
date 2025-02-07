import add_product from "./add_product"
import delete_product from "./delete_product"
import edit_product from "./edit_product"
import get_bookmarked_products from "./get_bookmarked_products"
import get_products from "./get_products"
import get_single_product from "./get_single_product"
const productsController = {
  add_product,
  delete_product,
  edit_product,
  get_single_product,
  get_products,
  get_bookmarked_products,
}
export default productsController
