package com.sanjana.portfolio.controller;

import com.sanjana.portfolio.entity.Contact;
import com.sanjana.portfolio.repository.ContactRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactRepository contactRepository;

    public ContactController(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @PostMapping
    public ResponseEntity<Contact> saveContact(@RequestBody Contact contact) {

        Contact savedContact = contactRepository.save(contact);

        return ResponseEntity.ok(savedContact);
    }
}