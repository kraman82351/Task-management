import express from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
} from "../controllers/auth/userController.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
} from "../controllers/auth/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.get("/logout", logoutUser);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 */
router.get("/user", protect, getUser);

/**
 * @swagger
 * /user:
 *   patch:
 *     summary: Update user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch("/user", protect, updateUser);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

/**
 * @swagger
 * /login-status:
 *   get:
 *     summary: Check login status
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login status retrieved
 */
router.get("/login-status", userLoginStatus);

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify email
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.post("/verify-email", protect, verifyEmail);

/**
 * @swagger
 * /verify-user/{verificationToken}:
 *   post:
 *     summary: Verify user via token
 *     tags: [Auth]
 *     parameters:
 *       - name: verificationToken
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 */
router.post("/verify-user/:verificationToken", verifyUser);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /reset-password/{resetPasswordToken}:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - name: resetPasswordToken
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
router.post("/reset-password/:resetPasswordToken", resetPassword);

/**
 * @swagger
 * /change-password:
 *   patch:
 *     summary: Change password (User must be logged in)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.patch("/change-password", protect, changePassword);

export default router;
