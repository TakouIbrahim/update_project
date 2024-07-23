package com.example.register.registration;

import com.example.register.registration.dao.RegistrationDAO;
import com.example.register.registration.dto.RegistrationDTO;
import com.example.register.registration.exception.RegistrationNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegistrationService {
    private final RegistrationRepository registrationRepository;
    private final RegistrationMapper registrationMapper;

    public RegistrationDTO save(RegistrationDTO registrationDTO){
        return registrationMapper
                .toRegistrationDTO(registrationRepository
                        .save(registrationMapper
                                .toRegistrationDAO(registrationDTO)));
    }

    public RegistrationDTO saveSynchronization(RegistrationDTO registrationDTO){
        return registrationRepository.findByEmail(registrationDTO.email())
                .map(existingRegistration -> registrationDTO)
                .orElseGet(() -> registrationMapper.toRegistrationDTO(
                        registrationRepository.save(
                                registrationMapper.toRegistrationDAO(registrationDTO)
                        )
                ));
    }


    public List<RegistrationDTO> findAll(){
        return registrationRepository.findAll()
                .stream()
                    .map(registrationMapper::toRegistrationDTO).toList();
    }

    public RegistrationDTO update(Long id, RegistrationDTO registrationDTO) throws RegistrationNotFoundException {
        RegistrationDAO updatingRegistration = registrationRepository.findById(id).orElseThrow(() ->{
            return new RegistrationNotFoundException("Cette enregistrement n'existe pas");
        });
        updatingRegistration.setEmail(registrationDTO.email());
        updatingRegistration.setName(registrationDTO.name());
        updatingRegistration.setSurname(registrationDTO.surname());

        return registrationMapper.toRegistrationDTO(updatingRegistration);
    }

    public void delete(Long id) throws RegistrationNotFoundException {
        if(!registrationRepository.existsById(id))
            throw new RegistrationNotFoundException("Cette enregistrement n'existe pas");
        registrationRepository.deleteById(id);
    }
}
