package com.example.studentmanagement.repository;


import com.example.studentmanagement.model.Department;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;



@Repository
public interface DepartmentRepository
        extends JpaRepository<Department, Long> {


    boolean existsByCode(
            String code
    );


    boolean existsByName(
            String name
    );


}