package com.example.register.registration;

import com.example.register.registration.dto.RegistrationDTO;
import com.example.register.registration.exception.RegistrationNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/registration")
public class RegistrationController {

    private final RegistrationService registrationService;


    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationDTO save(@RequestBody @Valid RegistrationDTO registrationDTO){
        return registrationService.save(registrationDTO);
    }

    @PostMapping("/synch")
    @ResponseStatus(HttpStatus.CREATED)
    public RegistrationDTO saveSynchronisation(@RequestBody @Valid RegistrationDTO registrationDTO){
        return registrationService.saveSynchronization(registrationDTO);
    }

    @GetMapping("/all")
    public List<RegistrationDTO> findAll(){
        return registrationService.findAll();
    }

    @PutMapping("/{id}")
    public RegistrationDTO update(@PathVariable Long id, @RequestBody @Valid RegistrationDTO registrationDTO) throws RegistrationNotFoundException {
        return registrationService.update(id, registrationDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) throws RegistrationNotFoundException {
        registrationService.delete(id);
    }
}
