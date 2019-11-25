$(document).ready(function(){
	//lazyload
  	 $("img").lazyload({
  		 		placeholder : "../img/mobile/grey.gif",
				loading:true,
				effectspeed:500,
				effect : "fadeIn"
  	 });
	 $(".turn_back").click(function(){
		 history.go(-1);
	 });
	 $("#filter_back").click(function(){

	 });
	 //footer
	  window_h = $(window).height();
	  var all_h = $(".hotel_list").height()+$(".no_result").height()+$(".list_bottom").height()+$(".filter_footer").height()+$(".bottom_nav_content").height();
	  if(all_h <= window_h){
		  $("#footer_clear_area").hide();
		  $(".filter_footer").css({"position":"fixed","bottom":"150px","margin-top":"0"});
		  $(".bottom_nav_content").css({"position":"fixed","bottom":"0px"});
	  }

	 else{
		 $(window).scroll(function(){
		  	var mark_h = $(".mark_point").offset().top + $(".mark_point").height();
	    	var scroll_h = $(window).scrollTop();
	    	var win_h = $(window).height();
	    	 if(navigator.userAgent.indexOf('UCBrowser') > -1) {
	 	  		 win_h = win_h+60;
	 	  	 }
	    	var marginTop = $("#footer_clear_area").height() + $(".filter_footer").height()-39;
	    	if( scroll_h >= mark_h-win_h-5 ){
	    		$(".filter_footer").css({"position":"relative","bottom":"0px","margin-top": "-" + marginTop +"px"});
	    		$(".bottom_nav_content").css({"position":"relative","bottom":"0px","opacity":"1","z-index":"5"});
	    	}else{
	    		$(".filter_footer").css({"position":"fixed","bottom":"0px","margin-top":"0"});
	    		$(".bottom_nav_content").css({"position":"fixed","bottom":"-200px","opacity":"0","z-index":"0"});
	    	}
	    });
	 }

    //筛选界面
    $('#filter_back').click(function(){
        $('#filter_p').removeClass('active');
        $('#filter_p').fadeOut(250);
        $('.head_nav.filter').removeClass('active');
        $('.fitler_footer_btn').removeClass('active');
        $('.hotel_list').fadeIn(250);
    });
    $('.flt_btn.filter').click(function(){
        $('#filter_p').addClass('active');
        $('#filter_p').fadeIn(250);
        $('.head_nav.filter').addClass('active');
        $('.fitler_footer_btn').addClass('active');
        $('.hotel_list').fadeOut(250);
    });
    //筛选
    $(".filter_content .filter_select").each(function(i,elm){
    	var select_item = $(this).find(".filter_select_item");
    	$(select_item).each(function(){
    		if($(this).hasClass("active")){
    			$(this).parent(".filter_select_list").siblings(".filter_head").find(".filter_select_val").text(($(this).text()));
    		}
    	});
    });
    $("#filter_clear").click(function(){
    	$(".filter_select_val").text("不限");
    	$(".filter_tab").removeClass('active');
    	$(".filter_select_item").removeClass("active");
    });

    //下拉菜单
    $('.filter_head').click(function(){
            var select_block =  $(this).parent();
            if($(select_block).hasClass('active')){
                $(select_block).removeClass('active');
                $(select_block).children('.filter_select_list').slideUp();
            }else{
                $('.filter_select').children('.filter_select_list').slideUp();
                $(select_block).addClass('active').siblings('.filter_select').removeClass('active');
                $(select_block).children('.filter_select_list').slideDown();
            }
    });
    $(".filter_select_item").click(function(){
    	var select_block =  $(this).parent().parent();
    	 $(select_block).removeClass('active');
    	$(this).parent(".filter_select_list").slideUp();
    });
    $('.filter_select_item_district').click(function(){
        if(!$(this).hasClass('active')){
            var select_item = $(this).html();
            $(this).addClass('active').siblings('.filter_select_item_district').removeClass('active');
            $(this).parent().parent().children('.filter_head').children('.filter_select_val_district').html(select_item);
            $('#hotel_district').val(select_item);
        }
    });
    $('.filter_select_item_type').click(function(){
        if(!$(this).hasClass('active')){
            var select_item = $(this).html();
            $(this).addClass('active').siblings('.filter_select_item_type').removeClass('active');
            $(this).parent().parent().children('.filter_head').children('.filter_select_val_type').html(select_item);
            $('#hotel_type').val(select_item);
        }
    });
    $('.filter_select_item_tag').click(function(){
        if(!$(this).hasClass('active')){
            var select_item = $(this).html();
            $(this).addClass('active').siblings('.filter_select_item_tag').removeClass('active');
            $(this).parent().parent().children('.filter_head').children('.filter_select_val_tag').html(select_item);
            $('#hotel_tag').val(select_item);
        }
    });

    //筛选页面刷新
//    var start_Y;
//	var scroll_Y;
//	var filter_content = document.querySelector('.filter_content');
//	filter_content.addEventListener('touchstart', function(e) {
//		e.preventDefault();
//		var touches = e.touches[0];
//		start_Y = touches.pageY;
//		scroll_Y = filter_content.scrollTop;
//	});
//	filter_content.addEventListener('touchmove', function(e) {
//		var touches = e.touches[0];
//		e.preventDefault();
//		var moveY = touches.pageY - start_Y;
//		filter_content.scrollTop = scroll_Y - moveY;
//	});
});


function openHotel(hotelId) {
	window.location = "m_master.html";
}
