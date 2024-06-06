# Todo App API

This is a simple Todo App API built with Express.js that supports user registration, login via magic link (passwordless authentication), and CRUD operations for todos. The project uses PostgreSQL as the database and includes Swagger documentation for the API.

## Features

- Passwordless user registration and login using magic links
- CRUD operations for todos
- JWT authentication for protected routes
- Swagger documentation for the API
- Bearer token authentication for protected API endpoints
- Database initialization with migration scripts

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- Swagger for API documentation

## Prerequisites

- Node.js (v12.x or later)
- PostgreSQL

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Dinesh3098/todo-antwalk.git
cd todo-antwalk
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the config folder of the project and add the following environment variables:

```env
PORT=3000
JWT_SECRET='your_jwt_secret'
EMAIL_USER="dummy@email.com"
EMAIL_PASS="dummy_password"
BASE_URL=http://localhost:3000
DB_USER='your_db_username'
DB_NAME='your_db_name'
DB_HOST='your_db_host'
DB_PASSWORD='your_db_password'
ENDPOINT_ID='your_endpoint_id'
DB_PORT=5432
```

Replace the values with your own configuration. The `JWT_SECRET` is used to sign the JWT tokens, and the `EMAIL_USER` and `EMAIL_PASS` are used for sending magic links for user login. The `BASE_URL` is the URL where the API is hosted. The `DB_USER`, `DB_NAME`, `DB_HOST`, `DB_PASSWORD`, `DB_PORT` and `ENDPOINT_ID` are the database connection details.

### Start the Application

```bash
npm run dev
```

The server should now be running on `http://localhost:3000`.

## API Documentation

The API documentation is available via Swagger. Once the server is running, you can access the documentation at:

```
http://localhost:3000/api-docs
```

### Bearer Token Authentication

For endpoints that require authentication, you need to obtain a JWT token. Use the `/user/login` endpoint to get the token, and then use the "Authorize" button in the Swagger UI to add the token.

### Example Endpoints

#### Get All Todos

```http
GET /todos&limit=10&page=1&sort=title&order=asc&search=keyword
```

#### Create a Todo

```http
POST /todos
```

#### Update a Todo

```http
PUT /todos/:id
```

#### Delete a Todo

```http
DELETE /todos/:id
```

## Project Structure

```
app/
├── db/
│   ├── config.db.js
│   └── query.db.js
├── handlers/
│   ├── ping.handler.js
│   ├── todo.handler.js
│   └── user.handler.js
├── middleware/
│   └── auth.middleware.js
├── migrations/
│   └── init.migration.js
├── routes/
│   ├── index.route.js
│   ├── todos/
│   │   └── todo.route.js
│   └── users/  
│       └── user.route.js
└── services/
    └── auth.svc.js

config/
└── .env

index.js
```
