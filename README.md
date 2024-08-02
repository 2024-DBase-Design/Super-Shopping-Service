# Database Project Submission: Super Shopping Service

This is the github repository for our database project. In the root of Super Shopping Service, you will find our deliverables. The ER-Model, Database-Design/Relational Schema, and Demonstration Video are contained in their own sub-folders, while our web application (original application/implementation) is in the root of the repository to ensure everything builds properly.

The web implementation of Super Shopping Service is incomplete, but does have several features implemented. We elected to create a second implementation (a python CLI application) to demonstrate the functionality of our project, as the we application proved a bit too ambitious to finish given the timeline. Build instructions are included below so that you can see the work we put in on the frontend, even though it is unfinished.

The database and backend implementation of Super Shopping Service is fully functional, and can be demonstrated in several different ways. You may make calls to our API using the public Postman collection linked below, or use our CLI (see instructions below). We recognize that our various implementations are not 100% complete or polished, but we shifted our focus to the underlying theory and database operations as instructed in the near-end-semester announcement, which is sound and working.

The instructions for building the application below are required whether viewing the web application or the CLI, as both use the API/Postgres server created during the setup

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building/Viewing the Web Application](#building-and-viewing-the-web-application)
- [Running the CLI](#running-the-cli)
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

   - Create a .env file in the root of the project and add the following:
     ```dotenv
     # Environment variables declared in this file are automatically made available to Prisma.
     # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

     # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
     # See the documentation for all the connection string options: https://pris.ly/d/connection-strings
     DATABASE_URL="postgresql://sssadmin:ssspassword@postgres:5432/supershoppingservice?schema=public"

     # DATABASE_URL="postgresql://sssadmin:ssspassword@localhost:5432/supershoppingservice?schema=public" # DATABASE_URL_DEV

     ACCESS_TOKEN_SECRET="supersecret"
     ```

   - Install Node Packages:
     ```bash
     npm install
     ```

3. **Setup Prisma Migration**:

   - Change the prisma schema database url from the line commented DATABASE_URL to the one commented as DATABASE_URL_DEV in the .env file.
   - Build the application by running docker-compose up --build
   - After the above command completes, open a new terminal, and run the following command to create a new migration named init

     ```bash
     npx prisma migrate dev --name init
     ```
     
   - Bring down the application using Ctrl + C on the first terminal
   - Change the prisma schema database url back to the line commented DATABASE_URL in the .env file

4. **Build the Application**

   - Now, simply run `docker-compose up --build` to build and run the application!

At this point, the backend of Super Shopping Service is correctly configured, and you may select the implementation you wish to use to view the functionality of the project.

## Building and Viewing the Web Application

1. **Build and start the application**:

   ```bash
   docker-compose up --build
   ```

   - To develop NEXT.js, only run the following command:

     ```bash
     npm run dev
     ```

2. **The application should now be running at http://localhost:3000.**

   - To access the API, use the following URL: http://localhost:3000/api/:path.

## Running the CLI

1. To use the CLI, ensure the application is running (see steps above), and simply open a terminal (in the root project directory) to run the following command:
   - `python Deliverable-Implementation-CLI/sss_python.py`
   - `python3 Deliverable-Implementation-CLI/sss_python.py` may be necessary depending on your terminal

## Postman Collection

For easy testing and integration, we have created a Postman collection that includes all the API endpoints available in this service. You can access the collection using the following public link:

[View the SuperShoppingService Postman Collection](https://www.postman.com/database-project-team/workspace/super-shopping-service)

This is another way that you can test the functionality of Super Shopping Service. In order for the postman to work, the application must be built and running, and the prisma migration must have been set up correctly (see instructions above)

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

4. **Pushing Prisma Migrations**:

   - Change the prisma schema db url from DATABASE_URL to DATABASE_URL_DEV.
   - Run the following command to create a new migration:

     ```bash
     npx prisma migrate dev --name <migration-name>
     ```
     
   - Change the prisma schema db url back from DATABASE_URL_DEV to DATABASE_URL.

## Scripts

The following scripts are available in the package.json:

- start - Starts the compiled JavaScript application.
- build - Compiles the TypeScript source code into JavaScript.
- dev - Starts the application in development mode with ts-node-dev.
