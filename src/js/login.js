/**
 * Created by Administrator on 2016/6/29.
 */


/*********************** new module Name Start **************************************
 *@moduleName:
 *@author:Mad-hu
 *@desc:formIcon show password click js
 *@time:2016/6/29 12:05
 **/

$(function(){
    $('.formIconFontEye').click(function(){
        var typeText = $(this).siblings('input').attr('type');
        if (typeText == 'password'){
            $(this).siblings('input').attr('type','text');
        }else{
            $(this).siblings('input').attr('type','password');
        }
    });
});

 /*********************** new module Name End **************************************/
