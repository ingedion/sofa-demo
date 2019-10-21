package com.jx.product.controller;

import com.alipay.sofa.runtime.api.annotation.SofaReference;
import com.alipay.sofa.runtime.api.annotation.SofaReferenceBinding;
import com.jx.product.model.Product;
import com.jx.product.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller // 当前为控制层
public class ProductController {

    @SofaReference(interfaceType = ProductService.class,
            uniqueId = "${service.unique.id}", binding = @SofaReferenceBinding(bindingType = "bolt"))
    private ProductService productService;

    @RequestMapping("/proList")
    @ResponseBody
    public List<Product> query() {
        return productService.query();
    }
}
