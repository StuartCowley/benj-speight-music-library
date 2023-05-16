# Music Library

This project is an application for managing a music library built using express.js and SQL. The main objective of this project is to learn how to design and implement an API that can perform CRUD operations on a database.

## Learning Objectives

Design and implement an API that performs CRUD operations on a database
Understand database design concepts
Gain familiarity with SQL and Postgres
Concepts
Database Design
Database design is the process of designing the structure of a database to meet the needs of the application. It involves defining the tables, fields, and relationships between them.

### SQL

Structured Query Language (SQL) is a standard language used to manage relational databases. SQL allows you to create, read, update, and delete data in a database.

### Postgres

Postgres is an open-source relational database management system that uses and extends the SQL language. It is known for its reliability, scalability, and security.

### CRUD Operations

CRUD stands for Create, Read, Update, and Delete. These are the basic operations that can be performed on data in a database. CRUD operations are used to manage data in an application.

## Installation

Clone the repository
Install the dependencies: `npm install`
Set up the database: create a Postgres database and update the config.js file with your database credentials.
Run the application: `npm start`
Usage
Once the application is running, you can perform CRUD operations on the music library by sending requests to the API. The API endpoints are defined in the routes folder.

## Usage

To make CRUD requests, navigate to the root directory in your terminal and run:

`npm start`
This will start the application on http://localhost:3000.

To update the locally-hosted Artists and Albums tables, you can make requests to the API routes specified in the routes files for artists and albums. For example, to create a new artist, you can make a POST request to http://localhost:3000/artists/ with the following JSON data in the request body:

json

{
"name": "Metallica",
"genre": "Metal"
}

POST, GET, PUT, PATCH, and DELETE requests to routes /artists, /artists/id/albums, and /albums.

Once the application is running, you can perform CRUD operations on the music library by sending requests to the API. The API endpoints are defined in the routes folder. You can use tools like Postman to test the API.

Contribution
If you find any issues or have suggestions for improvements, feel free to create a pull request or open an issue.

License
This project is licensed under the MIT License. See the LICENSE file for details.
