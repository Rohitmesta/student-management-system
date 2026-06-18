package com.example.studentmanagement.service;

import com.example.studentmanagement.auth.User;
import com.example.studentmanagement.auth.UserRepository;
import com.example.studentmanagement.model.RefreshToken;
import com.example.studentmanagement.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;


@Service
public class RefreshTokenService {


    @Autowired
    private RefreshTokenRepository refreshTokenRepository;


    @Autowired
    private UserRepository userRepository;



    @Transactional
    public RefreshToken createRefreshToken(String username) {


        User user =
                userRepository
                        .findByUsername(username)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "User not found"
                                )
                        );



        // Delete old refresh token
        refreshTokenRepository.deleteByUser(user);


        // Force delete before inserting new token
        refreshTokenRepository.flush();



        RefreshToken refreshToken =
                new RefreshToken();



        refreshToken.setUser(user);



        refreshToken.setToken(
                UUID.randomUUID().toString()
        );



        refreshToken.setExpiryDate(
                Instant.now()
                        .plusSeconds(
                                7 * 24 * 60 * 60
                        )
        );



        return refreshTokenRepository.save(
                refreshToken
        );
    }






    public RefreshToken verifyRefreshToken(
            String token
    ) {


        RefreshToken refreshToken =
                refreshTokenRepository
                        .findByToken(token)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Refresh token not found"
                                )
                        );



        if (refreshToken
                .getExpiryDate()
                .isBefore(
                        Instant.now()
                )) {



            refreshTokenRepository.delete(
                    refreshToken
            );



            throw new RuntimeException(
                    "Refresh token expired"
            );
        }



        return refreshToken;
    }
}