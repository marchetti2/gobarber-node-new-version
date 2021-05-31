<h2>About</h2>

This is the **new version** of **GoBarber**, from [RocketSeat](https://rocketseat.com.br/) course. 
In relation to the previous project, this new version has been totally refactored using important resources such as typescript typing, programming features with SOLID, TDD for tests, cache management, and other standards. 


> **GoBarber** is an application designed for service management between barbers and customers.

With Gobarber it is possible to register and make an appointment/service with your barber and/or become a provider of these services.

This repository is **only the backend** of the application, the web and mobile versions are part of the next modules.

To see the **old version** of GoBarber, [click here](https://github.com/marchetti2/gobarber-node).

<h2>Summary</h2>

- [Technologies](#technologies)
- [Getting started](#started)
  - [Download](#download)
  - [Environment](#environment)
    - [Databases](#databases)
    - [Environment variables](#variables)
  - [Running the API](#running)
    - [Tools](#tools)
  - [Routes](#routes)
- [License](#license)

<h2 id="technologies">Technologies</h2>

Some technologies used in this API:

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://hub.docker.com/_/postgres)
- [MongoDB](https://hub.docker.com/_/mongo)
- [Redis](https://hub.docker.com/_/redis)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [nodemailer](https://nodemailer.com/about/)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [handlebars](https://handlebarsjs.com)

<h6>Tools</h6>

- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

<h6>REST API Client</h6>

- [Insomnia](https://insomnia.rest/)
- [DBeaver](https://dbeaver.io/)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)


<h2 id="started">Getting started</h2>

Before downloading and running the project, you must have **[Node.js](https://nodejs.org/en/)** already installed and then install the following tools: 

- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/get-started)

<h4 id="download">Download</h4>

Open the terminal and execute the following commands: 

```bash
  # Clone the project
  $ git clone https://github.com/marchetti2/gobarber-node-new-version.git

  # Access the folder
  $ cd gobarber-node-new-version

  # Install the dependencies
  $ yarn
```
<h4 id="environment">Environment</h4>

<h6 id="databases">Databases</h6>

Using the **docker**, start an instance of the databases below.

```bash
  # PostgreSQL 
  $ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

  # MongoDB
  $ docker run --name mongodb -p 27017:27017 -d -t mongo

  # Redis
  $ docker run --name redis -p 6379:6379 -d -t redis:alpine
```
To find out if the databases are running, run the following command:
```bash
$ docker ps
```
If not, run:

```bash
$ docker start postgres mongodb redis
```
<h6 id="variables">Environment variables</h6>

From the `.env.example` file at the root of the project, create another file called` .env` using the same structure and set with **your** environment variables.

<h2 id="running">Running the API</h2>

First, verify that the databases are running. From the API directory, run the following commands:

```bash
  # Create tables in PostgreSQL
  $ yarn typeorm migration:run

  # Run the server
  $ yarn dev:server
```
<h6 id="tools">Tools</h6>

- To view the tables created in the postgres database, use [DBeaver](https://dbeaver.io/).
- To manage notifications, use [MongoDB Compass](https://www.mongodb.com/try/download/compass).
- To test the routes, you can use [Insomnia](https://insomnia.rest/). The workspace used in this API is available, just click the button below. 
<p align="center">
<a href="https://insomnia.rest/run/?label=goBarberNewJourney&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fmarchetti2%2F7a0296175321dc6ee72b3d4dd1c81f2c%2Fraw%2F648b3199ff9837b632d003f75f0145a18ea37352%2FgoBarberNewJourney-insomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<h2 id="routes">Routes</h2>

<h6>User</h6>

- `POST /users`: Register a new user.

- `GET /profile`: Show profile.

- `PATCH /users/avatar`: Update the user's avatar.

- `PUT /profile`: Update profile.

<h6>Sessions</h6>

- `POST /sessions`: User authentication.

<h6>Password</h6>

- `POST /password/forgot`: Password recovery.

- `POST /password/reset`: Change Password.

<h6>Appointments</h6>

- `POST /appointments`: register a new appointment.

- `GET /appointments/me`: show the provider's appointments.

<h6>Providers</h6>

- `GET /providers`: Show available providers.

- `POST /providers/:provider_id/month-availability`: Show the available month of the provider informed by the route params.

- `POST /providers/:provider_id/day-availability`: Show the available day of the provider informed by the route params.


<h2 id="license">License</h2>

This is a [RocketSeat](https://rocketseat.com.br) GoStack course project.
