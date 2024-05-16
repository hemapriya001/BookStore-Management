package com.project.bookStore.utils;

import java.util.List;

public class Constants {

    public final static List<String> ADMIN_URLS = List.of(
            "/api/books/create",
            "/api/books/delete"
    );

    public final static List<String> PUBLIC_URLS = List.of(
            "/api/users/create",
            "/api/users/login",
            "/api/books/all",
            "/swagger-ui",
            "/actuator",
            "/v3/api-docs"
            );
}
