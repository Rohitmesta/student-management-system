package com.example.studentmanagement.repository;

import com.example.studentmanagement.auth.User;
import com.example.studentmanagement.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


public interface RefreshTokenRepository
        extends JpaRepository<RefreshToken, Long> {


    Optional<RefreshToken> findByToken(String token);


    @Transactional
    void deleteByUser(User user);

}