package com.example.studentmanagement.controller;


import com.example.studentmanagement.dto.DepartmentRequestDto;
import com.example.studentmanagement.dto.DepartmentResponseDto;

import com.example.studentmanagement.service.DepartmentService;


import jakarta.validation.Valid;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


import java.util.List;




@RestController
@RequestMapping("/api/departments")
public class DepartmentController {


    @Autowired
    private DepartmentService departmentService;






    @PostMapping
    public DepartmentResponseDto createDepartment(

            @Valid
            @RequestBody
            DepartmentRequestDto request

    ) {


        return departmentService.createDepartment(
                request
        );


    }









    @GetMapping
    public List<DepartmentResponseDto> getDepartments() {


        return departmentService.getAllDepartments();


    }










    @PutMapping("/{id}")
    public DepartmentResponseDto updateDepartment(

            @PathVariable
            Long id,


            @Valid
            @RequestBody
            DepartmentRequestDto request

    ) {



        return departmentService.updateDepartment(

                id,

                request

        );


    }









    @DeleteMapping("/{id}")
    public String deleteDepartment(

            @PathVariable
            Long id

    ) {


        return departmentService.deleteDepartment(
                id
        );


    }


}