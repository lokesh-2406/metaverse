# Metaverse Project(In progress)

This repository contains the full-stack codebase for the Metaverse application. It is structured as a high-performance monorepo using **pnpm workspaces** and is managed by **Turborepo** to optimize build and development workflows.[1, 2]

The backend is a Node.js server built with Express, using Prisma as the ORM to interact with a PostgreSQL database.[3, 4] The project also includes shared packages for UI components and configurations, along with a dedicated test suite for the API.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

  * **Node.js**: Version 18.x or higher.
  * **pnpm**: This project uses pnpm for package management and workspaces.[5, 6] If you don't have it, install it globally: `npm install -g pnpm`.
  * **Docker**: The PostgreSQL database is run inside a Docker container for consistent and isolated development environments.

## Getting Started

Follow these steps to get the project set up and running on your local machine.

### 1\. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lokesh-2406/metaverse.git
cd metaverse/
```

### 2\. Install Dependencies

Install all project dependencies using pnpm. Running this command from the root of the `metaverse` directory will install dependencies for all workspaces (`apps` and `packages`) and link them together.[7, 8]

```bash
pnpm install
```

### 3\. Set Up the PostgreSQL Database

This project requires a running PostgreSQL instance. The recommended method is to use Docker.

Run the following command in your terminal to start a PostgreSQL container. This command will download the official Postgres image, start a container named `metaverse-db`, set a password, and create a persistent volume to store your data.

```bash
docker run --name metaverse-db \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=metaverse_db \
  -p 5432:5432 \
  -v metaverse-pgdata:/var/lib/postgresql/data \
  -d postgres
```

  * `--name metaverse-db`: Gives the container a memorable name.
  * `-e POSTGRES_PASSWORD=...`: Sets the password for the default `postgres` user. **Required**.
  * `-e POSTGRES_DB=...`: Creates an initial database named `metaverse_db`.
  * `-p 5432:5432`: Maps port 5432 on your local machine to port 5432 in the container.
  * `-v metaverse-pgdata:/var/lib/postgresql/data`: Creates a Docker volume to ensure your data persists even if the container is removed or restarted.
  * `-d postgres`: Runs the container in detached mode using the latest `postgres` image.

You can verify that the container is running with `docker ps`.

### 4\. Configure Environment Variables

The application connects to the database using a connection string defined in an environment variable.

Create a `.env` file in the root of the `metaverse` directory:

```bash
touch.env
```

Open the `.env` file and add the following line. This URL must match the database configuration from the previous step.

```env
#.env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/metaverse_db?schema=public"
```

### 5\. Run Database Migrations

With the database running and the environment variables set, you can now create the necessary tables using Prisma Migrate. Run the following command from the root of the `metaverse` directory [3, 9]:

```bash
pnpm exec prisma migrate dev
```

This command will:

1.  Connect to your PostgreSQL database.
2.  Read the schema from `packages/db/prisma/schema.prisma`.
3.  Generate and apply the SQL migrations to create all required tables (e.g., `User`, `Space`, etc.).

## Running the Application

### Development Server

To start the API server in development mode, run the following command from the root of the `metaverse` directory. Turborepo will automatically build the necessary packages and start the `http` application.[10, 2]

```bash
pnpm run dev
```

The API server will be running at `http://localhost:3000`.

### Production Build

To create an optimized production build of all applications and packages in the monorepo, run:

```bash
pnpm run build
```

This command uses `esbuild` to bundle the `http` server into a `dist/` directory within `apps/http`, preparing it for deployment.[11, 12, 13]

## Running Tests

The repository includes a dedicated test suite using Jest located in the `tests/` directory. To run the integration tests against the API, use the following command from the root of the `metaverse` directory:

```bash
pnpm --filter tests test
```

This command uses pnpm's `--filter` flag to specifically target and run the `test` script defined in the `tests/package.json` file.

## Project Structure

This repository is a monorepo managed with pnpm workspaces and Turborepo. This structure allows for efficient code sharing and centralized dependency management.[14, 6]

```
└── metaverse/
    ├── apps/
    │   └── http/         # Express.js API server
    ├── packages/
    │   ├── db/           # Prisma schema, client, and migrations
    │   ├── eslint-config/ # Shared ESLint configuration
    │   ├── ts-config/    # Shared TypeScript configuration
    │   └── ui/           # Shared UI components (if any)
    └── tests/            # Jest integration tests
```
