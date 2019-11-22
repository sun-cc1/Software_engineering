$(function(){
    //首页banner
    var img_width = 640,
        img_height = 260;
    bn_ratio = img_height/img_width;
    var bn_width = $('.img_slide').width();
    $('.img_slide').height(bn_width*bn_ratio);
    indexBanner = new Swiper('.show_slide',{
         mode:'horizontal',
         autoplay: 3000,
         loop: true
    },1000);

    //选择城市
    $('#city_select').change(function(){
        $(this).val('guangzhou');
    });
    //窗口改变大小触发
    window.onresize=function(){
    	var bn_width = $('.img_slide').width();
    	$('.img_slide').height(bn_width*bn_ratio);
    	indexBanner.reInit();
    };
    $(".app").click(function(){
    	window.location.href = "/download/app?p=webapp";
    });
});
