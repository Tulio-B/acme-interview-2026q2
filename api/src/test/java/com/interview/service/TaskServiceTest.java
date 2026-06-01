package com.interview.service;

import com.interview.model.Task;
import com.interview.model.TaskStatus;
import com.interview.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task task;

    @BeforeEach
    void setUp() {
        task = new Task();
        task.setId(1L);
        task.setTitle("Deploy to production");
        task.setStatus(TaskStatus.OPEN);
    }

    /**
     * Challenge A-3: Add the remaining test here.
     *
     * The test skeleton below gives the setup — candidates fill in the assertions
     * and any additional mocking needed.
     */
    @Test
    void createTask_withPastDueDate_throwsException() {
    }

    @Test
    void updateTask_withNullFields_doesNotOverwriteExistingValues() {
        when(taskRepository.findById(task.getId())).thenReturn(Optional.ofNullable(task));
        when(taskRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        //Attempts to update the existing task with a status change (partial change)
        var updatedTask = new Task();
        updatedTask.setId(task.getId());
        updatedTask.setStatus(TaskStatus.DONE);

        //The resulting task's title should not be null
        var resultingTask = taskService.updateTask(task.getId(), updatedTask);
        assertNotNull(resultingTask.getTitle());
    }
}