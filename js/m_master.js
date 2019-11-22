$(document).ready( function() {
	 slide = new Swiper('.show_slide',{
        mode:'horizontal',
        autoplay: 3000,
        onSlideChangeStart: function(swiper){
    	 	$(".current_img").text(swiper.activeIndex+1+"/");
        	}
		},
		1000);

	 $(".turn_back").click(function(){
		 history.go(-1);
	 });
	 $(".detail_icon_section .each_icon").click(function(){
		 $(".tip_instruction").fadeIn();
	 });
	 $(".tip_instruction").click(function(){
		 $(this).fadeOut();
	 });
	//窗口改变大小触发
	 var img_width = 600,
     img_height = 320;
	 bn_ratio = img_height/img_width;
	 window.onresize = function(){
    	var bn_width = $('.img_slide').width();
    	$('.img_slide').height(bn_width*bn_ratio);
    	slide.reInit();
	 };
	 $(window).resize();

	 $(".more_dec_btn").click(function(){
		 $(".show_more_instruction").fadeIn();
	 });
	 $(".section_wedding_content .service_title_content").eq(0).css("border-top","none");
	 $(".close_more_instruction_icon,.show_more_instruction").click(function(){
		 $(".show_more_instruction").fadeOut();
	 });
	//footer
	 window_h = $(window).height();
	 $(window).scroll(function(){
		  	var mark_h = $(".mark_point").offset().top + $(".mark_point").height();
	    	var scroll_h = $(window).scrollTop();
	    	var win_h = $(window).height();
	    	 if(navigator.userAgent.indexOf('UCBrowser') > -1) {
	    		 win_h = win_h+60;
	    	 }
	    	var marginTop = $(".bottom_section_center").height() - 44;
	    	if( scroll_h >= mark_h-win_h-5 ){
	    		$(".bottom_section_center").css({"position":"relative","bottom":"0px","margin-top": "-" + marginTop +"px"});
	    		$(".bottom_nav_content").css({"position":"relative","bottom":"0px","opacity":"1","z-index":"5"});
	    		$(".mark_point").height(0);
	    	}else{
	    		$(".bottom_section_center").css({"position":"fixed","bottom":"0px","margin-top":"0"});
	    		$(".bottom_nav_content").css({"position":"fixed","bottom":"-200px","opacity":"0","z-index":"0"});
	    		$(".mark_point").height(44);
	    	}
	 });

});

function linkTel(){

}
/*打开地图*/
function openMap(latitude, longitude, name, address) {
	window.location='/m/hotel/map?lat=' + latitude + '&lng=' + longitude + '&title=' + name + '&content=' + address;
}
/*打开评论*/
function openComment() {
	window.location='m_master_comment.html';
}
/*提交订单*/
function submitOrder(){
	window.location = 'm_submit_order.html';
}