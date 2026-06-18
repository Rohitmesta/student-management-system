package com.example.studentmanagement.repository;


import com.example.studentmanagement.model.Student;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;




@Repository
public interface StudentRepository
        extends JpaRepository<Student, Long> {





    Page<Student> findAll(
            Pageable pageable
    );







    Page<Student> findByNameContainingIgnoreCase(

            String name,

            Pageable pageable

    );








    Page<Student> findByNameContainingIgnoreCaseOrUsnContainingIgnoreCaseOrEmailContainingIgnoreCase(

            String name,

            String usn,

            String email,

            Pageable pageable

    );








    boolean existsByEmail(
            String email
    );


    boolean existsByUsn(
            String usn
    );


}