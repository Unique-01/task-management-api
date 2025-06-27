# Task Management Backend API

A simple a Task Management backend built with **Express.js** and **MongoDB**, featuring user authentication, task operations, and automatic API documentation using Swagger.

---

## Features

-   User Registration & Login (JWT Auth)
-   Create and Read tasks
-   User-specific task filtering
-   Request body validation and error handling
-   Auto-generated Swagger API docs

---

## Setup & Run Locally

### Prerequisites

-   Node.js ≥ 14
-   MongoDB running locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### 🔧 Installation

1. Clone the repo:

```bash
git clone https://github.com/Unique-01/task-management-api.git
cd task-management-api
```

2. Install depedencies

```bash
npm install
```

3. Create a `.env` file in the root folder and add the following

```env
PORT=5000
MONGODB_SERVER=mongodb://localhost:27017
JWT_ACCESS_SECRET= your_secret_access_key
JWT_REFRESH_SECRET = your_secret_refresh_key
HOST=localhost:5000
```

4. Start the Server

```bash
npm run dev
```

---

## API Documentation

The Api documentation is available at `http://localhost:5000/api-docs/`, It includes all endpoints, schemas, and example inputs.

---

### Example API request

Replace `YOUR_ACCESS_TOKEN` with a valid access token from login.

**Register**

```bash
curl -X POST http://localhost:5000/api/user/register \
-H "Content-Type: application/json" \
-d '{"username": "John", "password": "123456"}'
```

**Login**

```bash
curl -X POST http://localhost:5000/api/user/login \
-H "Content-Type: application/json" \
-d '{"username": "John", "password": "123456"}'
```

**Get profile**

```bash
curl -X GET http://localhost:5000/api/user/profile \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Create Task**

```bash
curl -X POST http://localhost:5000/api/tasks \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "Buy milk", "description": "Get from the store"}'
```

**Get all Tasks**

```bash
curl http://localhost:5000/api/tasks
```

**Get logged in user tasks**

```bash
curl http://localhost:5000/api/tasks/user \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Get a task by id**

```bash
curl http://localhost:5000/api/tasks/60cabc1234567890abcd1234
```

**Get logged in user task by id**

```bash
curl http://localhost:5000/api/tasks/user/60cabc1234567890abcd1234 \
-H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Design Choices

### Route Design

-   `/tasks` returns all tasks.
-   `/tasks/user` shows only the logged-in user's tasks.
-   `/tasks/:taskId` gets any single task by ID.
-   `/tasks/user/:taskId` restricts task retrieval to tasks owned by the logged-in user.

This structure allows flexibility for role based access

### Error Handling

-   Errors were handled using try catch block, and appropriate error message was returned

### Validation

-   Manual validations were used inside controller funtions for required fields like `username` and `title`
-   Invalid IDs are validated using `mongoose.Types.ObjectId.isValid()`
