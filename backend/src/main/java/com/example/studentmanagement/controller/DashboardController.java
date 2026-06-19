package com.example.studentmanagement.controller;


import com.example.studentmanagement.dto.DashboardStatsDto;
import com.example.studentmanagement.dto.DepartmentCountDto;

import com.example.studentmanagement.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


    @Autowired
    private DashboardService dashboardService;





    @GetMapping("/stats")
    public DashboardStatsDto getStats() {


        return dashboardService.getStats();


    }







    @GetMapping("/departments")
    public List<DepartmentCountDto> getDepartmentCounts() {


        return dashboardService.getDepartmentCounts();


    }


}