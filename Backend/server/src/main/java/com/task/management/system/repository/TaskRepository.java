package com.task.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.management.system.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Task findTaskByTaskId(Long taskId);
}
