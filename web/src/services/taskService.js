const BASE = '/api/tasks';

/**
 * Fetches all tasks. Supports optional query params.
 * @param {URLSearchParams} params
 */
export async function fetchTasks(params = new URLSearchParams()) {
  const paramsString = params.toString();
  const res = await fetch(`${BASE}${paramsString && `?${paramsString}`}`);

  if (!res.ok) throw new Error(`Failed to fetch tasks: ${res.status}`);
  return res.json();
}

/**
 * Fetches a task by it's id.
 * @param {number} id
 */
export async function fetchTask(id) {
  const res = await fetch(`${BASE}/${id}`);

  if (!res.ok) throw new Error(`Failed to fetch task ${id}: ${res.status}`);
  return res.json();
}

/**
 * Creates a new task.
 * @param {Task} task
 */
export async function createTask(task) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('Task creation failed'), { status: res.status, body: err });
  }

  return res.json();
}

/**
 * Partially updates a task — sends only the fields provided.
 * @param {number} id
 * @param {Partial<Task>} patch
 */
export async function updateTask(id, task) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('Task update failed'), { status: res.status, body: err });
  }

  return res.json();
}

/**
 * Deletes a task.
 * @param {number} id
 */
export async function deleteTask(id) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('Task deletion failed'), { status: res.status, body: err });
  }

  return res;
}