package com.example.studentmanagement.service;


import com.example.studentmanagement.dto.StudentRequestDto;
import com.example.studentmanagement.dto.StudentResponseDto;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;


import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;



@Service
public class StudentService {


    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private ModelMapper modelMapper;






    public StudentResponseDto saveStudent(
            StudentRequestDto studentRequestDto
    ) {


        if (
                studentRepository.existsByUsn(
                        studentRequestDto.getUsn()
                )
        ) {

            throw new RuntimeException(
                    "USN already exists"
            );

        }




        if (
                studentRepository.existsByEmail(
                        studentRequestDto.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }






        Student student =
                modelMapper.map(
                        studentRequestDto,
                        Student.class
                );



        Student savedStudent =
                studentRepository.save(
                        student
                );




        return modelMapper.map(
                savedStudent,
                StudentResponseDto.class
        );

    }








    public List<StudentResponseDto> getAllStudents() {


        List<Student> students =
                studentRepository.findAll();



        return students.stream()

                .map(student ->

                        modelMapper.map(
                                student,
                                StudentResponseDto.class
                        )

                )

                .collect(Collectors.toList());


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

            StudentRequestDto studentRequestDto

    ) {



        Student existingStudent =
                studentRepository.findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Student not found"
                                )

                        );





        if (

                !existingStudent.getUsn()
                        .equals(
                                studentRequestDto.getUsn()
                        )

                        &&

                        studentRepository.existsByUsn(
                                studentRequestDto.getUsn()
                        )

        ) {


            throw new RuntimeException(
                    "USN already exists"
            );


        }







        if (

                !existingStudent.getEmail()
                        .equals(
                                studentRequestDto.getEmail()
                        )

                        &&

                        studentRepository.existsByEmail(
                                studentRequestDto.getEmail()
                        )

        ) {


            throw new RuntimeException(
                    "Email already exists"
            );


        }








        existingStudent.setUsn(
                studentRequestDto.getUsn()
        );


        existingStudent.setName(
                studentRequestDto.getName()
        );


        existingStudent.setEmail(
                studentRequestDto.getEmail()
        );


        existingStudent.setDepartment(
                studentRequestDto.getDepartment()
        );


        existingStudent.setAge(
                studentRequestDto.getAge()
        );








        Student updatedStudent =
                studentRepository.save(
                        existingStudent
                );





        return modelMapper.map(
                updatedStudent,
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


        } else {


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