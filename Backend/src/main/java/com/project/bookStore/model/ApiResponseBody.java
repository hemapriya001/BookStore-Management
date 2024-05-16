package com.project.bookStore.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApiResponseBody <T> {
    private T data;
    private String message;
}
