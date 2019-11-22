//Allen Touch Effect (jquery)
//2015-1-15
//author Allen


$(function(){
    jAllenTouch('.touch');
});
function jAllenTouch(touchclass){ 
    var touchedDOM = $(touchclass);
    touchedDOM.bind('touchstart', function(){
        $(this).addClass('touched');
    });
    touchedDOM.bind('touchend', function(){
        $(this).removeClass('touched');
    });
}



