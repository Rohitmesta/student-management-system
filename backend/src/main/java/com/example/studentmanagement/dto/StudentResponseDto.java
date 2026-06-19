package com.example.studentmanagement.dto;



public class StudentResponseDto {


    private Long id;

    private String usn;

    private String name;

    private String email;

    private DepartmentResponseDto department;

    private Integer age;






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






    public DepartmentResponseDto getDepartment() {
        return department;
    }


    public void setDepartment(
            DepartmentResponseDto department
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