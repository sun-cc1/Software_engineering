function pop_box_warn(data){
	var pop = "<div class='warn_pop_box'>"+
			       "<div class='pop_box_content'>"+
				      "<div class='pop_box_dec'>"+data+"</div>"+
				      "<div class='pop_box_sure_btn touch' onclick='pop_box_sure()'>确定</div>"+
			        "</div>"+
		      "</div>";
	$("body").append(pop);
}

function pop_box_sure(){
	$(".warn_pop_box").remove();
}

function pop_box_download(data){
	var pop = "<div class='warn_pop_box'>"+
			       "<div class='pop_box_content'>"+
				      "<div class='pop_box_dec'>"+data+"</div>"+
				      "<div class='pop_box_cancel touch' onclick='pop_box_cancel()'>取消</div>"+
				      "<a  href='/download/app?p=webapp'><div class='pop_box_sure_btn download_link touch'>确定</div></a>"+
			        "</div>"+
		      "</div>";
	$("body").append(pop);
}

function pop_box_cancel(){
	$(".warn_pop_box").remove();
}
function loadjscssfile(filename,filetype){

    if(filetype == "js"){
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src",filename);
    }else if(filetype == "css"){

        var fileref = document.createElement('link');
        fileref.setAttribute("rel","stylesheet");
        fileref.setAttribute("type","text/css");
        fileref.setAttribute("href",filename);
    }
   if(typeof fileref != "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }

}
loadjscssfile("/css/m_warn_pop_box.css","css");