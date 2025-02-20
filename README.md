# **Next.js & Express.js Application Setup Guide**
 
## **Project Overview**
 
This application consists of a **Next.js frontend** and an **Express.js backend**, with **MongoDB Atlas** as the database. The backend connects to MongoDB using a connection string stored in the `.env` file.
 
### **Tech Stack:**
 
- **Frontend:** Next.js (React, Tailwind CSS)
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB Atlas
- **Containerization:** Docker & Docker Compose
 
---
 
## **Prerequisites**
 
Ensure you have the following installed on your machine:
 
- **Node.js** (v16+ recommended) → [Download](https://nodejs.org/)
- **Docker & Docker Compose** → [Install Docker](https://docs.docker.com/get-docker/)
- **Git** → [Download](https://git-scm.com/)
 
---
 
## **Local Development Setup**
 
To run the project locally without Docker, follow these steps:
 
### **1️⃣ Clone the Repository**
 
```sh
git clone https://github.com/kraman82351/Task-management.git
cd Task-management
```
 
### **2️⃣ Install Dependencies**
 
#### **Frontend**
 
```sh
cd client
npm install
```
 
#### **Backend**
 
```sh
cd ../backend
npm install
```
 
### **3️⃣ Set Up Environment Variables**
 
Create a `.env` file in the **backend/** directory:
 
```sh
touch backend/.env
```
 
Add the following variables inside **backend/.env**:
 
```ini
MONGO_URI=your-mongodb-connection-string
PORT=5000
NODE_ENV=development
JWT_SECRET=your-jwt-secret
CLIENT_URL=http://localhost:3000 || your-project-frontend-base-url
```
 
### **4️⃣ Run the Application**
 
#### **Start the Backend**
 
```sh
cd backend
npm run start
```

#### **To access the Swagger API collection**

```sh
`http://localhost:5000/api-docs`
```

 
#### **Start the Frontend**
 
```sh
cd ../client
npm run dev
```
 
Your frontend will be available at `http://localhost:3000` and your backend at `http://localhost:5000` and Swagger API Docs available at: `http://localhost:5000/api-docs`.
 
---
 
## **Running with Docker**
 
You can containerize the entire application using Docker.
 
### **1️⃣ Build and Start Containers**
 
Run the following command from the project root:
 
```sh
docker compose up -d --build
```
 
This will:
 
- Build the **Next.js frontend** and **Express.js backend** containers.
- Expose ports **3000** (frontend) and **5000** (backend).
- Load environment variables from `backend/.env`.
 
### **2️⃣ Verify Running Containers**
 
Check if containers are running:
 
```sh
docker ps
```
 
### **3️⃣ Stop the Containers**
 
To stop the running containers:
 
```sh
docker compose down
```
 
---

## **API Endpoints**
 
### **Backend-Base URL:** `http://localhost:5000`

### **Frontend-Base URL:** `http://localhost:3000`

### **Swagger API collection URL:** `http://localhost:5000/api-docs`
 
## **Environment Variables**
 
The backend requires the following environment variables in `backend/.env`:
 
| Variable    | Description                          |
| ----------- | ------------------------------------ |
| `MONGO_URI` | MongoDB Atlas connection string      |
| `PORT`      | Port for the backend (default: 5000) |
| `NODE_ENV`  | Set to `production` in Docker        |
| `JWT_SECRET`| set any JWT secret of your choice    |
| `CLIENT_URL`| your frontend base url               |
 
---
 
1️⃣ **Port Already in Use Error**
 
- Run `lsof -i :3000` or `lsof -i :5000` and kill the process using `kill -9 <PID>`.
 
2️⃣ **Docker Not Running**
 
- Ensure Docker is installed and running with `docker info`.
 
3️⃣ **MongoDB Connection Fails**
 
- Ensure `MONGO_URI` in `backend/.env` is correctly set to your MongoDB Atlas URI.
 
---