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
    $.post({
        url: "http://localhost/exercises/php/list.json",
        success(data) {
            let res = data[0].left;
            let sss = Object.keys(res);
            let num = Object.keys(res).length;
            for (let i = 0; i < num; i++) {
                $(".BLeft").append(`<li>
                <a href="" class="color">
                    <img src="${res[sss[i]].scr}" alt="">
                    <span>${res[sss[i]].p}</span>
                </a>
                <p>${res[sss[i]].span}<del>${res[sss[i]].del}</del></p>
            </li>`);
            }
        }
    });
    $.post({
        url: "http://localhost/exercises/php/list.json",
        success(data) {
            let res = data[0].right;
            let sss = Object.keys(res);
            let num = Object.keys(res).length;
            for (let i = 0; i < num; i++) {
                $(".BRight").append(`<li>
                <a href=""><img src="${res[sss[i]].yiImg}" alt=""></a>
                <div class="some">
                    <a href=""><img class="onclick one" src="${res[sss[i]].erImg}" alt=""></a>
                    <a href=""><img class="onclick" src="${res[sss[i]].sanImg}" alt=""></a>
                    <a href=""><img class="onclick" src="${res[sss[i]].siImg}" alt=""></a>
                    <a href=""><img class="onclick" src="${res[sss[i]].wuImg}" alt=""></a>
                </div>
                <p>${res[sss[i]].p}</p>
                <a href="" class="wire">${res[sss[i]].a}</a>
                <span>${res[sss[i]].yispan}</span>
                <span></span>
                <span>已售</span>
                <span>${res[sss[i]].erspan}</span>
            </li>`)
                $(".Rbottom").children().children().hover(function () {
                    $(this).siblings().css("border", "1px solid white");
                    $(this).css("border", "1px solid red");
                })
                $(".one").css("border-color", "#888");
                $(".onclick").hover(function () {
                    $(".onclick").css("border-color", "#ccc");
                    $(this).css("border-color", "#888");
                    let par = $(this).parent().parent().prev().children();
                    let simg = $(this).attr('src');
                    $(par).attr("src", simg);
                })
            }
        }
    });
    $(".click").eq(0).css({
        "color": "red",
        "background": "white"
    })
    $(".click").click(function () {
        $(this).parent().siblings().children().css({
            "color": "black",
            "background": "#f7f7f7"
        })
        $(this).css({
            "color": "red",
            "background": "white"
        })
        return false;
    })
    $(".Rbutton").eq(0).css({
        "background": "red",
        "color": "white"
    });
    $(".Rbutton").hover(function () {
        $(this).siblings().css({
            "background": "white",
            "color": "#999"
        });
        $(".Rbutton").eq(0).css({
            "background": "red",
            "color": "white"
        });
        $(this).css({
            "background": "red",
            "color": "white"
        });
    }, function () {
        $(".Rbutton").css({
            "background": "white",
            "color": "#999"
        });
        $(".Rbutton").eq(0).css({
            "background": "red",
            "color": "white"
        });
    })
})