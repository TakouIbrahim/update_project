package com.example.register.registration;

import com.example.register.registration.dao.RegistrationDAO;
import com.example.register.registration.dto.RegistrationDTO;
import org.mapstruct.Mapper;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring")
public interface RegistrationMapper {
    RegistrationDTO toRegistrationDTO(RegistrationDAO registrationDAO);
    RegistrationDAO toRegistrationDAO(RegistrationDTO registrationDTO);
}
