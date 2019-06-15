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

    $(".li").hover(function () {
        $(this).stop().animate({
            paddingLeft: "15px",
        }, 500)
        $("#therrNav").css("visibility", "visible");
    }, function () {
        $(this).stop().animate({
            paddingLeft: "0px"
        }, 500)
        $("#therrNav").css("visibility", "hidden");
    })
    $("#therrNav").hover(function () {
        $("#therrNav").css("visibility", "visible");
    }, function () {
        $("#therrNav").css("visibility", "hidden");
    })
    let $container = $('#therrNav');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.fourNav',
            gutter: 60,
            isAnimated: true,
        });
    });
    let oImg = $(".imggg");
    // 读取图片个数
    let length = $(".ss").length;
    // 设置索引值为0
    let index = 0;
    // 定时器声明
    let timer;
    // 根据图片个数创建小圆点
    for (let i = 0; i < length - 1; i++) {
        $(".focus").append("<span class = 'spanss'></span>");
    }
    let oSpan = $(".spanss");


    // 执行定时器
    go();
    // 当鼠标移入BOX事件
    $(".boxxx").hover(function () {
        // 结束定时器
        clearInterval(timer);
    }, function () {
        // 当鼠标不在盒子在执行定时器
        go();
    })

    // 点击上一张调用上一张方法，并且调用焦点方法
    $(".prev").click(function () {
        left();
    });
    // 点击下一张调用下一张方法，并且调用焦点方法
    $(".next").click(function () {
        right();
    });
    // 给第一个小圆点设置默认的选中样式
    $(oSpan[index]).css("background", "red");
    // 给小圆点设置鼠标移入事件
    oSpan.mouseenter(function () {
        // 除了当前的小圆点其他小圆点的样式设置为背景为白色
        $(this).siblings().css("background", "white");
        // 当前小圆点设置样式背景为橙色
        $(this).css("background", "red");
        // 获取当前鼠标移入的小圆点的索引
        index = $(this).index();
        // 根据索引值设置显示那张图片
        oImg.stop(true).animate({
            "left": -(index * 800) + "px"
        });
    })

    // 下一张方法
    function right() {
        // 调用一次index+1
        index++;
        // 如果index大于等于length值，代表是为最后一张了，就设置到第一张图片，并且重置index的值为1
        if (index >= length) {
            oImg.css("left", 0);
            index = 1;
        }
        // 根据索引值判断这是第几张图称图片的宽度
        oImg.stop(true).animate({
                "left": -(index * 800) + "px"
            }, 2000,
            function () {
                focus();
            });
    }
    // 上一张方法
    function left() {
        // 调用一次index-1
        index--;
        // 如果index小于0，表示到第一张了，要调到最后一张去，并且重新 定义index的值为长度-2
        if (index < 0) {
            oImg.css("left", -((length - 1) * 800) + "px");
            index = length - 2;
        }
        // 根据索引值判断这是第几张图称图片的宽度
        oImg.stop(true).animate({
                "left": -(index * 800) + "px"
            }, 2000,
            function () {
                focus();
            });
    }
    // 焦点获取的方法
    function focus() {
        // 读取当前的left值并且转换为整数
        let left = Math.round(parseFloat(oImg.css("left")));
        // 在除800，就能得到当前是处于哪个index
        let ind = Math.round((left) / -800);
        // 判断如果 ind 为8 代表是重复的第一张，下一张应该为第二张
        if (ind == 8) {
            // 为8，就设置第一个圆点为选中
            $(oSpan[0]).css("background", "red");
            // 并且排他，其他圆点还原默认颜色
            $(oSpan[0]).siblings().css("background", "white");
        }
        // 排他，其他圆点还原默认颜色
        $(oSpan[ind]).siblings().css("background", "white");
        // 根据当前得出的IND值就可以判断当前的图片是那张并且设置对应的圆点为选中
        $(oSpan[ind]).css("background", "red");
    }
    // // 定时器函数
    function go() {
        // 给定时器添加名字，好关闭
        timer = setInterval(function () {
            //开始就调用下一张方法，并且调用焦点方法
            right();
        }, 3000)
    }
    $.post({
        url: "http://localhost/exercises/php/mainInterface.json",
        success(data) {
            let res = data[0].category;
            let sss = Object.keys(res);
            let num = Object.keys(res).length;
            for (let i = 0; i < num; i++) {
                $(".jsonNo1").append(`<li><a href=""><img src="${res[sss[i]].scr}" alt=""></a><p>${res[sss[i]].p}</p><span>${res[sss[i]].span}</span><del>${res[sss[i]].del}</del></li>`);
            }
        }
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
    $.post({
        url: "http://localhost/exercises/php/mainInterface.json",
        success(data) {
            let res = data[0].recommendation;
            let sss = Object.keys(res);
            let num = Object.keys(res).length;
            for (let i = 0; i < num; i++) {
                $(".jsonNo2").append(`<li><a href=""><img src="${res[sss[i]]}" alt=""></a></li>`);
            }
        }
    })

    $.post({
        url: "http://localhost/exercises/php/mainInterface.json",
        success(data) {
            let res = data[0].specialistMedication;
            $(".boxss").append(`<div class="top"><span>${res.one.name}</span>
                    <div class="destro">
                        <span>${res.one.re}</span>
                        <span>${res.one.ka}</span>
                        <a href="" class="wire">${res.one.kaone}</a>
                        <a href="" class="wire">${res.one.katow}</a>
                    </div>
                </div>
                <div class="bottom">
                    <div class="Bon1">
                        <ul>
                            <li><a href="" class="red">${res.one.Bnoe}</a></li>
                            <li><a href="" class="red">${res.one.Btow}</a></li>
                            <li><a href="" class="red">${res.one.Btherr}</a></li>
                            <li><a href="" class="red">${res.one.Bfour}</a></li>
                            <li><a href="" class="red">${res.one.Bfive}</a></li>
                            <li><a href="" class="red">${res.one.Bsix}</a></li>
                        </ul>
                        <a href="" class="blowUp"><img src="${res.one.imgone}" alt=""></a>
                        <p>${res.one.pone}</p>
                        <ul>
                            <li><a href="" class="ccc">${res.one.aone}</a></li>
                            <li><a href="" class="ccc">${res.one.atow}</a></li>
                            <li><a href="" class="ccc">${res.one.atherr}</a></li>
                        </ul>
                    </div>
                    <div class="Bon2">
                        <div id="carousel1" class="carousel-content">
                            <ul class="carousel">
                                <li><img src="${res.one.imgtow}"></li>
                                <li><img src="${res.one.imgtherr}"></li>
                                <li><img src="${res.one.imgfour}"></li>
                                <li><img src="${res.one.imgfive}"></li>
                                <li><img src="${res.one.imgsix}"></li>
                            </ul>
                            <ul class="carousel-index"></ul>
                            <div class="carousel-prev"><img src="${res.one.imgseven}"></div>
                            <div class="carousel-next"><img src="${res.one.imgba}"></div>
                        </div>
                    </div>
                    <div class="Bon3">
                        <ul>
                            <li>
                                <a href=""><img src="${res.one.imgjiu}" alt=""></a>
                                <a href="" class="wire">${res.one.asi}</a>
                                <span>${res.one.spanyi}</span>
                            </li>
                            <li>
                                <a href=""><img src="${res.one.imgsi}" alt=""></a>
                                <a href="" class="wire">${res.one.awu}</a>
                                <span>${res.one.spaner}</span>
                            </li>
                            <li>
                                <a href=""><img src="${res.one.imgsy}" alt=""></a>
                                <a href="" class="wire">${res.one.aliu}</a>
                                <span>${res.one.spansan}</span>
                            </li>
                            <li>
                                <a href=""><img src="${res.one.imgse}" alt=""></a>
                                <a href="" class="wire">${res.one.aqi}</a>
                                <span>${res.one.spansi}</span>
                            </li>
                            <li>
                                <a href=""><img src="${res.one.imgss}" alt=""></a>
                                <a href="" class="wire">${res.one.aba}</a>
                                <span>${res.one.spanwu}</span>
                            </li>
                            <li>
                                <a href=""><img src="${res.one.imgssi}" alt=""></a>
                                <a href="" class="wire">${res.one.ajiu}</a>
                                <span>${res.one.spanliu}</span>
                            </li>
                        </ul>
                    </div>`);
            $('#carousel1').carousel({
                el: {
                    imgsContainer: '.carousel', // 图片容器
                    prevBtn: '.carousel-prev', // 上翻按钮
                    nextBtn: '.carousel-next', // 下翻按钮
                    indexContainer: '.carousel-index', // 下标容器
                },
                conf: {
                    auto: true, //是否自动播放 true/false 默认:true
                    needIndexNum: true, //是否需要下标数字 true/false 默认:true
                    animateTiming: 1000, //动画时长(毫秒) 默认:1000
                    autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
                    direction: 'right', //自动播放方向 left/right 默认:right
                }
            });
        }
    })
    $('#carousel1').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel2').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel3').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel4').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel5').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel6').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel7').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel8').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });
    $('#carousel9').carousel({
        el: {
            imgsContainer: '.carousel', // 图片容器
            prevBtn: '.carousel-prev', // 上翻按钮
            nextBtn: '.carousel-next', // 下翻按钮
            indexContainer: '.carousel-index', // 下标容器
        },
        conf: {
            auto: true, //是否自动播放 true/false 默认:true
            needIndexNum: true, //是否需要下标数字 true/false 默认:true
            animateTiming: 1000, //动画时长(毫秒) 默认:1000
            autoTiming: 3000, //自动播放间隔时间(毫秒) 默认:3000
            direction: 'right', //自动播放方向 left/right 默认:right
        }
    });



})