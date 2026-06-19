package com.example.studentmanagement.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Department {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(
            nullable = false,
            unique = true
    )
    private String code;


    @Column(
            nullable = false,
            unique = true
    )
    private String name;


    private String hodName;


    private LocalDateTime createdAt;


    public Department() {

    }


    @PrePersist
    public void beforeSave() {

        createdAt = LocalDateTime.now();

    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getCode() {
        return code;
    }


    public void setCode(String code) {
        this.code = code;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getHodName() {
        return hodName;
    }


    public void setHodName(String hodName) {
        this.hodName = hodName;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}