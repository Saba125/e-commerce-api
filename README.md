E-Commerce API

An E-Commerce API built with Node.js, Express, and Sequelize. This project provides endpoints for managing users, products, and carts, enabling core functionality for e-commerce applications.

Features

User authentication and authorization (JWT-based).

CRUD operations for products and users.

Cart management with product quantity and user association.

Secure file uploads for product images using multer.

Middleware for security, rate limiting, and input sanitization.

PostgreSQL database integration with Sequelize ORM.

Tech Stack

Backend: Node.js, Express

Database: PostgreSQL, Sequelize ORM

Security: Helmet, xss-clean, rate-limiter

File Uploads: Multer

Environment Management: dotenv

Prerequisites

Before running the project, ensure you have the following installed:

Node.js (v14 or higher)

PostgreSQL

Installation

Clone the repository:

git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api

Install dependencies:

npm install

Configure environment variables:
Create a .env file in the root directory and add the following:

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
COOKIE_SECRET=your_cookie_secret
JWT_SECRET=your_jwt_secret

Run database migrations (if any):

npx sequelize-cli db:migrate

Running the Application

Start the server:

npm start

The API will be available at http://localhost:3000.

API Endpoints

Authentication

POST /api/v1/auth/register: Register a new user.

POST /api/v1/auth/login: Login a user.

Users

GET /api/v1/auth/profile: Get the authenticated user's profile.

Products

GET /api/v1/products: Retrieve all products.

POST /api/v1/products: Add a new product (Admin only).

Cart

GET /api/v1/cart: Retrieve the user's cart.

POST /api/v1/cart: Add a product to the cart.

DELETE /api/v1/cart: Remove a product from the cart.

Folder Structure

├── src
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
├── public
│   ├── product-images
├── .env
├── package.json
└── README.md

Security Features

Helmet: Sets various HTTP headers for security.

xss-clean: Sanitizes user input to prevent XSS attacks.

Rate Limiting: Limits repeated requests to public APIs.

Environment Variables: Keeps sensitive configuration out of the codebase.

Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch:

git checkout -b feature-name

Commit your changes:

git commit -m 'Add feature-name'

Push to the branch:

git push origin feature-name

Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Inspired by modern e-commerce platforms.

Special thanks to the open-source community.
