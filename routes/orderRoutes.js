import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToPaidByCash,
  updateOrderToPaidByGpay,
  getMyOrders,
  getOrders
} from '../controller/orderController.js'
import { protect,admin } from '../middlewares/authMiddleware.js'

console.log('inside Route orrder')
console.log(addOrderItems)
router.route('/').post(protect, addOrderItems).get(protect,admin,getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered)
router.route('/:id/cash').put(protect, updateOrderToPaidByCash)
router.route('/:id/Gpay').put(protect, updateOrderToPaidByGpay)

export default router
