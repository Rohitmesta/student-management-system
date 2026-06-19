package com.example.studentmanagement.service;


import com.example.studentmanagement.dto.DashboardStatsDto;
import com.example.studentmanagement.dto.DepartmentCountDto;

import com.example.studentmanagement.repository.DepartmentRepository;
import com.example.studentmanagement.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class DashboardService {


    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private DepartmentRepository departmentRepository;





    public DashboardStatsDto getStats() {


        long students =
                studentRepository.count();


        long departments =
                departmentRepository.count();



        return new DashboardStatsDto(
                students,
                departments
        );


    }







    public List<DepartmentCountDto> getDepartmentCounts() {


        return studentRepository
                .countStudentsByDepartment();


    }


}