# Recipe Management Site

A full-stack recipe management application built with:
- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite
- JWT authentication
- Recipe browsing + search + details
- Reviews and user interaction

## Table of Contents
1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Development](#development)
9. [Deployment](#deployment)
10. [License](#license)

## Project Structure

```
Backend/
  package.json
  src/
    index.js
    config/ (db.js, index.js, server-config.js)
    controllers/ (authController.js, recipeController.js, reviewController.js)
    middlewares/ (authMiddleware.js)
    models/ (User.js, Review.js)
    routes/ (v1/authRoutes.js, v1/recepieRoutes.js, v1/reviewRoutes.js)
    utils/ (cache.js, spoonacular.js)

Frontend/
  package.json
  vite.config.js
  index.html
  src/
    App.jsx
    main.jsx
    components/ (Header, Footer, RecipeCard, etc.)
    pages/ (Home, Login, Register, Recipes, RecipeDetails, About, Contact)
    utils/ (api.js, auth.js)
    css/

README.md
```

## Features
- User registration and login
- Protected resources via JWT
- Recipe listing, filtering, and details
- Add ratings/reviews to recipes
- Fetch external recipe info (Spoonacular helper available)
- Session token storage and API auth wrapper

## Backend Setup

1. `cd Backend`
2. `npm install`
3. Create `.env` with required values (see below)
4. `npm run dev` (or `npm start`)

## Frontend Setup

1. `cd Frontend`
2. `npm install`
3. Add environment variable for API base URL
   - `.env` (or `VITE_` variables): `VITE_API_BASE_URL=http://localhost:5000/api/v1`
4. `npm run dev`

## Environment Variables

### Backend (`Backend/.env`)
- `PORT=5000`
- `MONGODB_URI=<your_mongodb_connection_string>`
- `JWT_SECRET=<your_jwt_secret>`
- `SPOONACULAR_API_KEY=<optional_if_used>`

### Frontend (`Frontend/.env`)
- `VITE_API_BASE_URL=http://localhost:5000/api/v1`

## API Endpoints (likely)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Recipes
- `GET /api/v1/recipes`
- `GET /api/v1/recipes/:id`
- `POST /api/v1/recipes` (auth)
- `PUT /api/v1/recipes/:id` (auth)
- `DELETE /api/v1/recipes/:id` (auth)

### Reviews
- `GET /api/v1/reviews/:recipeId`
- `POST /api/v1/reviews` (auth)

## Authentication
- Login returns JWT token
- Stored in `localStorage` via `src/utils/auth.js`
- Protected routes implemented in `src/components/ProtectedRoute.jsx`
- Backend guard: `src/middlewares/authMiddleware.js`

## Development Tips
- Enable CORS on backend for local frontend.
- Use Postman or Insomnia for API tests.
- Implement tests with Jest/Supertest (backend) and React Testing Library (frontend).

## Deployment

### Backend
- Host on Heroku/Railway/AWS with env vars.
- Run `node src/index.js` / `npm start`.

### Frontend
- Build with `npm run build`.
- Deploy to Vercel/Netlify.
- Set `VITE_API_BASE_URL` to deployed backend URL.

## License
MIT
