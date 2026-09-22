# StyleHub E-commerce Platform

StyleHub is an academic full-stack e-commerce project built with the MERN stack. It demonstrates a responsive product catalogue, user authentication, shopping-cart state, product discovery, and multi-currency support.

## Features

- User registration, login, profile access, and persistent sessions
- Product catalogue with search, filtering, sorting, and pagination
- Product detail pages and shopping-cart management
- Currency selection and conversion through the Fixer API
- Responsive layouts for desktop and mobile devices
- REST API with input validation and MongoDB persistence
- Security middleware, password hashing, and JWT-based authorization

## Technology stack

**Frontend:** React, React Router, Context API, Axios, HTML, CSS

**Backend:** Node.js, Express, MongoDB, Mongoose, REST APIs

**Security and integrations:** JWT, bcrypt, Helmet, CORS, Express Session, Fixer API

## Project structure

```text
stylehub-ecommerce/
|-- client/   # React application
|-- server/   # Express API, routes, models, and controllers
`-- README.md
```

## Run locally

### Prerequisites

- Node.js and npm
- MongoDB locally or a MongoDB Atlas database
- A Fixer API key for live currency conversion

### Backend

```bash
cd server
npm install
copy .env.example .env
npm run dev
```

Update the newly created `.env` with your own database connection, API key, and strong random secrets. Never commit the `.env` file.

### Frontend

Open a second terminal:

```bash
cd client
npm install
copy .env.example .env
npm start
```

The client runs on `http://localhost:3000` and the API runs on `http://localhost:5000` by default.

## Testing

The project was manually tested across the main user flows, including registration, login, product browsing, filtering, cart operations, currency conversion, protected profile access, and responsive layouts. API requests were inspected with browser developer tools and backend console output.

## Academic context

Created by Leons Gaiduks as a 2025 course project for the User Experience / UX Design course at the Transport and Telecommunication Institute (TSI).

