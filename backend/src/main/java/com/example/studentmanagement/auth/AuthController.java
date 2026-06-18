package com.example.studentmanagement.auth;

import com.example.studentmanagement.enums.Role;
import com.example.studentmanagement.model.RefreshToken;
import com.example.studentmanagement.security.JwtUtil;
import com.example.studentmanagement.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private RefreshTokenService refreshTokenService;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    // REGISTER API
    @PostMapping("/register")
    public String registerUser(
            @RequestBody User user
    ) {


        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );


        user.setRole(Role.ADMIN);


        userRepository.save(user);


        return "User registered successfully";
    }




    // LOGIN API
    @PostMapping("/login")
    public LoginResponse loginUser(
            @RequestBody LoginRequest loginRequest
    ) {

        User user =
                userRepository
                        .findByUsername(
                                loginRequest.getUsername()
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );



        boolean passwordMatches =
                passwordEncoder.matches(
                        loginRequest.getPassword(),
                        user.getPassword()
                );



        if (!passwordMatches) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }



        String accessToken =
                JwtUtil.generateToken(user);



        RefreshToken refreshToken =
                refreshTokenService
                        .createRefreshToken(
                                user.getUsername()
                        );



        return new LoginResponse(
                accessToken,
                refreshToken.getToken()
        );
    }





    // REFRESH TOKEN API
    @PostMapping("/refresh")
    public LoginResponse refreshToken(
            @RequestBody RefreshTokenRequest request
    ) {


        System.out.println("REFRESH CONTROLLER HIT");


        RefreshToken refreshToken =
                refreshTokenService
                        .verifyRefreshToken(
                                request.getRefreshToken()
                        );



        User user =
                refreshToken.getUser();



        String newAccessToken =
                JwtUtil.generateToken(user);



        return new LoginResponse(
                newAccessToken,
                refreshToken.getToken()
        );
    }
}