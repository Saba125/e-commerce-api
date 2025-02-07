import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"

import upload from "../config/multer"
import roleMiddleware from "../middlewares/permission"
import productsController from "../controllers/products/export"
import categoryController from "../controllers/categories/export"
import cartController from "../controllers/cart/export"
import orderController from "../controllers/order/export"
import bookmarkController from "../controllers/bookmarks/export"

export enum Roles {
  Buyer = "buyer",
  Admin = "admin",
}

const Router = express.Router()
// users
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.post("/auth/verifyEmail", usersController.verifyEmail)
Router.get("/auth/aboutMe", authMiddleware, usersController.aboutMe)
// products
Router.post(
  "/products",
  authMiddleware,
  upload.array("images"),
  productsController.add_product
)
Router.delete(
  "/products/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  productsController.delete_product
)
Router.put(
  "/products/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  productsController.edit_product
)
Router.get(
  "/products/:id",
  authMiddleware,
  productsController.get_single_product
)
Router.get("/products/", authMiddleware, productsController.get_products)

// categories
Router.post(
  "/category",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  categoryController.add_category
)
Router.put(
  "/category/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  categoryController.edit_category
)
Router.delete(
  "/category/:id",
  authMiddleware,
  roleMiddleware(Roles.Admin),
  categoryController.delete_category
)
Router.get(
  "/category/:id",
  authMiddleware,
  categoryController.get_single_category
)
// cart
Router.post("/cart/add", authMiddleware, cartController.add_to_cart)
Router.delete("/cart/:id", authMiddleware, cartController.delete_cart)
Router.get("/cart/", authMiddleware, cartController.get_cart_products)
// orders
Router.post("/order", authMiddleware, orderController.place_order)
// bookmarks
Router.post(
  "/bookmark",
  authMiddleware,
  bookmarkController.add_or_remove_bookmark
)
Router.get(
  "/bookmark/products",
  authMiddleware,
  productsController.get_bookmarked_products
)
export default Router
