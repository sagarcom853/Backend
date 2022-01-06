// const express = require('express') // common js
// const products = require('./data/products')
// const dotenv=require("dotenv")
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
// import products from './data/products.js'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
  res.send('API is running......')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
console.log('inside server')
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.orginalUrl}`)
  res.status(404)
  next(error)
})
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
)
//app.listen(5000, console.log('server running on port 5000'))
