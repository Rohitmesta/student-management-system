package com.example.studentmanagement.security;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;


@Configuration
public class SecurityConfig {


    private final JwtFilter jwtFilter;


    public SecurityConfig(JwtFilter jwtFilter) {

        this.jwtFilter = jwtFilter;
    }



    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

                // Disable CSRF because JWT is used
                .csrf(csrf ->
                        csrf.disable()
                )


                // Enable CORS for React
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource()
                        )
                )


                // Disable default login page
                .formLogin(form ->
                        form.disable()
                )


                // Disable browser popup authentication
                .httpBasic(basic ->
                        basic.disable()
                )


                // JWT = stateless session
                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                .authorizeHttpRequests(auth -> auth


                        // Public APIs
                        .requestMatchers(

                                "/auth/**",

                                "/swagger-ui/**",

                                "/swagger-ui.html",

                                "/v3/api-docs/**"

                        )
                        .permitAll()



                        // USER + ADMIN can view students
                        .requestMatchers(

                                HttpMethod.GET,

                                "/api/students/**"

                        )
                        .hasAnyRole(
                                "USER",
                                "ADMIN"
                        )



                        // Only ADMIN can create
                        .requestMatchers(

                                HttpMethod.POST,

                                "/api/students/**"

                        )
                        .hasRole("ADMIN")



                        // Only ADMIN can update
                        .requestMatchers(

                                HttpMethod.PUT,

                                "/api/students/**"

                        )
                        .hasRole("ADMIN")



                        // Only ADMIN can delete
                        .requestMatchers(

                                HttpMethod.DELETE,

                                "/api/students/**"

                        )
                        .hasRole("ADMIN")



                        .anyRequest()

                        .authenticated()

                )



                // JWT filter
                .addFilterBefore(

                        jwtFilter,

                        UsernamePasswordAuthenticationFilter.class

                );



        return http.build();

    }




    @Bean
    public BCryptPasswordEncoder passwordEncoder() {


        return new BCryptPasswordEncoder();

    }




    @Bean
    public CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration config =
                new CorsConfiguration();



        config.setAllowedOrigins(

                List.of(

                        "http://localhost:5173"

                )

        );



        config.setAllowedMethods(

                List.of(

                        "GET",

                        "POST",

                        "PUT",

                        "DELETE",

                        "OPTIONS"

                )

        );



        config.setAllowedHeaders(

                List.of("*")

        );



        config.setAllowCredentials(true);



        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();



        source.registerCorsConfiguration(

                "/**",

                config

        );



        return source;

    }

}