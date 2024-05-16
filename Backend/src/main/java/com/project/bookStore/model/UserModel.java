package com.project.bookStore.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Email(message = "Invalid Email")
    @NotBlank(message = "Email should not be empty")
    private String email;

    @NotBlank(message = "Username should not be empty")
    private String username;

    @NotBlank(message = "Password should not be empty")
    private String password;

    @Pattern(regexp = "ADMIN|USER", message = "Must be ADMIN or USER")
    @NotBlank(message = "Role should not be empty")
    private String role;

}
