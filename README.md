# Portfolio Backend API

A full-featured backend for a personal portfolio website built with **Node.js**, **Express**, **Prisma**, and **PostgreSQL**.  
Supports authentication, blogs, projects, and a detailed about section (with skills, experience, and education).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Multer & Cloudinary](#multer--cloudinary)
- [Postman Collection](#postman--collection)
- [License](#license)

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
- **Cloudinary** (for image uploads)
- **JWT Authentication**
- **Bcrypt** (for password hashing)
- **Multer** (for file uploads)
- **TypeScript**

---

## Features

- **User Authentication**
  - Login, logout, refresh token
  - Role-based access control (`owner`)
- **About Section**
  - Create/Update personal info
  - Upload profile photo
  - Manage skills, experience, and education separately
- **Blog Management**
  - CRUD operations for blogs
- **Project Management**
  - CRUD operations for projects
- **File Uploads**
  - Multer + Cloudinary for images

---

## Project Structure

```pgsql

project-root/
│
├── src/
│   └── app/
│       ├── config/
│       │   ├── cloudinary.config.ts
│       │   ├── db.ts
│       │   └── multer.config.ts
│       │
│       ├── errorHelpers/
│       │   └── AppError.ts
│       │
│       ├── interfaces/
│       │   └── index.d.ts
│       │
│       ├── middlewares/
│       │   ├── checkAuth.ts
│       │   ├── globalErrorHandler.ts
│       │   └── notFound.ts
│       │
│       ├── modules/
│       │   ├── about/
│       │   ├── auth/
│       │   ├── blog/
│       │   ├── dashboard/
│       │   └── project/
│       │
│       ├── routes/
│       │   └── index.ts
│       │
│       ├── utils/
│       │   ├── catchAsync.ts
│       │   ├── jwt.ts
│       │   ├── seedOwner.ts
│       │   ├── sendResponse.ts
│       │   ├── setCookie.ts
│       │   └── userToken.ts
│       │
│       ├── app.ts
│       └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

```

## Getting Started

1. Clone the repository:

```bash

git clone https://github.com/mshipan/portfolio-next-server.git
cd portfolio-next-server
```

2. Install dependencies:

```bash

npm install
```

3. Set up your PostgreSQL database and create a .env file:

```env

DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"

## Follow .env.example file
```

4. Run Prisma migrations:

```bash

npx prisma migrate dev
```

5. Start the server:

```bash

npm run dev
```

Server will run on http://localhost:5000 by default

## API Endpoints

### Auth

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| POST   | /auth/login         | User login           |
| POST   | /auth/refresh-token | Refresh access token |
| POST   | /auth/logout        | Logout               |

### About

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | /about                | Get about section           |
| POST   | /about                | Create/Update about section |
| POST   | /about/skill          | Create a skill              |
| GET    | /about/skill          | Get all skills              |
| DELETE | /about/skill/:id      | Delete a skill              |
| POST   | /about/experience     | Create experience           |
| GET    | /about/experience     | Get all experience          |
| DELETE | /about/experience/:id | Delete experience           |
| POST   | /about/education      | Create education            |
| GET    | /about/education      | Get all education           |
| DELETE | /about/education/:id  | Delete education            |

### Blog

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| GET    | /blog       | Get all blogs |
| GET    | /blog/:slug | Get a blog    |
| POST   | /blog       | Create blog   |
| PATCH  | /blog/:slug | Update blog   |
| DELETE | /blog/:slug | Delete blog   |

### Project

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /project       | Get all projects |
| GET    | /project/:slug | Get a project    |
| POST   | /project       | Create project   |
| PATCH  | /project/:slug | Update project   |
| DELETE | /project/:slug | Delete project   |

## Database

- PostgreSQL with Prisma ORM
- Models include: `User`, `Blog`, `Project`, `About`, `Skill`, `Experience`, `Education`
- `About` has one-to-many relationships with `Skill`, `Experience`, and `Education`.

## Multer & Cloudinary

- Multer is used for handling `multipart/form-data` file uploads.
- Cloudinary stores images remotely and returns a URL.
- Profile photo and skill images are uploaded to Cloudinary.

Example usage in form-data:

```bash

POST /about
data: { "name": "Shipan Mallik", "title": "Full Stack Developer", ... }
file: profile.jpg
```

## Notes

- Ensure `.env` variables are set correctly for Cloudinary and JWT tokens.
- The project uses role-based access; `owner` role can modify about, skills, experiences, and educations.
- Skills, experiences, and educations can be created/deleted individually without touching the about section.

## Postman Collection

A ready-to-use Postman collection is provided for testing all API endpoints.

- **Download Postman Collection:** [portfolio-next.postman_collection.json](./portfolio-next.postman_collection.json)

Import it into Postman to quickly test the endpoints with proper request bodies and headers pre-configured.

## License

This project is open source and licensed under the MIT License:

### MIT License

Copyright (c) 2025 Shipan Mallik

It's free and anyone can use.
