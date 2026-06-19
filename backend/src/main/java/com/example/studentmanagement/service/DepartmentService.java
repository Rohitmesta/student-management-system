package com.example.studentmanagement.service;


import com.example.studentmanagement.dto.DepartmentRequestDto;
import com.example.studentmanagement.dto.DepartmentResponseDto;

import com.example.studentmanagement.model.Department;

import com.example.studentmanagement.repository.DepartmentRepository;


import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;


import java.util.List;

import java.util.stream.Collectors;




@Service
public class DepartmentService {


    @Autowired
    private DepartmentRepository departmentRepository;


    @Autowired
    private ModelMapper modelMapper;





    public DepartmentResponseDto createDepartment(

            DepartmentRequestDto request

    ) {



        if (
                departmentRepository.existsByCode(
                        request.getCode()
                )
        ) {


            throw new RuntimeException(
                    "Department code already exists"
            );


        }




        if (
                departmentRepository.existsByName(
                        request.getName()
                )
        ) {


            throw new RuntimeException(
                    "Department already exists"
            );


        }






        Department department =
                modelMapper.map(
                        request,
                        Department.class
                );



        Department savedDepartment =
                departmentRepository.save(
                        department
                );



        return modelMapper.map(

                savedDepartment,

                DepartmentResponseDto.class

        );


    }








    public List<DepartmentResponseDto> getAllDepartments() {



        return departmentRepository.findAll()

                .stream()

                .map(

                        department ->

                                modelMapper.map(

                                        department,

                                        DepartmentResponseDto.class

                                )

                )

                .collect(
                        Collectors.toList()
                );


    }









    public DepartmentResponseDto updateDepartment(

            Long id,

            DepartmentRequestDto request

    ) {




        Department department =
                departmentRepository.findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(

                                        "Department not found"

                                )

                        );






        department.setCode(
                request.getCode()
        );


        department.setName(
                request.getName()
        );


        department.setHodName(
                request.getHodName()
        );




        Department updatedDepartment =
                departmentRepository.save(
                        department
                );




        return modelMapper.map(

                updatedDepartment,

                DepartmentResponseDto.class

        );


    }








    public String deleteDepartment(

            Long id

    ) {



        departmentRepository.deleteById(
                id
        );



        return "Department deleted successfully";


    }


}