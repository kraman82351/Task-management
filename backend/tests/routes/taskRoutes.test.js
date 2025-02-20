import request from "supertest";
import app from "../../server"; // Import the main Express app
import Task from "../../src/routes/tasksRoutes.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// Mock the Task model
jest.mock("../../src/routes/tasksRoutes.js");

// Generate a mock JWT token
const userId = new mongoose.Types.ObjectId().toString();
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

describe("Task API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new task", async () => {
    Task.create.mockResolvedValue({
      title: "Test Task",
      description: "Task description",
    });

    const res = await request(app)
      .post("/task/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Task description" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });

  test("should return 400 for invalid task creation request", async () => {
    const res = await request(app)
      .post("/task/create")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "" }); // Invalid request

    expect(res.status).toBe(400);
  });

  test("should delete a task", async () => {
    Task.findByIdAndDelete.mockResolvedValue({ _id: "task123" });

    const res = await request(app)
      .delete("/task/task123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted successfully");
  });
});
