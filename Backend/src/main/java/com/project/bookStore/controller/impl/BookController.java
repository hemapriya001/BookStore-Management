package com.project.bookStore.controller.impl;

import com.project.bookStore.controller.BookApi;
import com.project.bookStore.entity.Book;
import com.project.bookStore.model.BookModel;
import com.project.bookStore.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@Slf4j
@RequiredArgsConstructor
public class BookController implements BookApi {

    @Autowired
    private BookService bookService;

    @Override
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> bookList = bookService.getAll();
        return ResponseEntity.ok(bookList);
    }

    @Override
    public ResponseEntity<Book> addBook(BookModel bookModel) {
        return ResponseEntity.ok(bookService.createBook(bookModel));
    }

    @Override
    public ResponseEntity<Book> getBook(Long id) {
        Book book = bookService.getBook(id);
        if (Objects.isNull(book)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(book);
    }

    @Override
    public ResponseEntity<String> deleteBook(Long id) {
        String response = bookService.deleteBook(id);
        if (response.equalsIgnoreCase("SUCCESS")) {
            return ResponseEntity.ok("Book Deleted Successfully");
        }
        return ResponseEntity.badRequest().body(response);

    }

    @Override
    public ResponseEntity<Book> editBook(Long id, BookModel bookModel) {
        Book response = bookService.editBook(id, bookModel);
        if (Objects.isNull(response)) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(response);
    }
}
