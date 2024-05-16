package com.project.bookStore.controller.impl;

import com.project.bookStore.controller.UserApi;
import com.project.bookStore.entity.User;
import com.project.bookStore.model.ApiResponseBody;
import com.project.bookStore.model.UserLoginModel;
import com.project.bookStore.model.UserModel;
import com.project.bookStore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
public class UserController implements UserApi {

    @Autowired
    UserService userService;

    @Override
    public ResponseEntity<ApiResponseBody<User>> registerUser(UserModel userModel) {
        User createdUser = userService.addUser(userModel);
        String message;
        HttpStatus httpStatus;
        if (Objects.isNull(createdUser)){
            message = "Username/Email already taken";
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        else{
            message = "User created successfully";
            httpStatus = HttpStatus.OK;
        }

        ApiResponseBody<User> responseBody = ApiResponseBody.<User>builder()
                .data(createdUser)
                .message(message)
                .build();

        return new ResponseEntity<>(responseBody, httpStatus);
    }

    @Override
    public ResponseEntity<ApiResponseBody<User>> loginUser(UserLoginModel userLoginModel) {
        User user = userService.loginUser(userLoginModel);
        String message;
        HttpStatus httpStatus;
        if (Objects.isNull(user)){
            message = "Password Mismatch";
            httpStatus = HttpStatus.BAD_REQUEST;
        }
        else{
            message = "User data retrieved successfully";
            httpStatus = HttpStatus.OK;
        }

        ApiResponseBody<User> responseBody = ApiResponseBody.<User>builder()
                .data(user)
                .message(message)
                .build();

        return new ResponseEntity<>(responseBody, httpStatus);
    }
}
