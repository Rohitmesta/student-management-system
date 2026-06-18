package com.example.studentmanagement.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;



@Entity
public class Student {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




    @Column(
            nullable = false,
            unique = true
    )
    private String usn;




    private String name;





    @Column(
            nullable = false,
            unique = true
    )
    private String email;





    private String department;





    private Integer age;








    public Student() {

    }








    public Student(

            Long id,

            String usn,

            String name,

            String email,

            String department,

            Integer age

    ) {


        this.id = id;


        this.usn = usn;


        this.name = name;


        this.email = email;


        this.department = department;


        this.age = age;


    }










    public Long getId() {

        return id;

    }



    public void setId(
            Long id
    ) {

        this.id = id;

    }









    public String getUsn() {

        return usn;

    }



    public void setUsn(
            String usn
    ) {

        this.usn = usn;

    }











    public String getName() {

        return name;

    }



    public void setName(
            String name
    ) {

        this.name = name;

    }












    public String getEmail() {

        return email;

    }



    public void setEmail(
            String email
    ) {

        this.email = email;

    }











    public String getDepartment() {

        return department;

    }



    public void setDepartment(
            String department
    ) {

        this.department = department;

    }











    public Integer getAge() {

        return age;

    }



    public void setAge(
            Integer age
    ) {

        this.age = age;

    }


}