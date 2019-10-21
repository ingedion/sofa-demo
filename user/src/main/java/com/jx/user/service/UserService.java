package com.jx.user.service;

import com.jx.user.model.User;

import java.math.BigDecimal;

public interface UserService {
    int register(User user);

    boolean exists(String username);

    User login(String username, String password);

    void updBalance(int id, BigDecimal price);
}
