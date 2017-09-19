var dataArr2 = [];
var index = 0;
$.ajax({
    url: 'http://139.199.192.48:9090/api/getinlanddiscount',
    type: 'get',
    // data: { productId: 4 },
    success: function(data) {
        dataArr2 = data.result;
        // console.log(data.result);
        var tempData = dataArr2.slice(0, 6);
        $(".product_list").append(template("product_list", tempData))
    }
})


window.onscroll = function() {
    console.log('.........................sddfhgfgjdjsdgfhfxsgd......................................')
    console.log($('.loading').offset().top - $('body').height())
        // console.log($('html').scrollTop());
    if ($('html').scrollTop() > 530 * index && index == 1 * index) {
        var tempData = dataArr2.slice(6 * index, 6 + index * 6);
        // console.log(tempData)
        $(".product_list").append(template("product_list", tempData))
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