import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @openapi
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     description: Allows an authenticated user to create a new task with a title, description, due date, priority, and status.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Complete project report"
 *               description:
 *                 type: string
 *                 example: "Prepare and submit the final report for the project."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-28"
 *               priority:
 *                 type: string
 *                 enum: [Low, Medium, High]
 *                 example: "High"
 *               status:
 *                 type: string
 *                 enum: [Pending, In Progress, Completed]
 *                 example: "Pending"
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65d4f4c3bfb3f2d9a8c7e5a1"
 *                 title:
 *                   type: string
 *                   example: "Complete project report"
 *                 description:
 *                   type: string
 *                   example: "Prepare and submit the final report for the project."
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-28"
 *                 priority:
 *                   type: string
 *                   example: "High"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *                 user:
 *                   type: string
 *                   example: "65d4f4c3bfb3f2d9a8c7e5a0"
 *       400:
 *         description: Bad request due to missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Title is required!"
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.post("/task/create", protect, createTask);


/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     description: Fetches a list of all tasks associated with the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: integer
 *                   example: 3
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "65d4f4c3bfb3f2d9a8c7e5a1"
 *                       title:
 *                         type: string
 *                         example: "Complete project report"
 *                       description:
 *                         type: string
 *                         example: "Prepare and submit the final report for the project."
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-28"
 *                       priority:
 *                         type: string
 *                         example: "High"
 *                       status:
 *                         type: string
 *                         example: "Pending"
 *                       user:
 *                         type: string
 *                         example: "65d4f4c3bfb3f2d9a8c7e5a0"
 *       400:
 *         description: User not found or unauthorized request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found!"
 *       401:
 *         description: Unauthorized - User is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.get("/tasks", protect, getTasks);


/**
 * @openapi
 * /task/{id}:
 *   get:
 *     summary: Get a specific task by ID for the authenticated user
 *     description: Fetches a specific task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65d4f4c3bfb3f2d9a8c7e5a1"
 *                 title:
 *                   type: string
 *                   example: "Complete project report"
 *                 description:
 *                   type: string
 *                   example: "Prepare and submit the final report for the project."
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2025-02-28"
 *                 priority:
 *                   type: string
 *                   example: "High"
 *                 status:
 *                   type: string
 *                   example: "Pending"
 *                 user:
 *                   type: string
 *                   example: "65d4f4c3bfb3f2d9a8c7e5a0"
 *       400:
 *         description: Task ID not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide a task id"
 *       401:
 *         description: Unauthorized - User does not own the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized!"
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.get("/task/:id", protect, getTask);

/**
 * @openapi
 * /task/{id}:
 *   patch:
 *     summary: Update a specific task by ID
 *     description: Updates a specific task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Update project report"
 *               description:
 *                 type: string
 *                 example: "Add financial analysis section to the report."
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-05"
 *               priority:
 *                 type: string
 *                 example: "Medium"
 *               status:
 *                 type: string
 *                 example: "In Progress"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Successfully updated the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65d4f4c3bfb3f2d9a8c7e5a1"
 *                 title:
 *                   type: string
 *                   example: "Update project report"
 *                 description:
 *                   type: string
 *                   example: "Add financial analysis section to the report."
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2025-03-05"
 *                 priority:
 *                   type: string
 *                   example: "Medium"
 *                 status:
 *                   type: string
 *                   example: "In Progress"
 *                 completed:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Task ID not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide a task id"
 *       401:
 *         description: Unauthorized - User does not own the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized!"
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.patch("/task/:id", protect, updateTask);

/**
 * @openapi
 * /task/{id}:
 *   delete:
 *     summary: Delete a specific task by ID
 *     description: Deletes a specific task belonging to the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully!"
 *       401:
 *         description: Unauthorized - User does not own the task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized!"
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task not found!"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong!"
 */
router.delete("/task/:id", protect, deleteTask);


export default router;
