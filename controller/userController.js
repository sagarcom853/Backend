import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const getUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc Register a new user
//@route POST/api/users
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    res.status(400)
    throw new Error('user already Exists')
  }
  const userNew = await User.create({
    name: name,
    email: email,
    password: password,
  })
  console.log(userNew)
  if (userNew) {
    res.status(201).json({
      _id: userNew._id,
      name: userNew.name,
      email: userNew.email,
      isAdmin: userNew.isAdmin,
      token: generateToken(userNew._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

//@desc GEt user profile
//@route GET/api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('invalid user email or passwaord')
  }
})

//@desc Update user profile
//@route PUT/api/users/profile
//@access Private

const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

//@desc Get all users
//@route GET/api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@desc Delete user
//@route DELETE/api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: 'user Removed' })
  } else {
    res.status(404)
    throw Error('User not found')
  }
})

//@desc Get  user by id
//@route GET/api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw Error('get user by id-User not found')
  }
})

//@desc Update user by id
//@route PUT/api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const userNew = await user.save()
    res.json({
      _id: userNew._id,
      name: userNew.name,
      email: userNew.email,
      isAdmin: userNew.isAdmin,
    })
  }
  else{
    res.json(404)
    throw Error('Update User-User not found')
  }
 
})

export {
  getUser,
  getUserProfile,
  UpdateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
