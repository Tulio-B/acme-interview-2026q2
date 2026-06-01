MERGE INTO app_user (id, name, email) KEY(id) VALUES
  (1, 'Alice Johnson', 'alice@example.com'),
  (2, 'Bob Smith', 'bob@example.com'),
  (3, 'Carol White', 'carol@example.com');
  
MERGE INTO task (id, title, description, status, priority, due_date, assignee_id) KEY(id) VALUES
  (1, 'Setup CI pipeline', 'Configure GitHub Actions for the monorepo', 'OPEN', 'HIGH', DATEADD('DAY', 5, CURRENT_DATE), 1),
  (2, 'Write API docs', 'Document all REST endpoints using OpenAPI', 'OPEN', 'MEDIUM', DATEADD('DAY', 10, CURRENT_DATE), 2),
  (3, 'Fix login bug', 'Users are logged out after 2 minutes', 'OPEN', 'CRITICAL', DATEADD('DAY', 1, CURRENT_DATE), 1),
  (4, 'Refactor auth module', 'Extract auth logic into a separate service', 'OPEN', 'MEDIUM', DATEADD('DAY', 15, CURRENT_DATE), 3),
  (5, 'Deploy to staging', 'Deploy the current main branch to staging env', 'DONE', 'HIGH', DATEADD('DAY', -2, CURRENT_DATE), 2);