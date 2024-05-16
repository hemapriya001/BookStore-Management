package com.project.bookStore.controller;

import com.project.bookStore.entity.User;
import com.project.bookStore.model.ApiResponseBody;
import com.project.bookStore.model.UserLoginModel;
import com.project.bookStore.model.UserModel;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/api/users")
public interface UserApi {

    @PostMapping("/create")
    ResponseEntity<ApiResponseBody<User>> registerUser(@Valid @RequestBody UserModel userModel);

    @PostMapping("/login")
    ResponseEntity<ApiResponseBody<User>> loginUser(@Valid @RequestBody UserLoginModel userLoginModel);
}
