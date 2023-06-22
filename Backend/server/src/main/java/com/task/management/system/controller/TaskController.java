package com.task.management.system.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.management.system.model.Task;
import com.task.management.system.model.User;
import com.task.management.system.service.TaskService;
import com.task.management.system.service.UserService;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping("/add-task")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        Task newTask = taskService.addTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(newTask);
    }

    @GetMapping("/all-tasks")
    public ResponseEntity<Set<Task>> getAllTasks() {
        Set<Task> tasks = taskService.getTasks();
        if (!tasks.isEmpty()) {
            return ResponseEntity.ok(tasks);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        Task task = taskService.getTaskByTaskId(taskId);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-task")
    public ResponseEntity<Task> updateTask(@RequestBody Task updatedTask) {
        Task existingTask = taskService.getTaskByTaskId(updatedTask.getTaskId());
        if (existingTask == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the task properties
        existingTask.setTaskName(updatedTask.getTaskName());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setDueDate(updatedTask.getDueDate());
        existingTask.setPriority(updatedTask.getPriority());
        existingTask.setStatus(updatedTask.getStatus());

        // Update the assigned user
        User assignedUser = userService.getUserByUserId(updatedTask.getAssignedTo().getUserId());
        if (assignedUser == null) {
            return ResponseEntity.notFound().build();
        }
        existingTask.setAssignedTo(assignedUser);

        Task updateTask = taskService.updateTask(existingTask);
        return ResponseEntity.ok(updateTask);
    }

    @DeleteMapping("/delete-task/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        boolean isDeleted = taskService.removeTaskId(taskId);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
