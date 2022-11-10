## Overview

Ordinly is a project management application geared towards the trades and contractors as a whole.

It's split into various packages that each handle a specific aspect of the project.

### Packages

- api-abstraction
  > An SDK for communicating with the Ordinly backend
- rest-api
  > The main backend for the Ordinly application
- web
  > The web-based frontend

## Getting Started

The initial setup should be fairly straightforward, but will require specific configuration files that are purposefully not present in the GitHub repo. To get the application running, you will need to get said files from SeanAllanMacKay

### Files Needed

- /common/config/env/.env.develpment

```
NODE_ENV=development

NPM_TOKEN=[[VARIABLE]]

REST_API_PORT=8080
REAL_TIME_SERVER_PORT=8082
WEB_PORT=3000

COOKIE_SECRET=CookieSecret
JWT_PASSPHRASE=JWTPassphrase

SENDGRID_API_KEY=[[VARIABLE]]
SENDGRID_EMAIL_ADDRESS=[[VARIABLE]]

STRIPE_PUBLISHABLE_API_KEY=[[VARIABLE]]
STRIPE_SECRET_API_KEY=[[VARIABLE]]

REST_API_DB_URL=mongodb://admin:password@mongodb-rest-api:27018/ordinly?authSource=admin&directConnection=true
FILES_API_DB_URL=mongodb://admin:password@mongodb-files-api:27019/ordinly?authSource=admin&directConnection=true
CHAT_API_DB_URL=mongodb://admin:password@mongodb-chat-api:27020/ordinly?authSource=admin&directConnection=true
SCHEDULER_API_DB_URL=mongodb://admin:password@mongodb-scheduler-api:27021/ordinly?authSource=admin&directConnection=true

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=ordinly

OBJECT_STORAGE_URL=http://minio:9000
OBJECT_STORAGE_ACCESS_KEY=admin
OBJECT_STORAGE_SECRET_KEY=password
```

- /common/config/rush/.npmrc & /common/config/rush/.npmrc-publish

```
@ordinly:registry=https://npm.pkg.github.com

registry=https://registry.npmjs.org/

//npm.pkg.github.com/:_authToken=[[VARIABLE]]
```

### Pre-requirements

- [git](https://git-scm.com/)
- [node](https://nodejs.org/en/)
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [openssl](https://www.openssl.org/)

### Running the app

1. Generate the SSL certificates  
    a. Run the necessary script
   ```shell
   $ npm run ssl
   ```
   b. Fill out the information
   > Country Name (2 letter code) [AU]:{COUNTRY_CODE}
   > State or Province Name (full name) [Some-State]:{PROVINCE}  
   > Locality Name (eg, city) []:{CITY}  
   > Organization Name (eg, company) [Internet Widgits Pty Ltd]:Ordinly  
   > Organizational Unit Name (eg, section) []:
   > Common Name (e.g. server FQDN or YOUR name) []:ordinly
   > Email Address []:{EMAIL}
2. Run the application
   ```shell
   $ npm run dev
   ```

## Commands

The commands to interact with the application are for various technologies (docker/rush/openssl/npm) so we've built a simple abstraction through the package.json scripts. The below commands can be run by typing `npm run [[COMMAND]]` in a terminal at the root level of the project.

- `ssl`: Generates local SSL certificates
- `dev`: Starts the dev server
- `end`: Kills the local app servers
- `build`: Builds the application
- `update`: Updates the monorepo
- `change`: Generates changelogs and bumps versions
- `publish`: Publishes a new version of the npm packages
- `install`: Installs dependencies for all projects. Not to be confused with
- `npm install`: which only installs the dependencies of the folder in which it was run.
