$(function () {

    let a = false;
    let b = false;
    let c = false;
    let d = false;
    let e = false;

    // checkPhone();
    $(".gvc").text(randomCoding());

    function randomCoding() {
        let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        let idvalue = "";
        for (let i = 0; i < 4; i++) {
            idvalue += arr[Math.floor(Math.random() * 62)];
        }
        return idvalue;
    }

    $(".mac").click(function () {
        $.post({
            url: "http://localhost/exercises/php/cpvc.json",
            success(data) {
                let mac = data[Math.floor(Math.random() * 32)];
                alert("验证码为:" + mac);
                $(".none").text(mac);
            }
        })
    });
         
    $("#phone").blur(function () {
        if ($(this).val().length == 0) {
            $(".hint").text("手机号码不能为空");
            a = false;
        } else {
            let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (!reg.test($(this).val())) {
                $(".hint").text("请输入正确手机号码");
                a = false;
            } else {
                $(".hint").text(" ");
                a = true;
            }
        }
    })

    $("#gvc").blur(function () {
        if ($(".gvc").text() == $("#gvc").val()) {
            b = true;
        } else {
            b = false;
        }
    })

    $("#mac").blur(function () {
        if ($(".none").text() == $("#mac").val()) {
            c = true;
        } else {
            c = false;
        }
    })

    $("#password").blur(function () {
        if ($(this).val().length == 0) {
            $(".password").text("密码不能为空");
            d = false;
        } else {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            if (!reg.test($(this).val())) {
                $(".password").text("请输入正确密码");
                d = false;
            } else {
                $(".password").text(" ");
                d = true;
            }
        }
    })

    $("#cpassword").blur(function () {
        if ($(this).val().length == 0) {
            $(".cpassword").text("密码不能为空");
            e = false;
        } else {
            if ($(this).val() == $("#password").val()) {
                $(".cpassword").text(" ");
                e = true;
            } else {
                $(".cpassword").text("重复密码错误");
                e = false;
            }
        }
    })

    $(".button").click(function () {
        if (a && b && c && d && e) {
            $.post({
                url: "http://localhost/exercises/php/enroll.php",
                data: {
                    "phone": $("#phone").val(),
                    "password": $("#password").val()
                },
                success(data) {
                    let ser = data;
                    if (ser == 123) {
                        $("input").val("");
                        alert("对不起该手机号码已被注册请重新输入");
                    } else if (ser == 321) {
                        $("input").val("");
                        alert("注册成功，请点击跳转");
                        window.location.href = "http://localhost/exercises/html/entet.html";
                    }
                }
            })
        } else {
            if (a == false) {
                alert("手机号码错误");
            } else if (b == false) {
                alert("验证码错误");
            } else if (c == false) {
                alert("手机验证码错误");
            } else if (d == false) {
                alert("密码格式错误");
            } else if (e == false) {
                alert("重复密码错误错误");
            }
        }
    })
})