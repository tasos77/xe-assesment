### XE Assessment
----
This project implements a RESTful API that allows users to search, store and get ads from a Postgre database.

### Requirements
- Bun runtime (or Node.js)
- Docker compose

----
### Setup
- Clone the repository
```
git clone https://github.com/tasos77/xe-assesment.git
```

- Install Backkend dependencies
```
cd xe-assesment
cd api
bun install
```

- Install Frontend dependencies
```
cd ..
cd webapp
bun install
```

> **Info**
> No .env file is required.

- Postgress
Navigate to api folder
```
docker-compose up -d
```

### Run the application

- Start server
```
cd api
bun dev
```

> **Info**\
> API documentation is available at: `http://localhost:3000/api/v1/docs`

- Start ui server
```
cd webapp
bun dev --port 4000
```
> Web app is available at: `http://localhost:4000`

### Architecture - Web App
This application uses the default Nuxt4 folder architecture.

### Architecture - API
This application combines elements of both Clean and Onion architectures richer than Onion but simpler than full Clean Architecture.
The main idea is a clear separation between business logic and infrastructure logic.

---

- Core (`/core`)
In this folder you will find the core business logic of the application.
In more detail, this folder contains the following subfolders:
- `usecases`: Application-specific use cases depending on services.
- `services`: Business services depending on repositories.
- `repositories`: Abstractions that depend on entities.
- `entities`: Pure domain models.
> **Dependency flow: Usecases<-Services<-Repositories<-Entities**
---
- Infrastructure (`/infra`)
In this folder you will find the implementation logic of the application. That means that all the logic that is not related to specific modules or external packages is located here.
In more detail, this folder contains the following subfolders.
- `controllers`: (e.g. HTTP controller).
- `repositories`: Technical implementations of repositories..
- `services`: Technical implementations of services.
- `utils`:Utility functions and helpers.

### Missing Parts
**DB Insertion not working properly**\
**DB Data fetching not working properly**
