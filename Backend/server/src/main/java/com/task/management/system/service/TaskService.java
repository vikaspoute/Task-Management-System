package com.task.management.system.service;

import java.util.Set;

import com.task.management.system.model.Task;

public interface TaskService {

    public Task addTask(Task task);

    public Set<Task> getTasks();

    public Task getTaskByTaskId(Long taskId);

    public Task updateTask(Task task);

    public boolean removeTaskId(Long taskId);

}
