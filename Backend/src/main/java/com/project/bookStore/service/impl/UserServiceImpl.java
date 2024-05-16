package com.project.bookStore.service.impl;

import com.project.bookStore.entity.Role;
import com.project.bookStore.entity.User;
import com.project.bookStore.model.UserLoginModel;
import com.project.bookStore.model.UserModel;
import com.project.bookStore.repository.RoleRepository;
import com.project.bookStore.repository.UserRepository;
import com.project.bookStore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public User addUser(UserModel userModel) {
        User existingUser = userRepository.findByUsernameOrEmail(userModel.getUsername(), userModel.getEmail())
                .orElse(null);

        if (Objects.nonNull(existingUser)){
            return null;
        }

        User user = new User();
        user.setEmail(userModel.getEmail());
        user.setUsername(userModel.getUsername());
        user.setPassword(userModel.getPassword());
        Optional<Role> role = roleRepository.findByName(userModel.getRole());
        if (role.isPresent()){
            user.setRoles(Set.of(role.get()));
        }
        return userRepository.save(user);
    }

    @Override
    public boolean isAdmin(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UsernameNotFoundException("User Not Found"));

        Set<Role> userRoles = user.getRoles();
        for (Role role: userRoles){
            if (role.getName().equalsIgnoreCase("ADMIN")) {
                return true;
            }
        }
        return false;
    }

    @Override
    public User loginUser(UserLoginModel userLoginModel) {
        User user = userRepository.findByEmail(userLoginModel.getEmail())
                .orElseThrow(()-> new UsernameNotFoundException("User Not Found"));

        if (user.getPassword().equals(userLoginModel.getPassword())){
            return user;
        }
        return null;
    }
}
