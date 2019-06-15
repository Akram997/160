$(function () {
    let ID = $.cookie("id");
    let PD = $.cookie("password");
    if (ID != "null" && PD != "null") {
        $(".zhanghao").text(ID);
        $(".mima").text("退出");
        $(".zhanghao").click(function () {
            return false;
        })
        $(".mima").attr("href", "http://localhost/exercises/html/mainInterface.html");
        $(".sopa").attr("href", "http://localhost/exercises/html/shopping.html")
    }
    if ($(".mima").text() == "退出") {
        $(".mima").click(function () {
            $.cookie("id", null);
            $.cookie("password", null);
        })
    }
    $(".hover").eq(0).css("border-color", "red");
    $(".hover").hover(function () {
        $(this).siblings().css("border-color", "#ddd");
        $(this).css("border-color", "red");
        let par = $(this).parent().prev();
        let simg = $(this).attr('src');
        $(par).attr("src", simg);
    })
    let num = 1;
    $(".jia").click(function () {
        num = num + 1;
        $(".nums").text(num);
    })
    $(".jian").click(function () {
        num = num - 1;
        $(".nums").text(num);
    })
    $(".ajax").click(function () {
        if (ID != "null" && PD != "null") {
            $.post({
                url: "http://localhost/exercises/php/shopp.php",
                data: {
                    "img": $(".Bimg").attr("src"),
                    "span": $(".aspan").text(),
                    "i": $(".ai").text(),
                    "nums": $(".nums").text(),
                    "zhanghao": $(".zhanghao").text()
                }
            })
        }
        alert("请登录");
        return false;
    })
    if (ID != "null" && PD != "null") {
        $.post({
            url: "http://localhost/exercises/php/shopp.json",
            success(data) {
                let num = Object.keys(data).length;
                let j = 0;
                for (let i = 0; i < num; i++) {
                    if (data[i].zhanghao == 13249170088) {
                        j++;
                    }
                }
                $(".sliang").text(`(${j})`)
            }
        })
    }
})