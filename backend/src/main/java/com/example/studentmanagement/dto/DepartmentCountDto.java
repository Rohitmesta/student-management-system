package com.example.studentmanagement.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class DepartmentCountDto {


    private String department;


    private Long count;


}