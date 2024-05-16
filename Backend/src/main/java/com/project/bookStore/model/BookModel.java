package com.project.bookStore.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookModel {

    @NotBlank(message = "Name must not be empty")
    private String name;

    @NotNull(message = "Price must not be empty")
    private Double price;

    @NotNull(message = "Quantity must not be empty")
    private Integer quantity;
}
