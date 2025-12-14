# Sweet Shop Management System

## Screenshots
<img width="1920" height="880" alt="1" src="https://github.com/user-attachments/assets/cc7a4319-959a-4d8a-af4c-09151c2c48a4" />
<img width="1920" height="930" alt="2" src="https://github.com/user-attachments/assets/6296e09d-791c-4bad-a293-94ed34bee9a0" />
<img width="1920" height="926" alt="3" src="https://github.com/user-attachments/assets/84787e7d-33d0-4d66-bcdf-198f77f199b9" />

## Project Overview
This is a full-stack Sweet Shop Management System built using
Node.js, TypeScript, Express, Prisma, and React.
The application allows users to register, login, view sweets,
purchase sweets, and for admin users to manage inventory.

## Tech Stack
- Backend: Node.js, TypeScript, Express
- Database: Prisma ORM with SQLite
- Frontend: React + Vite
- Testing: Jest + Supertest

## Setup Instructions

### Backend
```bash
cd Backend
npm install
npx prisma migrate dev
npm run test
npm run dev
