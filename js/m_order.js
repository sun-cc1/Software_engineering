$(document).ready(function(){
    $(".now_order").click(function(){
        $(this).addClass('on_order').siblings().removeClass('on_order');
        var index = $(this).index();
        $(".now_order_content").eq(index).fadeIn().siblings().fadeOut();
    });
});
function back(){
    history.go(-1);
}
