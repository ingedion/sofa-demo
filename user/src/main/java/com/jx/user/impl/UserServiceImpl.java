package com.jx.user.impl;

import com.alipay.sofa.runtime.api.annotation.SofaService;
import com.alipay.sofa.runtime.api.annotation.SofaServiceBinding;
import com.jx.user.mapper.UserMapper;
import com.jx.user.model.User;
import com.jx.user.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;


@Service // 标记当前为服务层
// 将服务发布到注册中心进行统一管理
@SofaService(interfaceType = UserService.class,
        uniqueId = "${service.unique.id}",
        bindings = { @SofaServiceBinding(bindingType = "bolt") })
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public int register(User user){
        if(!exists(user.getUsername())){
            return userMapper.register(user);
        }

        return 0;
    }

    @Override
    public boolean exists(String username){
        return userMapper.exists(username) > 0;
    }

    @Override
    public User login(String username, String password) {
        return userMapper.login(username, password);
    }

    @Override
    public void updBalance(int id, BigDecimal price) {
        userMapper.updBalance(id,price);
    }
}
