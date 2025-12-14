# SQLite Database Schema - Sweet Shop Management System

## Database Configuration

### Prisma Schema (schema.prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

model Sweet {
  id          String   @id @default(cuid())
  name        String
  category    String
  price       Float
  quantity    Int
  description String?
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("sweets")
}
```

### Environment Configuration (.env)
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
PORT=3001
NODE_ENV=development
```

## Database Tables

### Users Table
```sql
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
```

**Fields:**
- `id`: Primary key (CUID)
- `email`: Unique user email
- `password`: Bcrypt hashed password
- `name`: Optional user name
- `role`: User role ("USER" or "ADMIN")
- `createdAt`: Record creation timestamp
- `updatedAt`: Record update timestamp

### Sweets Table
```sql
CREATE TABLE "sweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
```

**Fields:**
- `id`: Primary key (CUID)
- `name`: Sweet name
- `category`: Sweet category (CHOCOLATE, CANDY, GUMMY, LOLLIPOP, COOKIE, CAKE, OTHER)
- `price`: Sweet price (decimal)
- `quantity`: Available quantity (integer)
- `description`: Optional description
- `image`: Optional image URL
- `createdAt`: Record creation timestamp
- `updatedAt`: Record update timestamp

## Sample Data

### Default Users
```sql
-- Admin User
INSERT INTO users (id, email, password, name, role) VALUES 
('admin_id', 'admin@sweetshop.com', '$2a$10$hashedpassword', 'Sweet Shop Admin', 'ADMIN');

-- Regular User
INSERT INTO users (id, email, password, name, role) VALUES 
('user_id', 'user@sweetshop.com', '$2a$10$hashedpassword', 'Sweet Shop User', 'USER');
```

### Sample Sweets
```sql
INSERT INTO sweets (id, name, category, price, quantity, description) VALUES 
('sweet1', 'Belgian Dark Chocolate', 'CHOCOLATE', 8.99, 25, 'Rich and creamy dark chocolate imported from Belgium'),
('sweet2', 'Rainbow Gummy Bears', 'GUMMY', 4.99, 50, 'Colorful assorted gummy bears in six fruity flavors'),
('sweet3', 'Strawberry Swirl Lollipop', 'LOLLIPOP', 2.49, 100, 'Classic strawberry flavored swirl lollipop'),
('sweet4', 'Vanilla Dream Cookie', 'COOKIE', 3.99, 0, 'Soft-baked vanilla cookies with white chocolate chips');
```

## Database Operations

### Setup Commands
```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push

# Seed database with sample data
npm run db:seed
```

### Database File Location
- **Development**: `./dev.db`
- **Test**: `./test.db`

## Key Changes from PostgreSQL

1. **Provider**: Changed from `postgresql` to `sqlite`
2. **URL**: Changed from PostgreSQL connection string to file path
3. **ID Generation**: Changed from `uuid()` to `cuid()` (SQLite compatible)
4. **Enums**: Converted to String fields (SQLite doesn't support enums)
5. **Data Types**: 
   - `Float` for prices (SQLite REAL)
   - `Int` for quantities (SQLite INTEGER)
   - `String` for text fields (SQLite TEXT)
   - `DateTime` for timestamps (SQLite DATETIME)

## Validation

Role validation is handled in application code:
```typescript
// Valid roles
const VALID_ROLES = ['USER', 'ADMIN'];

// Valid categories
const VALID_CATEGORIES = [
  'CHOCOLATE', 'CANDY', 'GUMMY', 
  'LOLLIPOP', 'COOKIE', 'CAKE', 'OTHER'
];
```

This SQLite schema maintains full compatibility with the existing API while providing a simpler, file-based database solution.