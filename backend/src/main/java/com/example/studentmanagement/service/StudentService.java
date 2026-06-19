package com.example.studentmanagement.service;


import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;

import com.example.studentmanagement.model.Department;
import com.example.studentmanagement.model.Student;

import com.example.studentmanagement.repository.DepartmentRepository;
import com.example.studentmanagement.repository.StudentRepository;


import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.*;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;




@Service
public class StudentService {


    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private DepartmentRepository departmentRepository;


    @Autowired
    private ModelMapper modelMapper;





    public StudentResponseDto saveStudent(
            StudentRequestDto request
    ) {



        if (
                studentRepository.existsByUsn(
                        request.getUsn()
                )
        ) {

            throw new RuntimeException(
                    "USN already exists"
            );

        }



        if (
                studentRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }





        Department department =
                departmentRepository.findById(
                                request.getDepartmentId()
                        )

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Department not found"
                                )
                        );





        Student student =
                new Student();


        student.setUsn(
                request.getUsn()
        );


        student.setName(
                request.getName()
        );


        student.setEmail(
                request.getEmail()
        );


        student.setAge(
                request.getAge()
        );


        student.setDepartment(
                department
        );





        Student saved =
                studentRepository.save(
                        student
                );



        return modelMapper.map(
                saved,
                StudentResponseDto.class
        );

    }









    public List<StudentResponseDto> getAllStudents() {


        return studentRepository.findAll()

                .stream()

                .map(student ->

                        modelMapper.map(
                                student,
                                StudentResponseDto.class
                        )
                )

                .collect(
                        Collectors.toList()
                );

    }









    public StudentResponseDto getStudentById(
            Long id
    ) {



        Student student =
                studentRepository.findById(id)

                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Student not found"
                                )
                        );



        return modelMapper.map(
                student,
                StudentResponseDto.class
        );

    }









    public StudentResponseDto updateStudent(

            Long id,

            StudentRequestDto request

    ) {



        Student student =
                studentRepository.findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Student not found"
                                )
                        );





        Department department =
                departmentRepository.findById(
                                request.getDepartmentId()
                        )

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Department not found"
                                )

                        );





        student.setUsn(
                request.getUsn()
        );


        student.setName(
                request.getName()
        );


        student.setEmail(
                request.getEmail()
        );


        student.setAge(
                request.getAge()
        );


        student.setDepartment(
                department
        );





        Student updated =
                studentRepository.save(
                        student
                );



        return modelMapper.map(
                updated,
                StudentResponseDto.class
        );

    }









    public String deleteStudent(
            Long id
    ) {


        studentRepository.deleteById(
                id
        );


        return "Student deleted successfully";

    }











    public Page<StudentResponseDto> getStudents(

            int page,

            int size,

            String sortBy,

            String direction,

            String keyword

    ) {



        Sort sort =
                direction.equalsIgnoreCase("asc")

                        ? Sort.by(sortBy).ascending()

                        : Sort.by(sortBy).descending();




        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        sort
                );





        Page<Student> students;


        if (
                keyword != null
                        &&
                        !keyword.isEmpty()
        ) {


            students =
                    studentRepository
                            .findByNameContainingIgnoreCaseOrUsnContainingIgnoreCaseOrEmailContainingIgnoreCase(

                                    keyword,
                                    keyword,
                                    keyword,
                                    pageable
                            );

        }

        else {


            students =
                    studentRepository.findAll(
                            pageable
                    );

        }






        return students.map(

                student ->

                        modelMapper.map(
                                student,
                                StudentResponseDto.class
                        )

        );

    }


}