jQuery(function ($) {
    $("#regForm").submit(function (e) {
        var $password = $("#password");
        var $repassword = $("#repassword");
        if ($password.val() != $repassword.val()) {
            $.alert("两次密码输入不一致！", "提示信息");
            $password.val("");
            $repassword.val("");
            return false;
        }
        return true;
    });

    $("#submitBtn").click(function () {
        $(".error").html("");
    });
});