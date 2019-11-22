$(document).ready(function(){

    //记录首次访问的url
    var cookie = getcookie("hunlimao_first_visit_url");
    if(cookie==null || cookie=="") {
        setcookie("hunlimao_first_visit_url", window.location.href);
    }

});

/*cookie*/
function setcookie(name,value){
	var exp  = new Date();
	exp.setTime(exp.getTime() + 99999999 * 60 * 1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString + "; path=/";
}

function getcookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null){
		return (arr[2]);
	}else{
		return "";
	}
}