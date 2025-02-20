import request from "supertest";
import app from "../../server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { getUser, loginUser, registerUser } from "../../src/controllers/auth/userController.js";
import { deleteUser, getAllUsers } from "../../src/controllers/auth/adminController.js";
import jest from 'jest'

// Mock the controllers
jest.mock("../../src/controllers/auth/userController.js");
jest.mock("../../src/controllers/auth/adminController.js");

const userId = new mongoose.Types.ObjectId().toString();
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

describe("Auth API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should register a new user", async () => {
    registerUser.mockResolvedValue({
      _id: userId,
      name: "Test User",
      email: "test@example.com",
    });

    const res = await request(app)
      .post("/register")
      .send({ name: "Test User", email: "test@example.com", password: "password123" });

    expect(res.status).toBe(201);
  });

  test("should log in a user", async () => {
    loginUser.mockResolvedValue({ token });

    const res = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("should get user profile", async () => {
    getUser.mockResolvedValue({ _id: userId, name: "Test User", email: "test@example.com" });

    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test("should delete a user (Admin only)", async () => {
    deleteUser.mockResolvedValue({ message: "User deleted successfully" });

    const res = await request(app)
      .delete("/admin/users/123")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  test("should return a list of users (Admin only)", async () => {
    getAllUsers.mockResolvedValue([
      { _id: "user1", name: "User One", email: "user1@example.com" },
      { _id: "user2", name: "User Two", email: "user2@example.com" },
    ]);

    const res = await request(app)
      .get("/admin/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});
