package com.example.studentmanagement.model;


import jakarta.persistence.*;


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




    @ManyToOne
    @JoinColumn(
            name = "department_id",
            nullable = false
    )
    private Department department;




    private Integer age;





    public Student() {

    }






    public Long getId() {

        return id;

    }


    public void setId(Long id) {

        this.id = id;

    }





    public String getUsn() {

        return usn;

    }


    public void setUsn(String usn) {

        this.usn = usn;

    }





    public String getName() {

        return name;

    }


    public void setName(String name) {

        this.name = name;

    }






    public String getEmail() {

        return email;

    }


    public void setEmail(String email) {

        this.email = email;

    }






    public Department getDepartment() {

        return department;

    }


    public void setDepartment(
            Department department
    ) {

        this.department = department;

    }






    public Integer getAge() {

        return age;

    }


    public void setAge(Integer age) {

        this.age = age;

    }


}