package com.example.studentmanagement.controller;

import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;
import com.example.studentmanagement.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/students")
public class StudentController {


    @Autowired
    private StudentService studentService;



    @PostMapping
    public StudentResponseDto addStudent(
            @Valid @RequestBody StudentRequestDto studentRequestDto
    ) {

        return studentService.saveStudent(studentRequestDto);
    }



    @GetMapping
    public List<StudentResponseDto> getAllStudents() {

        return studentService.getAllStudents();
    }



    @GetMapping("/{id}")
    public StudentResponseDto getStudentById(
            @PathVariable Long id
    ) {

        return studentService.getStudentById(id);
    }



    @PutMapping("/{id}")
    public StudentResponseDto updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody StudentRequestDto studentRequestDto
    ) {

        return studentService.updateStudent(
                id,
                studentRequestDto
        );
    }



    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id
    ) {

        return studentService.deleteStudent(id);
    }



    @GetMapping("/paged")
    public Page<StudentResponseDto> getStudents(

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "id")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String direction,

            @RequestParam(required = false)
            String keyword
    ) {


        return studentService.getStudents(
                page,
                size,
                sortBy,
                direction,
                keyword
        );
    }
}