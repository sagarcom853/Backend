import asyncHandler from 'express-async-handler'
import Order from '../models/orderModal.js'

var today = new Date()
var date =
  today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
var time =
  // today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()    //24 hour format
  today.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }) // 12 hour format
var tim = date + ',' + time

// @desc : Create new order
// @route : POST/api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  console.log('inside order controler')
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    taxRounded,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No ORder Items')
    return
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      taxRounded,
      totalPrice,
      user: req.user._id,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
//desc GET ORDER BY Id
//@route GET /api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})



//desc update ORDER to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    //  res.send(order)
    order.isPaid = true
    order.paidAt = tim
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email: req.body.email,
    }
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToPaidByCash = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = tim
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email: req.body.email,
    }
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateOrderToPaidByGpay = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  console.log('here')
  if (order) {
    order.isPaid = true
    order.paidAt = tim
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email: req.body.email,
    }
    // res.send(order.paymentResult)
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
//@desc Get logged in user orderItems
//@route GET/api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@desc Get to fetch all orders and populate order
//@route GET/api/orders
//@access Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')
  res.json(orders)
})

//desc update ORDER to Deliver
//@route GET /api/orders/:id/deliver
//@access Private Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    //  res.send(order)
    order.isDelivered = true
    order.deliveredAt = tim
    console.log(tim)
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToPaidByCash,
  updateOrderToPaidByGpay,
  getMyOrders,
  getOrders
}
