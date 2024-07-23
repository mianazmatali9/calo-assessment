# @spaceheater/backend

This package contains the API for the SpaceHeater Distributor platform.

## Prerequisites

There are several prerequisites you need to satisfy in order to run this application:

### Follow README in root

There is a README file in the root of this repository. Follow it to ensure you have the right Node version

### Set up local env

Copy `.env.example` to a `.env` file. If you need to adjust the PostgreSQL settings in your `.env` you can do so; it isn't saved in version control.

### Set up local PostgreSQL database

Homebrew is the preferred way of installing and running PostgreSQL on a Mac. If you prefer another method, please feel free to use it. Just make sure you update your `.env` with the correct settings.

#### Install Postgres version 14

```bash
brew install postgresql@14
```

#### Start Postgres server

```bash
brew services start postgresql@14
# If you ever have trouble connecting after starting, you can try to restart:
brew services restart postgresql@14
```

#### Create default Postgres user

For Macs with M1 chip:

```bash
/opt/homebrew/bin/createuser -s postgres
```

For Macs with Intel chip:

```bash
/usr/local/opt/postgresql@11/bin/createuser -s postgres
```

### Run DB Migrations

Migrations are the way we create and modify our database tables. It's always a good idea to run the migration command after you pull the latest code from Github.

```bash
pnpm migration:run
```

### Run DB Seeds

Seeds are what we use to prepopulate the database with data we need ahead of time or for testing. You can insert this seed data in the database by running:

```bash
# From applications/backend
pnpm seed
```

## Run the Application Locally

As stated in the root README, you can run the API locally like so:

```sh
# From the root of the project
lerna run --scope=@spaceheater/backend dev
# From applications/backend
pnpm dev
```

### Documentation & Postman

Documentation for all services is defined using OpenAPI 3.0 in `./reference/backend.openapi.yml`. This file should be kept up-to-date when changes to APIs occur. This spec can be imported into Postman for use in development. The conversion from OpenAPI 3.0 to Postman Collection is handled via Portman by running `lerna run --scope=backend portman`. Before you do this, please make sure you have a `.env` file with the following information in the root of your repo:

```
# Get this from your Postman account
POSTMAN_API_KEY=YOUR_POSTMAN_API_KEY
# The name of the Workspace you want to import the collection to
POSTMAN_WORKSPACE_NAME=YOUR_POSTMAN_WORKSPACE_NAME
# The collection you want to import to. This can be obtained by copying the link to the collection and opening it in your browser. The last url segment (after /collection/) is the UID.
POSTMAN_COLLECTION_UID=YOUR_POSTMAN_COLLECTION_UID
```
