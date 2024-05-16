package com.project.bookStore.service;

import com.project.bookStore.entity.User;
import com.project.bookStore.model.UserLoginModel;
import com.project.bookStore.model.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    User addUser(UserModel userModel);

    boolean isAdmin(Long userId);

    User loginUser(UserLoginModel userLoginModel);
}
