$(function () {
    let phone = $("#phone");
    let password = $("#password");
    let a = false;
    let b = false;

    $("#phone").blur(function () {
        if ($(this).val().length == 0) {
            $(".phone").text("手机号码不能为空");
            a = false;
        } else {
            let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test($(this).val())) {
                $(".phone").text("请输入正确手机号码");
                a = false;
            } else {
                $(".phone").text(" ");
                a = true;
            }
        }
    })

    $("#password").blur(function () {
        if ($(this).val().length == 0) {
            $(".password").text("密码不能为空");
            b = false;
        } else {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (!reg.test($(this).val())) {
                $(".password").text("请输入正确密码");
                b = false;
            } else {
                $(".password").text(" ");
                b = true;
            }
        }
    })
    $(".button").click(function () {
        if (a && b) {
            $.post({
                url: "http://localhost/exercises/php/entet.php",
                data: {
                    "phone": $("#phone").val(),
                    "password": $("#password").val()
                },
                success(data) {
                    let ser = data;
                    if (ser == 321) {
                        $("input").val("");
                        alert("对不起该手机号码未注册请重新输入");
                    } else if (ser == 123) {
                        $.cookie("id", $("#phone").val());
                        $.cookie("password", $("#password").val());
                        $("input").val("");
                        alert("登录成功，请点击跳转");
                        window.location.href = "http://localhost/exercises/html/mainInterface.html";
                    } else if (ser == 1234) {
                        $("input").val("");
                        alert("密码错误，请重新输入");
                    }
                }
            })
        } else {
            if (a == false) {
                alert("手机号码格式错误");
            } else if (b == false) {
                alert("密码格式错误");
            }
        }
    })
})