package com.jx.product.mapper;

import com.jx.product.model.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

// 访问数据库的，SQL使用注解写在方法上
@Mapper
public interface ProductMapper {
    @Select("select * from product")
    List<Product> query();

    @Update("update product set stock=stock-#{num} where id=#{id}")
    void updStock(String id, String num);


}
