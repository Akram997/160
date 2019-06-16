$(function () {
    let ID = $.cookie("id");
    let PD = $.cookie("password");
    let aid = document.cookie.indexOf("id=");
    let apd = document.cookie.indexOf("password=");
    if (aid != -1 && apd != -1) {
        if (ID != "null" && PD != "null") {
            $(".zhanghao").text(ID);
            $(".mima").text("退出");
            $(".zhanghao").click(function () {
                return false;
            })
            $(".mima").attr("href", "http://localhost/exercises/html/mainInterface.html");
            $(".sopa").attr("href", "http://localhost/exercises/html/shopping.html")
        }
    }
    if ($(".mima").text() == "退出") {
        $(".mima").click(function () {
            $.cookie("id", null);
            $.cookie("password", null);
        })
    }
    $.post({
        url: "http://localhost/exercises/php/shopp.json",
        success(data) {
            let num = Object.keys(data).length;
            let zhang = $(".zhanghao").text();
            for (let i = 0; i < num; i++) {
                if (zhang == data[i].zhanghao) {
                    $(".dul").append(`<li class = "lii">
                    <div class="sp">
                        <img src="${data[i].img}" alt="">
                        <a href="" class="wire">${data[i].span}</a>
                    </div>
                    <div class="dj">
                        <p>${data[i].i}</p>
                    </div>
                    <div class="hyj">
                        <p>${data[i].i}</p>
                    </div>
                    <div class="sl">
                        <button class="jians">-</button>
                        <button class="nums">${data[i].nums}</button>
                        <button class="jia">+</button>
                    </div>
                    <div class="xiaoji">
                        <p class = "xj">${parseInt(data[i].nums)*parseInt((data[i].i).slice(1))}</p>
                    </div>
                    <div class="sancu">
                        <p class="del">删除</p>
                    </div>
                </li>`)
                }
            }
            $(".none").css("display", "none");
            $(".main").css("background", "none");
            let arr = [];
            for (let j = 0; j < $(".xj").length; j++) {
                arr.push($($(".xj")[j]).text());
            }
            let he = eval(arr.join("+"));
            $(".zjjg").text(he);
        }
    })
    $("body").on("click", ".jians", function () {
        let num = parseInt($(this).next().text());
        if (num != 1) {
            num = num - 1;
            $(this).next().text(num);
            let dj = parseInt(($(this).parent().prev().prev().children().text()).slice(1));
            $(this).parent().next().text(num * dj);
            let arrs = [];
            for (let i = 0; i < $(".lii").length; i++) {
                arrs.push($($(".lii")[i]).children(".xiaoji").text());
            }
            let he = eval(arrs.join("+"));
            $(".zjjg").text(he);
        }
    })
    $("body").on("click", ".jia", function () {
        let num = parseInt($(this).prev().text());
        num = num + 1;
        $(this).prev().text(num);
        let dj = parseInt(($(this).parent().prev().prev().children().text()).slice(1));
        $(this).parent().next().text(num * dj);
        let arrs = [];
        for (let i = 0; i < $(".lii").length; i++) {
            arrs.push($($(".lii")[i]).children(".xiaoji").text());
        }
        let he = eval(arrs.join("+"));
        $(".zjjg").text(he);
    })
    $("body").on("click", ".del", function () {
        $(this).parent().parent().remove();
        let arr = [];
        for (let j = 0; j < $(".xj").length; j++) {
            arr.push($($(".xj")[j]).text());
        }
        let he = eval(arr.join("+"));
        $(".zjjg").text(he);
        if ($(".lii").length == 0) {
            $(".item").css("display", "none");
            $(".aggregate").css("display", "none");
            $(".jxgw").css("display", "none");
            $(".qjs").css("display", "none");
            $(".none").css("display", "block");
            $(".main").css("background", "url(../images/null_cart@3x.png) no-repeat 350px center");
            $(".main").css("background-size", "400px");
        }
    })
})