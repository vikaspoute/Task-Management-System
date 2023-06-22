package com.task.management.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.management.system.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByEmail(String email);
}
