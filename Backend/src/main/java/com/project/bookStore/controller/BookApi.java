package com.project.bookStore.controller;

import com.project.bookStore.entity.Book;
import com.project.bookStore.model.BookModel;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping("/api")
public interface BookApi {

    @GetMapping(value = "/books/all", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<List<Book>> getAllBooks();


    @PostMapping(value = "/books/create", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Book> addBook(@Valid @RequestBody BookModel bookModel);

    @GetMapping(value = "/books/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Book> getBook(@PathVariable Long id);

    @DeleteMapping(value = "/books/delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<String> deleteBook(@PathVariable Long id);

    @PutMapping(value = "/books/edit/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Book> editBook(@PathVariable Long id, @Valid @RequestBody BookModel bookModel);
}
