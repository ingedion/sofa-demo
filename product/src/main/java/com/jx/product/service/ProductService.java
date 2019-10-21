package com.jx.product.service;

import com.jx.product.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> query();

    void updStock(String[] id, String[] num);
}
