package com.example.studentmanagement.dto;


import jakarta.validation.constraints.NotBlank;


public class DepartmentRequestDto {


    @NotBlank(message = "Department code required")
    private String code;


    @NotBlank(message = "Department name required")
    private String name;


    private String hodName;



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
}