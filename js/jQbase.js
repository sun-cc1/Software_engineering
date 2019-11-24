// JavaScript Document
//图片滚动 - 1.计时器变量(防止起冲突) 2.外部容器 3.左（上）翻选择器 4.右（下）翻选择器 5.包着列表的选择器 6.间隔时间 7.速度 8.滚动距离（单位为li的个数） 9.自动播放 10.大于这个参数才触发滚动 11.纵向滚动请加‘y’横向不用 12.一排有几个li，为纵向专属，横向不需
function LXC_scroll(timer,wraper,prev,next,img,speed,time,width,or,limit,type,num){ 
	var wraper = $(wraper);
	var prev = $(prev);
	var next = $(next);
	var imgC = $(img);
	var img = $(img).find('ul');
	var w = img.find('li').outerWidth(true);
	w = w * width;
	var s = speed*1000;
	var t = time*1000;
	var Y_scroll = false;
	var li_n = img.find('li').length;
	if(li_n > limit){
		if(type == 'y'){
			Y_scroll = true;
			img.css('width',imgC.width()+'px');
			w = img.find('li').outerHeight(true);
		}
		function prevFunc(){
			if(Y_scroll){
				for( var i = 0; i < num; i++){
					img.find('li:last').prependTo(img);
				}
				img.css({'margin-top':-w});
				img.animate({'margin-top':0},t);
			} else{
				for( var i = 0; i < width; i++){
					img.find('li:last').prependTo(img);
				}
				img.css({'margin-left':-w});
				img.animate({'margin-left':0},t);
			}
		}
		function nextFunc(){
			if(Y_scroll){
				img.animate({'margin-top':-w},t,function(){
				   for( var i = 0; i < num; i++){
					   img.find('li').eq(0).appendTo(img);
				   }
				   img.css({'margin-top':0});
				});
			} else{
				img.animate({'margin-left':-w},t,function(){
				   for( var i = 0; i < width; i++){
					   img.find('li').eq(0).appendTo(img);
				   }
				   img.css({'margin-left':0});
				});
			}
		}
		prev.click(function(){prevFunc();})
		next.click(function(){nextFunc();})
		if (or == true){
			timer = setInterval(function() { nextFunc() },s);
			wraper.hover(function(){clearInterval(timer);},function(){timer = setInterval(function() { nextFunc();},s);});
		}
	}
}

//限制字数
$.fn.limit=function(){
	var self = $("[limit]");
	self.each(function(){
         var objString = $.trim($(this).text());
		 $(this).html(objString);
         var objLength = objString.length;
         var num = $(this).attr("limit");  
         if(objLength > num){
			if($(this)[0].tagName == 'A'){
				$(this).attr("title",objString);
			}
            objString = objString.substring(0,num) + "...";
			$(this).html(objString);  
		 }  
	 })  
}

//加title
$.fn.istitle = function(){
	var self=$("[istitle]");
	self.each(function(){
		var istitle = $(this).attr('istitle');
		if(istitle == '1'){
			$(this).find('a').each(function(){
				$(this).attr('title',$(this).text());
			})
		}
	})
}

//不要最后一个li的边线
function delBorder(ul){
	$(ul).each(function(){
		$(this).find('li').last().css('border','none');
		$(this).find('dl').last().css('border','none');
	})
}

//iframe高度自适应 1.调用的iframe的ID 2.iframe主div(使宽度自适应)
function initHeight(ifrmID,ifrmDIV){
	var ifrm = $('#'+ifrmID);
	var ifrm_ope = $(document.getElementById(ifrmID).contentWindow.document);
	var thisH = ifrm_ope.find('body').outerHeight();
	ifrm.height(thisH);
	if(ifrmDIV && ifrmDIV!=''){
		var thisW = ifrm_ope.find(ifrmDIV).outerWidth();
		ifrm.width(thisW);
	}
}

//弹窗 - 1.打开的类名 2.是否随滚动条移动 3.要打开的div 4.关闭 5.是否onclick 6.浮动框架ID(使高度自适应) 7.iframe主div(使宽度自适应)
var popupStatus = 0; 
function popFrm(openbtn,isFix,showDIV,closebtn,isClick,ifrmID,ifrmDIV){
	var s = 300;
	var openbtn = $(openbtn);          //打开的类名
	var showDIV = $(showDIV);          //要打开的div
	var scw = 0;
	if (!!window.ActiveXObject) {scw = 18};
	function loadPopup(){
		if(popupStatus==0){  
			$(".popFrm").fadeIn(s);  
			$('#popBG').css({'display':'block','height': $(document).height() });
			showDIV.css('display','block');
			showDIV.siblings('div').css('display','none');
			popupStatus = 1;
			if($('#'+ifrmID)[0]){initHeight(ifrmID,ifrmDIV);}	//浮动框架高度自适应
		}
	}
	//将弹出窗口定位在屏幕的中央
	function centerPopup(){    
		var windowWidth = document.documentElement.clientWidth;
		var popupWidth = $(".popFrm").width();
		var ofLeft = (windowWidth - popupWidth)/2;
		var windowHeight = document.documentElement.clientHeight;
		var popupHeight = $(".popFrm").height();
		var ofTop = (windowHeight - popupHeight)/2;
		var scrollTop = document.body.scrollTop;
		var scrollTopForIE = document.documentElement.scrollTop;
		if(isFix){
			if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { ofTop = ofTop + scrollTopForIE;}
			$('.popFrm').addClass('popFrm_fixed');
			$('.popFrm').css({'top':ofTop,'left':ofLeft});
		}else{
			ofTop = ofTop + scrollTop;
			if ($.browser.msie) { ofTop = ofTop + scrollTopForIE; }
			$('.popFrm').removeClass('popFrm_fixed');
			$('.popFrm').css({'top':ofTop,'left':ofLeft});
		}
		$(window).resize(function(){$("#popBG").width($(document).width()-scw)})
	}
	//使用Jquery去除弹窗效果  
	function disablePopup(){    
		if(popupStatus==1){
			$(".popFrm").fadeOut(s);
			$("#popBG").css({'display':'none','height': $(document).height(),'width':$(document).width()-scw });
			showDIV.css('display','none');
			popupStatus = 0;
		}
	}
	
	//是否点击
	if(isClick){
	    loadPopup();
		centerPopup();
	} else{
	    openbtn.live("click",function(){
		    loadPopup();
		    centerPopup();
	    });
	}
	//关闭，本页面和iframe里的选择器执行
	if(closebtn && closebtn!=''){
		$(closebtn).click(function(){disablePopup();});
		if(ifrmID && ifrmID!=''){
			var ifrm_ope = $(document.getElementById(ifrmID).contentWindow.document);
			ifrm_ope.find(closebtn).click(function(){disablePopup();});
		}
	}
	//按下ESC关闭
    $(document).keyup( function(e){if(e.keyCode==27){disablePopup();} });
}

//显隐栏目 - 1.触发选择器 2.对应的要显隐的选择器 3.触发事件（1为点击，2为鼠标滑过，3为无事件）
function SHfrm(tri,ope,func){
	var tri = $(tri);
	var ope = $(ope);
	var func = func; 
	if(tri[0] && ope[0]){
		var tri_label = tri[0].tagName;
		var ope_label = ope[0].tagName;
		function action(){
			tri.addClass('cur');
			tri.siblings(tri_label).removeClass('cur');
			ope.css('display','block');
			ope.siblings(ope_label).css('display','none');
			tri.parent(ope_label).css('display','block');
		}
		if( func == 1){
			tri.click(function(){action();})
		} else if( func == 2){
			tri.hover(function(){action();})
		} else{ return false; }
	}
}

/*时间*/
function show(){
	var date = new Date(); //日期对象
	var day = date.getDay();
	var now = "";
	switch( day ){
		case 0: day = "天";
		break;
		case 1: day = "一";
		break;
		case 2: day = "二";
		break;
		case 3: day = "三";
		break;
		case 4: day = "四";
		break;
		case 5: day = "五";
		break;
		case 6: day = "六";
		break;
	}
	function addZero(string){
		var need = parseInt(string);
		if(need < 10){
			need = "0" + need.toString();
			return need;
		} else{
			return need;
		}
	}
	now = date.getFullYear()+"年"; //读英文就行了
	now = now + (date.getMonth()+1)+"月"; //取月的时候取的是当前月-1如果想取当前月+1就可以了
	now = now + date.getDate()+"日 ";
	now = now + "星期" + day + " ";
	now = now + addZero(date.getHours())+":";
	now = now + addZero(date.getMinutes())+":";
	now = now + addZero(date.getSeconds())+"";
	$('#nowDiv').html(now);
	setTimeout("show()",1000); //设置过1000毫秒就是1秒，调用show方法
}

/*文本框文字显隐 第一个参数是作用选择器，第二个参数是添加的类，可以不加此参数*/
function searchTxt(cla,claName){
	var cla = $(cla);
	var claName = claName;
	var color = $(cla).css('color');
	if(claName == undefined){
		claName = "";
	}
	cla.each(function(){
		var defTxt = $(this).val();
		$(this).bind({
			focus:function(){
				$(this).css('color',color);
				$(this).addClass(claName);
				if($(this).val() == defTxt){
					$(this).val('');
				}
			},
			blur:function(){
				$(this).css('color','#666');
				$(this).removeClass(claName);
				if($(this).val() == ''){
					$(this).css('color',color);
					$(this).val(defTxt);
				}
			}
		})
	})
}

//无缝滚动 - 1.作用的选择器 2.速度 3.方向(left,right,top,bottom) 默认为left,可不加
function Lau_marquee(claName,speed,direct){
	var demo = $(claName);
	var demo1 = $(claName + '1');
	var demo2 = $(claName + '2');
	var s = speed;
	var dir = direct;
	demo2.html(demo1.html());
	function Marquee(){
		var ml = parseInt(demo.css('margin-left'));
		var mt = parseInt(demo.css('margin-top'));
		if(dir == undefined || dir == 'left'){
			if(ml == -demo1.width()) demo.css('margin-left',0); 
			else{ demo.css('margin-left',(ml - 1) + 'px'); }
		} else if(dir == 'right'){
			if(ml == 0){ demo.css('margin-left',-demo1.width()); }
			else{ demo.css('margin-left',(ml + 1) + 'px'); }
		} else if(dir == 'top'){
			if( mt == -demo1.height()){ demo.css('margin-top',0); }
			else{ demo.css('margin-top',(mt - 1) + 'px'); }
		} else if(dir == 'bottom'){
			if( mt == 0){ demo.css('margin-top',-demo1.height()); }
			else{ demo.css('margin-top',(mt + 1) + 'px'); }
		}
	} 
	var MyMar=setInterval(Marquee,speed) 
	demo.hover(
		function(){ clearInterval(MyMar); },
		function(){ MyMar=setInterval(Marquee,speed) }
	)
}

//返回顶部 1.类型 2.是否显示返回首页 3.返回首页的url
function goTop(type,show_index,index_url){
	var txt = txt_1 = "";
	if(type == 1){ txt = '<div id="goTop"><a href="javascript:" id="goTop_a" title="返回顶部"></a></div>'; }
	if(type == 2){
		if(show_index){ txt_1 = '<a href="'+ index_url + '" class="a1" title="返回首页"></a>'; } else txt_1 = "";
		txt = '<div id="goTop">'+ txt_1 + '<a href="javascript:" class="a1 a1_a" id="goTop_a" title="返回顶部"></a></div>';
	}
	$('body').append(txt);
	$('#goTop_a').hide();
	function isTop(){
		var scrTop = $(document).scrollTop();
		if(scrTop != 0){$('#goTop_a').fadeIn(300);}
		else{$('#goTop_a').fadeOut(300);}
	}
	$(window).scroll(function(){ isTop(); })
	$('#goTop_a').click(function(){$('html,body').animate({scrollTop:'0px'}, 500);})
}

//显示翻页和无内容div 1.包含列表的选择器 2.列表标签，如td li dl 3.大于这个数显示翻页 4.翻页的选择器 5.小于等于这个数显示无内容div 6.无内容div的选择器
function SHturns(cla,li_tag,li_max,turn_cla,li_min,empty_cla){
	var num = $(cla).find(li_tag).length;
	if(num>li_max){
		$(cla).find(turn_cla).show();
	} else if(num<=li_min){
		$(cla).find(empty_cla).show();
	}
}

//列表滚动 1.包着ul的div的ID 2.ul的ID 3.一屏几个li 4.是否自动 5.是否含左右箭头 6.序号ID 7.切换时间 8.动画速度
function listScroll(ul_wrapCla,ulCla,li_max,or,is_lr,orderID,s,speed){
	var ul_C = $('#'+ul_wrapCla);
	var ul_act = $('#'+ulCla);
	ul_act.attr('id',ulCla+"_1");
	var w = ul_act.outerWidth(true);
	var li_num = ul_act.find('li').length;
	var ul_num = Math.ceil(li_num / li_max);
	var ul_html = "";
	var order = $('#'+orderID);
	if(s==undefined || s==''){ s = 4000; }
	if(speed==undefined || speed==''){ speed = 500; }
	var a_html = "<a href='javascript:' id = '" + ul_wrapCla + "_a_1" + "' class = 'cur' index = '1'></a>";
	var ul_wrapCla;
	for(var i = 1; i <= ul_num; i++){
		if(i>1){
			ul_html += "<ul class='clearfix' index = '" + i + "' id = '" + ulCla + "_" + i +"'></ul>";
			a_html += "<a href='javascript:' index = '" + i + "' id = '" + ul_wrapCla + "_a_" + i +"'></a>";
		}
	}
	ul_act.after(ul_html);
	order.append(a_html);
	for(var i = 2; i <= ul_num; i++){
		for(var j = (i-1)*li_max; j < i*li_max; j++){
			ul_act.find('li').eq(li_max).appendTo($('#' + ulCla + '_'+ i));
		}
	}
	for(var i = 1; i <= ul_num; i++){
		$('#'+ul_wrapCla+'_a_'+i).click(function(){
			var n = $(this).attr('index');
			ul_C.animate({'margin-left':-(w*(n-1))},speed);
			$(this).addClass('cur').siblings().removeClass('cur');
		})
	}
	function prevScr(){
		var nowCur = order.find('a.cur').attr('index');
		if(nowCur == 1){
			var nx = order.find('a').last();
		} else{
			var nx = order.find('a.cur').prev();
		}
		var n = nx.attr('index');
		ul_C.animate({'margin-left':-(w*(n-1))},speed);
		nx.addClass('cur').siblings().removeClass('cur');
	}
	function nextScr(){
		var nowCur = order.find('a.cur').attr('index');
		if(nowCur == ul_num){
			var nx = order.find('a').first();
		} else{
			var nx = order.find('a.cur').next();
		}
		var n = nx.attr('index');
		ul_C.animate({'margin-left':-(w*(n-1))},speed);
		nx.addClass('cur').siblings().removeClass('cur');
	}
	if(or == true){
		ul_wrapCla = setInterval(function() { nextScr() },s);
		ul_C.hover(function(){clearInterval(ul_wrapCla);},function(){ul_wrapCla = setInterval(function() { nextScr();},s);});
		$('.lr_cont').hover(function(){clearInterval(ul_wrapCla);},function(){ul_wrapCla = setInterval(function() { nextScr();},s);});
	}
	if(is_lr){
		var par = order.parents('.lr_cont');
		var left_cont = par.find('.buttom_left');
		var right_cont = par.find('.buttom_right');
		left_cont.click(function(){ prevScr(); })
		right_cont.click(function(){ nextScr(); })
	}else{
		$('#buttom_left, #buttom_right').hide();
	}
}


$(document).ready(function(){
	$(document.body).limit();  //限制字数
	$(document.body).istitle();  //给标签内部a标签+title
	
	//返回顶部 1.类型 2.是否显示返回首页 3.返回首页的url
	//goTop(2,true,'http://www.ens360.com');
	
	//显隐栏目 - 1.触发选择器 2.对应的要显隐的选择器 3.触发事件（1为点击，2为鼠标滑过，3为无事件）
	//SHfrm('#zt_dtA','#zt_dt',1);
	//SHfrm('#zt_jyA','#zt_jy',1);

	//弹窗 - 1.打开的类名 2.是否随滚动条移动 3.要打开的div 4.关闭 5.是否onclick 6.浮动框架ID(使高度自适应) 7.iframe主div(使宽度自适应)
	//popFrm('.popOn',false,'#human_invite1','#popupContactClose,#closebtn');
	//popFrm('.popOn2',true,'#human_invite2');
	//popFrm('.popOn3',true,'#human_invite3');
	//popFrm('.Ifrm_on',true,'#Ifrm_div','.close1',false,'ifrm_test1','.as');
	
	//图片滚动 - 1.计时器变量(防止起冲突) 2.外部容器 3.左（上）翻选择器 4.右（下）翻选择器 5.包着列表的选择器 6.间隔时间 7.速度 8.滚动距离（单位为li的个数） 9.自动播放 10.大于这个参数才触发滚动 11.纵向滚动请加‘y’横向不用 12.一排有几个li，为纵向专属，横向不需
	//LXC_scroll('timer1','.frmM1','.prev','.next','.frmM1_ul',3,0.5,1,true,2,'y',2);
	
	//时间显示
	show();
	
	//文本框文字显隐
	searchTxt('.input2');
	
	//无缝滚动 - 1.作用的选择器 2.速度 3.方向(left,right,top,bottom) 默认为left,可不加
//	Lau_marquee('.marq',20,'left');
//	Lau_marquee('.marq_1',20,'right');
//	Lau_marquee('.marq_y',20,'bottom');
//	Lau_marquee('.marq_y_1',20,'top');
})