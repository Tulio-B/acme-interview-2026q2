package com.interview.service;

import com.interview.model.Task;
import com.interview.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Challenge A-2: Either add a new method or modify the one below.
     * Leave a comment explaining your preferred approach.
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found: " + id));
    }

    /**
     * Challenge A-3: This method shouldn't allow new tasks to have due dates in the past.
     *
     * Fix this method to check the due date before saving. Throw a RuntimeException if it fails.
     * Leave a comment explaining your approach.
     */
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Challenge A-1: This method is called by an endpoint with the
     * PATCH method, but it doesn't actually support partial updates.
     * 
     * Fix this method to support true partial updates.
     * Leave a comment explaining your approach.
     */
    public Task updateTask(Long id, Task incoming) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found: " + id));

        existing.setTitle(incoming.getTitle());
        existing.setDescription(incoming.getDescription());
        existing.setStatus(incoming.getStatus());
        existing.setPriority(incoming.getPriority());
        existing.setDueDate(incoming.getDueDate());
        existing.setAssignee(incoming.getAssignee());

        return taskRepository.save(existing);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}