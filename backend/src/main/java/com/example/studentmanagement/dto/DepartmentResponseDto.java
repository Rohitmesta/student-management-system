package com.example.studentmanagement.dto;


import java.time.LocalDateTime;


public class DepartmentResponseDto {


    private Long id;

    private String code;

    private String name;

    private String hodName;

    private LocalDateTime createdAt;


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