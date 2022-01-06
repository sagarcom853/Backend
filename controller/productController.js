import asyncHandler from 'express-async-handler'
import Product from '../models/productModal.js'

//@desc Fetch all Products
//@route GET/api/products
//@access Public

//@desc Fetch all Products
//@route GET/api/products
//@access Public
// router.get(
//   '/',
//   AsyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     // res.status(401)
//     // throw new Error("NOT Authorized")
//     res.json(products)
//   })
// )

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // res.status(401)
  // throw new Error("NOT Authorized")
  res.json(products)
})

//@desc Fetch single Product
//@route GET/api/product:/id
//@access Public
// router.get(
//   '/:id',
//   AsyncHandler(async (req, res) => {
//     const product = await Product.findById(req.params.id)
//     if (product) {
//       res.send(product)
//     } else {
//       res.status(404).json({ message: 'Product not found' })
//     }
//   })
// )

//@desc Fetch single Product
//@route GET/api/product:/id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.status(404).json({ message: 'Product not found' })
  }
})

//@desc Delete product
//@route DELETE/api/products/:id
//acess Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw Error('Product not found')
  }
})

//@desc Create product
//@route POST/api/products/
//acess Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc Update product
//@route PUT/api/products/:id
//acess Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct=await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProducts, getProductById, deleteProduct,createProduct, updateProduct}
