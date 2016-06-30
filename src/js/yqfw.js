/**
 * Created by Administrator on 2016/6/30.
 */
/*********************** new module Name Start **************************************
 *@moduleName:
 *@author:Mad-hu
 *@desc:yuan qu fu wu js
 *@time:2016/6/30 14:22
 **/

 /*********************** new module Name End **************************************/

 $(function(){
     //tab js
    $('.TABTITLES').each(function(index,ele){
        $(this).click(function(){
            $(this).addClass('titleCurrent').siblings().removeClass('titleCurrent');
            $('.tabContent').each(function(indexIn,ele){
                if(index == indexIn) {
                    $(this).fadeIn();
                }else{
                    $(this).hide();
                }
            });
        });
    });


     ///转图动画
     $('.moveBox,.moveBox2').each(function(index,ele){
         var thisWidth= $(ele).width()/2;

         var plusW = '+='+ thisWidth;
         var cutW = '-=' + thisWidth;
         console.log(plusW);

         $(this).hover(

             function () {
                 $(this).animate({
                     left:plusW ,
                 }, 250, function() {
                     // Animation complete.
                 });
             },
             function () {
                 $(this).animate({
                     left:cutW,
                 }, 250, function() {
//                        $('#moveLeftBox' + index).css('left','-'+ thisWidth+'px');
                     // Animation complete.
                 });
             }
         );
     });
});

