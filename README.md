# SillyStuffs API

This project is an API for an application that manages art, clothing, toys, and other items. It is built using TypeScript and Node.js, and is containerized using Docker.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. **Build and start the containers**

    ```sh
    docker-compose up --build
    ```

3. **Access the application**

- The application will be running at http://localhost:3000.

## Running the Application

    ```sh
    docker-compose up --build
    ```

## Scripts

The following scripts are available in the package.json:

- start - Starts the compiled JavaScript application.
- build - Compiles the TypeScript source code into JavaScript.
- dev - Starts the application in development mode with ts-node-dev.