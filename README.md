# RBAC Auth Logger

A Node.js REST API with Role-Based Access Control (RBAC) and comprehensive audit logging.

## Features

- **Authentication**: User registration and login with JWT tokens
- **Role-Based Access Control**: Admin, moderator, and user roles
- **Audit Logging**: Track all user actions and authentication events
- **User Management**: Admin can manage users and assign roles
- **Profile Management**: Users can view and update their profiles

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```
   DATABASE_URL=your_postgres_connection_string
   SECRET_KEY=your_jwt_secret
   PORT=3000
   ```

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/update-profile` - Update user profile

### Admin
- `GET /api/admin/all-users` - Get all users
- `PUT /api/admin/update-role` - Update user role
- `DELETE /api/admin/delete-user/:id` - Delete user

### Moderator
- `GET /api/moderator/reports` - Get reports

### Logs
- `GET /api/logs/get-logs` - Get all logs
- `GET /api/logs/filter-logs` - Get user's logs

## Database Schema

The API uses PostgreSQL with tables for:
- `users` - User account data
- `user_roles` - User role assignments
- `roles` - Role definitions
- `logs` - Audit logs
