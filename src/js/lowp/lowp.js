// 动态渲染导航栏
var dataArr = [];
var index = 0;
// var loading_pic = $(".loading_pic")
// var centerAll = $(".centerAll")
// 渲染导航栏
$.ajax({
        url: 'http://139.199.192.48:9090/api/getbaicaijiatitle',
        type: 'get',
        success: function(data) {
            $("#ul_list").html(template("nav_li", data));
        }
    })
    //     // 动态渲染商品列表
$.get('http://139.199.192.48:9090/api/getbaicaijiaproduct', { titleid: 0 }, function(data) {
    dataArr = data.result;
    // console.log(data.result);
    var tempData = dataArr.slice(0, 6);
    // console.log(tempData)
    $(".product_list").append(template("shangpin_list", tempData));
    $('#ul_list').children().eq(0).addClass("ractive");
    index++;

    // return
})
window.onscroll = function() {
    console.log($('.loading').offset().top - $('body').height())
        // console.log($('html').scrollTop());
    if ($('html').scrollTop() > 530 * index && index == 1 * index) {
        var tempData = dataArr.slice(6 * index, 6 + index * 6);
        // console.log(tempData)
        $(".product_list").append(template("shangpin_list", tempData));
        index++;

        console.log(index + "</br>" + ".....................................................")

        if (index > 4) {
            console.log(".................99999999999999999999999999999999.......................")
                // loading_pic.style.display = ''none'';
            $(".center_pic").css('display', 'none')
            $(".centerAll").css('display', 'block')

            // centerAll.style.display = 'block';
        }
    }
};


$(document).on('click', '#ul_list>li', function() {
    $('#ul_list').children().removeClass("ractive")
    $(this).addClass("ractive")

    // alert(90)
    // console.log($(this).attr('data-id'));
    $.get('http://139.199.192.48:9090/api/getbaicaijiaproduct', { titleid: $(this).attr('data-id') }, function(data) {
        console.log(data.result);

        $(".product_list").html(template("shangpin_list", data.result));
    })
})



//导航栏的移动
// window.onload = function() { scroll() }
scroll()

function scroll() {
    var ul = document.querySelector("#ul_list")
        // var ul_r = document.querySelector(".nav_right")
    var startX,
        startY,
        moveX,
        moveY
    var sx = 0;
    var sy = 0;
    var springs = 100;
    var maxW = -(ul.offsetWidth - ul.parentNode.offsetWidth);
    var ul_r_w = document.querySelector(".nav_right").offsetWidth
    ul.addEventListener("touchstart", function(e) {
        if (e.targetTouches.length > 1) {
            return
        }
        startX = e.targetTouches[0].clientX;
    })
    ul.addEventListener("touchmove", function(e) {
        var moveX = e.targetTouches[0].clientX;

        var distanceX = moveX - startX + sx;

        if (distanceX > springs) {
            distanceX = springs;
        } else if (distanceX < maxW - springs) {
            // 谁的值越小 谁就越在上面 
            distanceX = maxW - springs;
        }
        ul.style.transform = "translateX(" + distanceX + "px)"
    })
    ul.addEventListener("touchend", function(e) {
        if (e.changedTouches.length > 1) {
            return
        }
        var endX = e.changedTouches[0].clientX;
        sx += endX - startX
        if (sx > 0) {
            sx = 0;
            // 设置ul的位移- 添加过渡
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateX(" + sx + "px)";
        } else if (sx < maxW - ul_r_w) {
            sx = maxW - ul_r_w;
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateX(" + sx + "px)";
        }
    })

}