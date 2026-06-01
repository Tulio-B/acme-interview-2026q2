# Challenges

Complete as many challenges as you can given the time assigned.
**Leave comments in the code where you made decisions** — we will discuss them.

---

## API Challenges

### A-1 — Bug Fix: Partial Update (PATCH)
File: `api/src/main/java/com/interview/service/TaskService.java`

The endpoint defined by the `updateTask()` method uses the `PATCH` method, but
has a bug that causes data loss on partial updates. Find it, fix it, and explain your fix.

---

### A-2 — Feature: Filtering
Related Challenge: F-2
File: `api/src/main/java/com/interview/controller/TaskController.java`

Extend `GET /tasks` to support:
- Query param filtering: `?search={text}`
- Query param filtering: `?includeDone={true|false}` (`false` by default)

---

### A-3 — Bug Fix: Create Task Validation
Related Challenge: F-3
Files: `api/src/main/java/com/interview/service/TaskService.java`
       `api/src/test/java/com/interview/service/TaskServiceTest.java`

Implement server side validation for new tasks:
  - dueDate: must not be in the past

Write a unit test covering this rule.

---

## Front-End Challenges

### F-1 — Bug Fix: Stale UI after update
Files: `web/src/pages/TaskList.jsx`
       `web/src/test/TaskList.test.jsx`

After either deleting or marking a task, the UI does not update unless the page is
refreshed. Fix this without causing a full page reload.

---

### F-2 — Feature: Filtering UI with URL State
File: `web/src/pages/TaskList.jsx`

Add filter controls (filtering by task title and whether tasks marked as done should be shown).
Filters must be reflected in the URL as query params and survive a page refresh.

---

### F-3 — Feature: Create Task Form Validation
File: `web/src/pages/CreateTask.jsx`

Add:
  1. Client-side validation:
    - title: required
    - priority: required
    - dueDate: required, must not be in the past
  2. Display field-level errors from the API (the server returns a structured JSON
    error — see `api/src/main/java/com/interview/config/GlobalExceptionHandler.java`
    for the shape)
  3. Disable the submit button while the request is in-flight

---

## Challenge Questions

### Q1 - Frontend Proxying
File: `web/vite.config.js`

The Vite Development Server is configured to work as a proxy, from any request
to the URI `/api` to the API, while also changing the `Origin` header accordingly.
Explain:

- Why this solves CORS in development
- What should happen in a production build