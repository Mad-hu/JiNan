/**
 * Created by Caorh on 2016/6/30.
 */




$(function(){
    $(".zhsh_box_con li  .text_block").hide();
    $(".zhsh_box_con li").hover(function(){
        $(this).find(".text_block").stop().fadeTo(500,0.9)
       $(this).find(".text").stop().animate({left:'0'}, {duration: 500})
    },function(){
        $(this).find(".text_block").stop().fadeTo(500,0)
       $(this).find(".text").stop().animate({left:'318'}, {duration: "fast"})
       $(this).find(".text").animate({left:'-318'}, {duration: 0})
    });
});



