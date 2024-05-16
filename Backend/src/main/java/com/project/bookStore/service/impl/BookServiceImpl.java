package com.project.bookStore.service.impl;

import com.project.bookStore.entity.Book;
import com.project.bookStore.model.BookModel;
import com.project.bookStore.repository.BookRepository;
import com.project.bookStore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BookServiceImpl implements BookService {


    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getAll() {
        return bookRepository.findAll();
    }

    @Override
    public Book createBook(BookModel bookModel) {
        Book book = Book.builder()
                .name(bookModel.getName())
                .price(bookModel.getPrice())
                .quantity(bookModel.getQuantity())
                .build();
        return bookRepository.save(book);
    }

    @Override
    public Book getBook(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteBook(Long id) {
        try {
            Book book = bookRepository.findById(id).orElse(null);

            if (Objects.isNull(book)) {
                return "Book not Found";
            }

            bookRepository.deleteById(id);
            return "SUCCESS";
        } catch (Exception ex) {
            return "FAILED";
        }
    }

    @Override
    public Book editBook(Long id, BookModel bookModel) {
        Book book = bookRepository.findById(id).orElse(null);
        if (Objects.isNull(book)) {
            return null;
        }
        book.setName(bookModel.getName());
        book.setPrice(bookModel.getPrice());
        book.setQuantity(bookModel.getQuantity());
        return bookRepository.save(book);
    }


}
