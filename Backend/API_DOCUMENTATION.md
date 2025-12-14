# Sweet Shop Management System - API Documentation

## Base URL
```
http://localhost:3001
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Sweets Management (Protected Routes)

#### Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Belgian Dark Chocolate",
    "category": "CHOCOLATE",
    "price": 750,
    "quantity": 25,
    "description": "Rich and creamy dark chocolate",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Search Sweets
```http
GET /api/sweets/search?name=chocolate&category=CHOCOLATE&minPrice=400&maxPrice=800
Authorization: Bearer <token>
```

**Query Parameters:**
- `name` (optional): Search by sweet name (case-insensitive)
- `category` (optional): Filter by category (CHOCOLATE, CANDY, GUMMY, LOLLIPOP, COOKIE, CAKE, OTHER)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Sweet",
  "category": "CHOCOLATE",
  "price": 500,
  "quantity": 10,
  "description": "Optional description"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "New Sweet",
  "category": "CHOCOLATE",
  "price": 500,
  "quantity": 10,
  "description": "Optional description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Sweet Name",
  "price": 580,
  "quantity": 15
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "message": "Sweet deleted successfully"
}
```

### Inventory Management

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Sweet Name",
  "category": "CHOCOLATE",
  "price": 500,
  "quantity": 9,
  "description": "Description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 20
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Sweet Name",
  "category": "CHOCOLATE",
  "price": 500,
  "quantity": 30,
  "description": "Description",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "Access token required"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Sweet not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Default Users (After Seeding)

### Admin User
- **Email:** admin@sweetshop.com
- **Password:** admin123
- **Role:** ADMIN

### Regular User
- **Email:** user@sweetshop.com
- **Password:** user123
- **Role:** USER

## Sweet Categories
- CHOCOLATE
- CANDY
- GUMMY
- LOLLIPOP
- COOKIE
- CAKE
- OTHER