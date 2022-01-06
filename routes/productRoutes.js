import express from 'express'
const router = express.Router()
// import AsyncHandler from 'express-async-handler'
import {admin,protect} from "../middlewares/authMiddleware.js"
import {getProducts,getProductById,deleteProduct,updateProduct,createProduct} from "../controller/productController.js"

router.route("/").get(getProducts).post(protect,admin,createProduct) // router.get("/",getProducts)
router.route("/:id").get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


export default router
