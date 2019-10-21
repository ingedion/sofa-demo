/**
 * Basic Usages:
 * $.alert("内容", "标题");
 */
(function($) {
    var zIndex = 9999;

    $.dialogBg = function() {
        // 添加遮罩层
        $("<div dialog />").css({
            position: "absolute",
            left: 0,
            top: 0,
            width: $(document).outerWidth(),
            height: $(document).outerHeight(),
            background: "#000",
            opacity: 0.3,
            zIndex: zIndex++
        }).appendTo("body");
    };

    $.alert = function(msg, title) {
        window.blocking = true; // 窗口阻塞中，点击任意按钮解除阻塞
        $.dialogBg();
        var alertid = "alert_" + new Date().getTime();
        $("<div dialog='alert' />")
            .attr("id", alertid)
            .css({
                position: "fixed",
                width: 400,
                left: "50%",
                top: "50%",
                marginLeft: -200,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: zIndex++
            }).appendTo("body");

        $("<div />").css({
            backgroundColor: "#fff",
            margin:8
        })
        // 标题信息
        .append($("<div />", {
            text: title || "提示信息",
            css: {
                lineHeight: "30px",
                padding:10,
                fontSize: 18,
                fontWeight: "bold"
            }
        }))
        // 提示信息
        .append($("<div/>", {
            text: msg,
            css: {
                lineHeight: "30px",
                padding: 10,
                fontSize: 16
            }
        }))
        // 确定按钮、关闭按钮
        .append($("<div />")
            .css({
                padding:10,
                textAlign: "right"
            })
            .append($("<div />", {
                text: "确定",
                css: {
                    lineHeight: "30px",
                    display: "inline-block",
                    padding: "5px 20px",
                    color: "#fff",
                    cursor: "pointer",
                    backgroundColor: "#F26231",
                    borderRadius: 3
                },
                click: function() {
                    $.closeDialog();
                    window.blocking = undefined;
                }
            })))
        .appendTo("#" + alertid)
        ;

        $("#" + alertid).css("marginTop", function() {
            return parseInt($(this).outerHeight()) / -2;
        });
    };

    $.confirm = function(msg, callback) {
        window.blocking = true; // 窗口阻塞中，点击任意按钮解除阻塞
        $.dialogBg();

        var alertid = "alert_" + new Date().getTime();
        $("<div dialog='alert' />")
            .attr("id", alertid)
            .css({
                position: "fixed",
                width: 400,
                left: "50%",
                top: "50%",
                marginLeft: -200,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: zIndex++
            }).appendTo("body");

        $("<div />").css({
            backgroundColor: "#fff",
            margin:8
        })
        // 标题信息
        .append($("<div />", {
            text: "操作确认",
            css: {
                lineHeight: "30px",
                padding:10,
                fontSize: 18,
                fontWeight: "bold"
            }
        }))
        // 提示信息
        .append($("<div/>", {
            text: msg,
            css: {
                lineHeight: "30px",
                padding: 10,
                fontSize: 16
            }
        }))
        // 确定按钮、关闭按钮
        .append($("<div />")
            .css({
                padding:10,
                textAlign: "right"
            })
            .append($("<div />", {
                text: "确定",
                css: {
                    lineHeight: "30px",
                    display: "inline-block",
                    padding: "5px 20px",
                    color: "#fff",
                    cursor: "pointer",
                    backgroundColor: "#FF4D00",
                    borderRadius: 3
                },
                click: function() {
                    $.closeDialog();
                    if ( window.preventbeforeclose === true ) {
                        $.closeDialog();
                    }
                    window.blocking = undefined;
                    window.preventbeforeclose = undefined;
                    if ( typeof callback === "function" ) {
                        callback();
                    }
                }
            }))
            .append($("<div />", {
                text: "取消",
                css: {
                    lineHeight: "30px",
                    display: "inline-block",
                    padding: "5px 20px",
                    marginLeft: 20,
                    color: "#fff",
                    cursor: "pointer",
                    backgroundColor: "#B3B3B3",
                    borderRadius: 3
                },
                click: function() {
                    window.blocking = undefined;
                    $.closeDialog();
                }
            })))
        .appendTo("#" + alertid)
        ;

        $("#" + alertid).css("marginTop", function() {
            return parseInt($(this).outerHeight()) / -2;
        });
    };

    $.closeDialog = function() {
        var $dialogs = $("div[dialog]");
        $dialogs.eq(-1).remove();
        $dialogs.eq(-2).remove();
    };
})(jQuery);