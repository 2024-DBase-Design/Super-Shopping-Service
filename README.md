# SillyStuffs API

This project is an API for an application that manages art, clothing, toys, and other items. It is built using TypeScript leveraging Express.js for REST API calls and PostgreSQL for database storage. The application is containerized using Docker and Docker Compose.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Postman Collection](#postman-collection)
- [Development](#development)
- [Scripts](#scripts)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker**: Install Docker from [Docker's official website](https://www.docker.com/get-started).
- **Docker Compose**: Docker Compose is included in Docker Desktop for Windows and Mac. For Linux, follow the instructions [here](https://docs.docker.com/compose/install/).
- **NodeJS**: Install NodeJS using [Node Version Manager](https://github.com/coreybutler/nvm-windows) or from [NodeJS's official website](https://nodejs.org/dist/v22.2.0/node-v22.2.0-x64.msi).

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/2024-DBase-Design/Super-Shopping-Service.git
   cd Super-Shopping-Service
   ```

2. **Set up environment variables**:
   - Create a .env file in the root of the project and add the following environment variables:
     ```dotenv
     DB_HOST=db
     DB_USER=sssadmin
     DB_PASSWORD=ssspassword
     DB_NAME=supershoppingservice
     ```
   - Install Node Packages:
     ```bash
     npm install
     ```

## Running the Application

1. **Build and start the application**:

   ```bash
   docker-compose up --build
   ```

2. **The application should now be running at http://localhost:3000.**

3. **Start the electron app**:
   ```bash
   npm run electron
   ```

## Postman Collection

For easy testing and integration, we have created a Postman collection that includes all the API endpoints available in this service. You can access the collection using the following public link:

[View the SuperShoppingService Postman Collection](https://www.postman.com/lunar-module-pilot-51980864/workspace/super-shopping-service)

## Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the application locally**:

   ```bash
   npm run start
   ```

3. **Build the application**:
   ```bash
   npm run build
   ```

## Scripts

The following scripts are available in the package.json:

- start - Starts the compiled JavaScript application.
- build - Compiles the TypeScript source code into JavaScript.
- dev - Starts the application in development mode with ts-node-dev.
