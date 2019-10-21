package com.jx.user.controller;


import com.alipay.sofa.runtime.api.annotation.SofaReference;
import com.alipay.sofa.runtime.api.annotation.SofaReferenceBinding;
import com.jx.product.model.Product;
import com.jx.product.service.ProductService;
import com.jx.user.model.User;
import com.jx.user.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.util.List;

@Controller
public class UserController {
    @SofaReference(interfaceType = UserService.class,
            uniqueId = "${service.unique.id}",
            binding = @SofaReferenceBinding(bindingType = "bolt"))
    private UserService userService;
    //订阅商品服务
    @SofaReference(interfaceType = ProductService.class,
            uniqueId = "${service.unique.id}",
            binding = @SofaReferenceBinding(bindingType = "bolt"))
    private ProductService productService;

    @RequestMapping("/register.html")
    public String regPage(){
        //返回的是页面路径，自动添加配置文件的前缀和后缀
        return "register";
    }

    @RequestMapping("/login.html")
    public String loginPage(){
        return "login";
    }

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public String register(User user, ModelMap mm){
        int result = userService.register(user);
        if (result==0){
            mm.addAttribute("error","用户名已存在！");
            return "register";
        }
        return "redirect:/login.html";
    }
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(HttpSession session, String username, String password, ModelMap mm){
        User user = userService.login(username, password);
        if ( user == null ) {
            mm.addAttribute("error", "用户名或密码错误！");
            return "login";
        }

        // 将用户信息保持到session中，以便后续判断用户是否登录了
        session.setAttribute("loginUser", user);

        // 重新定向到查询商品界面
        return "redirect:/success.html";
    }

    @RequestMapping("/success.html")
    public String success(ModelMap mm) {
        //调用商品服务
        List<Product> pList = productService.query();

        mm.addAttribute("pList",pList);
        return "success";
    }

    @RequestMapping("/buy")
    public String buy(HttpSession session, String[] id, String[] num, BigDecimal price) {
        //从会话中获得当前用户信息
        User user =(User) session.getAttribute("loginUser");

        //在没有登录的情况下session为null
        if( user == null){
            return "redirect:/login.html";
        }


        //更新商品库存信息
        productService.updStock(id, num);

        //更新用户余额
        userService.updBalance(user.getId(),price);

        //更新sesssion中的余额
        user.setBalance( user.getBalance().subtract(price));
        //重新查询商品信息
        return "redirect:/success.html";
    }
}
