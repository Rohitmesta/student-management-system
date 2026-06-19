package com.example.studentmanagement.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;



public class StudentRequestDto {


    @NotBlank(message = "USN is required")
    @Pattern(
            regexp = "^[0-9][A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{3}$",
            message = "Invalid USN format"
    )
    private String usn;




    @NotBlank(message = "Name is required")
    @Pattern(
            regexp = "^[A-Za-z ]+$",
            message = "Name must contain only letters"
    )
    private String name;




    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;





    @NotNull(message = "Department is required")
    private Long departmentId;





    @NotNull(message = "Age is required")
    @Min(
            value = 1,
            message = "Age must be at least 1"
    )
    @Max(
            value = 120,
            message = "Age must be below 120"
    )
    private Integer age;







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





    public Long getDepartmentId() {
        return departmentId;
    }


    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }





    public Integer getAge() {
        return age;
    }


    public void setAge(Integer age) {
        this.age = age;
    }


}