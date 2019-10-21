package com.jx.product.impl;

import com.alipay.sofa.runtime.api.annotation.SofaService;
import com.alipay.sofa.runtime.api.annotation.SofaServiceBinding;
import com.jx.product.mapper.ProductMapper;
import com.jx.product.model.Product;
import com.jx.product.service.ProductService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

// Alt + Enter键
@Service // 标记当前为服务层
// 将服务发布到注册中心进行统一管理
@SofaService(interfaceType = ProductService.class,
        uniqueId = "${service.unique.id}",
        bindings = { @SofaServiceBinding(bindingType = "bolt") })
public class ProductServiceImpl implements ProductService {
    @Resource
    private ProductMapper productMapper;

    @Override
    public List<Product> query() {
        return productMapper.query();
    }

    @Override
    public void updStock(String[] id, String[] num) {
        for (int i = 0; i < id.length; i++) {
            productMapper.updStock(id[i], num[i]);
        }
    }
}
