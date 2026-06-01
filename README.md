# Interview Monorepo — Candidate Instructions

Welcome! This repository contains a small full-stack Task Management System.
Read this document carefully before starting.

---

## Project Structure

```
interview-monorepo/
├── api/        → Java + Spring Boot (REST API)
└── web/        → React + Vite (Front-end)
```

---

## Prerequisites

| Tool        | Version  |
|-------------|----------|
| Java        | 17+      |
| Node.js     | 18+      |
| npm         | 9+       |

No database installation required — the app uses an embedded H2 file-based
database. Data is stored in `api/data/interviewdb.mv.db` and is created
automatically on first run.

---

## Running the Application

### API (Spring Boot)
```bash
./gradlew bootRun
```

The API will start on **http://localhost:8080**

### Front-end (React)
```bash
./gradlew npmDev
```

or

```bash
cd web
npm run dev
```

The front-end will start on **http://localhost:5173**

> API requests from the front-end are proxied via Vite to avoid CORS issues
> in development. See `web/vite.config.js`.

---

## Database

The H2 console is available at **http://localhost:8080/h2-console**

| Field    | Value                              |
|----------|------------------------------------|
| JDBC URL | `jdbc:h2:file:./data/interviewdb`  |
| Username | `sa`                               |
| Password | *(leave blank)*                    |

Schema is created automatically from `api/src/main/resources/schema.sql`;
Seed data is loaded automatically from `api/src/main/resources/data.sql`.

---

## Challenges

Your tasks are described in **CHALLENGES.md**.  
Estimated total time: **3–4 hours**.

Work as you would on a real project:
- Commit frequently with meaningful messages
- Add tests where instructed
- Do not remove existing code without justification
- Comments on your train-of-thought are encouraged

---

## Submission

When finished, create a **patch file** of your changes and send it to the interviewer.
You will walk through your solution in a 30-minute live review session.