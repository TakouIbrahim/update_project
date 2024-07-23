package com.example.register.registration.dto;

import jakarta.validation.constraints.NotBlank;

public record RegistrationDTO(
        Long id,

        @NotBlank(message = "le nom ne peut être null")
        String name,
        String surname,
        String email
) {
}
