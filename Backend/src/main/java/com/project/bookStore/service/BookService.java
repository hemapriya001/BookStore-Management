package com.project.bookStore.service;

import com.project.bookStore.entity.Book;
import com.project.bookStore.model.BookModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    List<Book> getAll();

    Book createBook(BookModel bookModel);

    Book getBook(Long id);

    String deleteBook(Long id);

    Book editBook(Long id, BookModel bookModel);
}
