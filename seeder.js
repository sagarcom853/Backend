import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModal.js'
import Order from './models/orderModal.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  console.log('inside import')
  //async bcz mongoose returns promise
  try {
    console.log('inside try')
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id //first item is admin in users.js
    const sampleProducts = products.map((product) => {
      console.log('inside sample products')
      return { ...product, user: adminUser }
    })
    console.log('before insert many')
    await Product.insertMany(sampleProducts)
    console.log('after insert many')
    console.log('Data Imported!'.green.inverse)
  } catch (error) {
    console.log('1')
    console.error(`${error}`.red.inverse.bold)
    process.exit(1)
  }
}

const destroyData = async () => {
  //asnyc bcz mongoose returns promise
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse.underline)
  } catch (error) {
    console.log('2')
    console.error(`${error}`.yellow.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
