jQuery(function ($) {
    function getPrice() {
        var price = 0;
        var balance = $("#balance1").text();
        $("input.num").each(function () {
            var xj = this.value * $(this).attr("price");
            price += xj;

            $(this).parent().next().find("span").text(xj.toFixed(2));
        });
        $("#balance2").text(price.toFixed(2));
        $("#balance3").text((balance - price).toFixed(2));
    }

    function updBtn(input) {
        // 当前商品单价
        var price = $(input).attr("price");
        // 当前商品的金额
        var curr = price * $(input).val();
        // 总金额
        var total = 0;
        // 账户余额
        var balance = $("#balance1").text();
        // 计算总金额
        $("input.num").each(function () {
            total += this.value * $(this).attr("price");
        });

        // 判断余额是否充足
        if ( balance - total < 0 ) {
            // 其它商品金额
            var other = total - curr;
            // 当前商品最高购买个数
            var max = parseInt((balance - other) / price);
            if (max > $(this).attr("stock")) {
                max = $(this).attr("stock");
            }
            $(input).val(max).next().css("color", "#ccc");

            total = other + max * price;
        }

        $("input.num").each(function () {
            if(this.value == 0) {
                $(this).prev().css("color", "#ccc");
            } else {
                $(this).prev().css("color", "#111");
            }

            if (balance - total < $(this).attr("price") || this.value == $(this).attr("stock")) {
                $(this).next().css("color", "#ccc");
            } else {
                $(this).next().css("color", "#111");
            }
        });

        getPrice();
    }
    updBtn($("input.num")[0]);

    //左边按钮减少
    $("input.minus").click(function () {
        var $num = $(this).next();
        $num.val($num.val() - 1);
        if ($num.val() <= 0) {  //少于等0时,设置为0
            $num.val(0);
        }
        updBtn($(this).next());
    });

    //右边按钮增加
    $("input.plus").click(function () {
        var $num = $(this).prev();
        $num.val(+$num.val() + 1);
        var stock = $num.attr("stock");

        if (+$num.val() > +stock) {
            $num.val(stock);
        }
        updBtn($(this).prev());
    });

    $("input.num").bind("input", function () {
        this.value = this.value.replace(/\D/g, "");
        if (this.value < 0) {
            this.value = 0;
        }
        if (+this.value > $(this).attr("stock")) {
            this.value = $(this).attr("stock");
        }
        if (!this.value) {
            this.value = 0;
        }
        this.value = +this.value;

        updBtn(this);
    });

    // 购买按钮
    $("#confirmBuy").click(function () {
        if (+$("#balance2").text() == 0) {
            $.alert("请选择要购买的商品！", "提示信息");
            return;
        }

        $.confirm("确定购买吗?", function () {
            var arr = [];
            $("input.num").each(function () {
                if (this.value > 0) {
                    arr.push("id=" + $(this).attr("pid"));
                    arr.push("num=" + this.value);
                }
            });
            location.href = "/buy?" + arr.join("&") + "&price=" + $("#balance2").text();
        });
    });
});