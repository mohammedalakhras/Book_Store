
# Book Store API

## Overview
The Book Store API is a RESTful API developed using Express.js and Node.js. It allows users to perform CRUD (Create, Read, Update, Delete) operations on a collection of books. This API can be used as the backend for a book store application or integrated into other projects.

## Features
- Create new book entries
- Retrieve details of existing books
- Update book information
- Delete books from the collection
- Simple and intuitive RESTful endpoints
- User accounts with login/register
- JWT authentication for secure access

## Technologies Used
- [Node.js](https://nodejs.org/) - JavaScript runtime for building server-side applications.
- [Express.js](https://expressjs.com/) - Web framework for Node.js to build APIs.
- [MongoDB](https://www.mongodb.com/) - NoSQL database for storing book data (if used).
- [Mongoose](https://mongoosejs.com/)  - ODM library for MongoDB and Node.js (if used).
- [express-async-handler](https://github.com/Abazhenov/express-async-handler) - Simplifies error handling for async routes in Express.
- [Joi](https://joi.dev/) - Powerful schema description language and data validator for JavaScript.
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) - Library to sign and verify JSON Web Tokens (JWT).

## Getting Started

### Prerequisites
- Node.js (version 12 or later)
- npm or yarn

### Installation
1. Clone the repository:
```
git clone https://github.com/mohammedalakhras/Book_Store
```

2. Navigate to the project directory:
```
cd Book_Store
```
3. Install the dependencies:
```
npm install

or

yarn install
```


### Running the Application
To start the server, run:


```

npm start

or

yarn start
```

The API will be available at [http://localhost:3000](http://localhost:3000) (or your specified port).

### API Endpoints

| Method | Endpoint             | Description                                   |
|--------|----------------------|-----------------------------------------------|
| GET    | `/api/books`         | Retrieve all books                            |
| GET    | `/api/books/:id`     | Retrieve a specific book by ID                |
| POST   | `/api/books`         | Create a new book                             |
| PUT    | `/api/books/:id`     | Update a specific book by ID                  |
| DELETE | `/api/books/:id`     | Delete a specific book by ID                  |


| Method | Endpoint               | Description                                 |
|--------|------------------------|---------------------------------------------|
| GET    | `/api/authors`         | Retrieve all authors                        |
| GET    | `/api/authors/:id`     | Retrieve a specific author by ID            |
| POST   | `/api/authors`         | Create a new author  (Admin Only)           |
| PUT    | `/api/authors/:id`     | Update a specific author by ID (Admin Only) |
| DELETE | `/api/authors/:id`     | Delete a specific author by ID (Admin Only) |


| Method | Endpoint             | Description                                   |
|--------|----------------------|-----------------------------------------------|
| PUT    | /api/users/:id       | Update a specific user by ID (Requires Token) |
| GET    | /api/users           | Retrieve all user accounts (Admin only)       |
| POST   | /api/auth/register   | Register a new account                        |
| POST   | /api/auth/login      | Log in to an account                          |


### Usage Example
- To create a new book entry, send a POST request to `/api/books` with the following JSON body:
```
{
      "title": "Java 4 Every Body",
      "author": "677d8d13c8ac26554870da06",
      "description":"Java Tutorial",
      "price": 10,
      "cover": "Hard Cover"
}
```

- To register a new account `/api/auth/register`
```json
{
  "email": "Mohammed@gmail.com",
  "username": "mohammed",
  "password": "Abc@012345"
}
```
- To log in to an account `/api/auth/login`

```json
{
  "email": "mohammed@gmail.com",
  "password": "Abc@012345"
}
```

## Documentation

For complete API documentation, please refer to the following Postman collection:

[API Documentation](https://documenter.getpostman.com/view/22540031/2sAYQiB7xe#c5d035ae-81e1-4486-bc43-f7f5836e8578)

This documentation provides detailed information on all available endpoints, request/response formats, and example use cases.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for enhancements, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
