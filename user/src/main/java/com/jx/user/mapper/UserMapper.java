package com.jx.user.mapper;

import com.jx.user.model.User;
import org.apache.ibatis.annotations.*;

import java.math.BigDecimal;


@Mapper
public interface UserMapper {
    //向数据库中插入用户数据
    @Insert("insert into user values(null,#{nickname},#{username},#{password},5000)")
    int register(User user);
    //先检查用户名是否已存在
    @Select("select count(*) from user where username=#{username}")
    int exists(String username);

    @Select("select * from user where username=#{username} and password=#{password}")
    User login(String username , String password);

    @Update("update user set balance=balance-#{price} where id=#{id}")
    void updBalance(int id, BigDecimal price);
}

