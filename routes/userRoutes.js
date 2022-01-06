import express from 'express'
const router = express.Router()
import {
  getUser,
  registerUser,
  UpdateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controller/userController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'

router.route('/').post(registerUser)
router.route('/').get(protect, admin, getUsers)
router.route('/login').post(getUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, UpdateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
export default router
