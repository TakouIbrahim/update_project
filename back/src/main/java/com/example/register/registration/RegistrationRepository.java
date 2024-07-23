package com.example.register.registration;

import com.example.register.registration.dao.RegistrationDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RegistrationRepository extends JpaRepository<RegistrationDAO, Long> {

    Optional<RegistrationDAO> findByEmail(String email);
}
