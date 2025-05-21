# 🛒 WooCommerce Backend Integration with Node.js & Express.js

This project is a backend system built using **Node.js**, **Express.js**, **MongoDB**, and the **WooCommerce REST API**. It includes secure user authentication and enables the creation, retrieval, and deletion of WooCommerce products using a custom Express-based API.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Routes](#available-routes)
- [How It Works](#how-it-works)
- [License](#license)

---

## ✅ Features

- 🔐 JWT-based User Authentication
- 🔄 Secure Login and Signup functionality
- 🛍️ Create WooCommerce Products using REST API
- 🧾 Retrieve, Delete WooCommerce Products
- 🔐 Protected routes with token validation middleware
- 📦 MongoDB integration for local user management
- 🧠 Password hashing using Bcrypt

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, Bcrypt
- **API Integration**: WooCommerce REST API
- **Others**: dotenv, axios, cors, morgan

---

2. Install Dependencies
bash
Copy
Edit
npm install
3. Start MongoDB Locally
Ensure MongoDB is running locally on your machine. You can use:

bash
Copy
Edit
mongod
4. Create .env File
Create a .env file in the root directory and configure it as below:

env
Copy
Edit
PORT=5513
MONGODB_URI=mongodb://localhost:27017/woocommerce-backend
JWT_SECRET=your_jwt_secret
WOOCOMMERCE_SITE_URL=https://your-woocommerce-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
📡 Available Routes
Method	Endpoint	Description
POST	/api/register	Create a new user
POST	/api/login	User login
POST	/api/createproduct	Create a product (protected)
DELETE	/api/deleteproduct/:id	Delete a product (protected)

Note: Protected routes require a Bearer Token in the Authorization header.

🔐 Authentication Flow
User signs up or logs in and receives a JWT token.

Token is stored in localStorage or headers.

Protected routes use middleware to verify token and decode userId.

🛒 WooCommerce Integration
This project uses WooCommerce REST API v3 to interact with your WooCommerce store.

Product creation:

name, description, regular_price, images

WooCommerce API is accessed using axios with basic authentication using Consumer Key and Secret.

📦 Example WooCommerce Payload
json
Copy
Edit
{
  "name": "Premium Gray T-Shirt by sarvesh",
  "description": "High quality cotton t-shirt",
  "regular_price": "19.99",
  "images": [
    {
      "src": "https://image-url.jpg",
      "name": "gry T-Shirt",
      "alt": "gry Cotton T-Shirt Front View"
    }
  ]
}
🧪 Testing API with Postman
Login to get token

Use token in Authorization: Bearer <token>

Use endpoints like /createproduct or /deleteproduct/:id for CRUD operations

📝 License
This project is open-source and available under the MIT License.

🙋‍♂️ Author
Sarvesh Sharma
🔗 LinkedIn
📧 Email: sarveshsharmanci@gmail.com
🌐 GitHub: @242zayn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
