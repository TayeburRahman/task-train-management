# Train Management System

#### Description

This project is a Train Management System that allows for managing stations, trains, ticketing, and user wallets. It provides APIs for creating and managing trains and stations, purchasing tickets, and handling user wallet transactions.

#### 1. Clone the Repository

git clone https://github.com/TayeburRahman/task-train-management
cd task-train-management

#### 3. Setup Environment Variables

Create a .env file in the root of the project directory and add the following environment variables:
PORT=6060
DATABASE_URL=
JSON_TOKEN=
(all credential have on '.env.example')

#### 4. Install and Start the Application

Run the following command to start the application:
'npm install', and 'npm start'
The server will be running on http://localhost:6060.

#### 5. API Documentation

###### API endpoints Postman documentation: https://documenter.getpostman.com/view/18806658/2sA3rwNZo3

Here’s a brief overview of some key endpoints available in the system:
User Endpoints
Create User: POST /users/create
Login User: POST /users/login
Get All Users: GET /users/find
Get User by Email: GET /users/find/:email
Train Endpoints
Create Train: POST /trains/add
Get Train by ID: GET /trains/find/:id
Get All Trains: GET /trains/find
Update Train: PUT /trains/update/:trainId
Add Stop: PUT /trains/update/stops/:trainId
Update Stop: PUT /trains/update/:trainId/stops/:stopId
Delete Stop: DELETE /trains/delete/:trainId/stops/:stopId
Station Endpoints
Create Station: POST /stations/create
Get All Stations: GET /stations/find
Update Station: PUT /stations/update/:id
Delete Station: DELETE /stations/delete/:id
Ticketing Endpoints
Create Ticket: POST /tickets/create
Get User Tickets: GET /tickets/find/:userId
Wallet Endpoints
Add to Wallet: POST /wallet/add
Get User Wallet: /wallet/get/:userId
# task-train-management
