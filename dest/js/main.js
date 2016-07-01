/*********************** new module Name Start **************************************
 *@moduleName:
 *@author:Mad-hu
 *@desc:center.js
 *@time:2016/6/28 16:28
 **/

function a(){
    alert(123);
}
 /*********************** new module Name End **************************************/

/**
 * Created by Administrator on 2016/6/29.
 */

///验证用户名
var checkUserName = function(userName){
    if(!/^1[1-9]\d{9}$/.test(userName)){
        changeCheckCodeMsg('手机格式不正确','#signMsgID');
        return false;
    }else{
        return true;
    }
};
///验证密码
var checkPassword = function(password){
    if(! /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_]+$)[0-9A-Za-z_]{6,16}$/.test(password)){
        changeCheckCodeMsg('密码格式不正确','#signMsgID');
        return false;
    }else{
        return true;
    }
};

//提示信息显示
function changeCheckCodeMsg (msg,id){
    $(id).show();
    $(id + ' span').text(msg);
}

///后台验证用户名称
function checkUserNamePost(userName){
    ///ajax后台验证用户信息
        console.log(userName +  '后台验证');
        var url = 'index.html';
        var params = {'userName':userName};
        $.post(url,params, function(data) {
            var code = data['code'];
            var msgCode = data["message"];
            //请求code为200成功  其他为不成功
            if(code == 200){
                console.log("检查成功");

            }else{
                ///验证失败就替换为错误的X号显示。默认的
                changeCheckCodeMsg(msgCode,'#signMsgID');
            }
        }).error(function(data) {
            ///验证失败就替换为错误的X号显示。默认的
            changeCheckCodeMsg('网络异常','#signMsgID');
        });
}

///检测两次密码是否一致
function checkPasswordTwo(pas1,pas2){
    return (pas1 == pas2) ? true : false;
}

//图形验证码格式
function checkImgCode(code){
    if(code.length != 4){
        return false;
    }else{
        return true;
    }
}




$(function(){
    //提交登录按钮点击
    $('#loginSubmitBtn').click(function(){
        var checkCodeSign = function () {
            var userNameValue = $('#userName').val();
            var passwordValue = $('#password1').val();

            if(userNameValue == ''){
                changeCheckCodeMsg('用户名不能为空','#signMsgID');
                return false;
            }
            if(passwordValue == ''){
                changeCheckCodeMsg('密码不能为空','#signMsgID');
                return false;
            }
            var userCheck = checkUserName(userNameValue);
            var passCheck = checkPassword(passwordValue);

            return userCheck && passCheck?true:false;
        };

        if(checkCodeSign()){
            ///验证通过进行提交，这里采用form的自动提交表单，或者ajax直接验证，然后跳转
            $('#loginFormID').submit();
        }
    });

    //注册 检测用户名
    $('#userName').change(function() {
        if(checkUserName($(this).val())){
            checkUserNamePost($(this).val());
        }
    });


    ///点击注册按钮
    $('#registerSubmitBtn').click(function(){
        var checkCodeSign = function () {
            //用户名字
            var userNameValue = $('#userName').val();
            if(userNameValue == ''){
                changeCheckCodeMsg('用户名不能为空','#signMsgID');
                return false;
            }
            //检查手机格式
            var userCheck = checkUserName(userNameValue);

            //用户密码1
            var passwordValue = $('#password1').val();
            if(passwordValue == ''){
                changeCheckCodeMsg('密码不能为空','#signMsgID');
                return false;
            }
            var passCheck = checkPassword(passwordValue);

            //用户密码2
            var passwordValue2 = $('#password2').val();
            var checkpasswordBool = checkPasswordTwo(passwordValue,passwordValue2);
            if(!checkpasswordBool){
                changeCheckCodeMsg('两次密码不一致','#signMsgID');
                return false;
            }

            //图片验证码
            var checkMsgValue = $('#checkMsgTxtID').val();
            if(!checkImgCode(checkMsgValue)){
                changeCheckCodeMsg('验证码格式不正确','#signMsgID');
                return false;
            }


            return userCheck && passCheck?true:false;
        };

        if(checkCodeSign()){
            ///验证通过进行提交，这里采用form的自动提交表单，或者ajax直接验证，然后跳转
            $('#registerFormID').submit();
        }
    });
});

/**
 * Created by Administrator on 2016/6/26.
 */
//banner2 plain B
$(function(){
    var focusBanner=function(){
        var $focusBanner=$("#focus-banner"),
            $bannerList=$("#focus-banner-list li"),
            $focusHandle=$(".focus-handle"),
            $bannerImg=$(".focus-banner-img"),
            $nextBnt=$("#next-img"),
            $prevBnt=$("#prev-img"),
            $focusBubble=$("#focus-bubble"),
            bannerLength=$bannerList.length,
            _index=0,
            _timer="";

        var _height=472;
        $focusBanner.height(_height);
        $bannerImg.height(_height);

        $(window).resize(function(){
            window.location.reload();
        });

        for(var i=0; i<bannerLength; i++){
            $bannerList.eq(i).css("zIndex",bannerLength-i);
            $focusBubble.append("<li></li>");
        }
        $focusBubble.find("li").eq(0).addClass("current");
        var bubbleLength=$focusBubble.find("li").length;
        $focusBubble.css({
            "width":bubbleLength*22,
            "marginLeft":-bubbleLength*11
        });//初始化

        $focusBubble.on("click","li",function(){
            $(this).addClass("current").siblings().removeClass("current");
            _index=$(this).index();
            changeImg(_index);
        });//点击轮换

        $nextBnt.on("click",function(){
            _index++;
            if(_index>bannerLength-1){
                _index=0;
            }
            changeImg(_index);
        });//下一张

        $prevBnt.on("click",function(){
            _index--;
            if(_index<0){
                _index=bannerLength-1;
            }
            changeImg(_index);
        });//上一张

        function changeImg(_index){
            $bannerList.eq(_index).fadeIn(250);
            $bannerList.eq(_index).siblings().fadeOut(200);
            $focusBubble.find("li").removeClass("current");
            $focusBubble.find("li").eq(_index).addClass("current");
            clearInterval(_timer);
            _timer=setInterval(function(){$nextBnt.click();},5000);
        }//切换主函数
        _timer=setInterval(function(){$nextBnt.click();},5000);
    }();


    ///缩放图片动画
    $('.ci2bbContent').each(function(index,ele){
        $(this).hover(
            function () {
                $('.imgscroll'+ index).animate({
                    position:'relative',
                    left:'-=25',
                    width: '+=50',
                    height: '+=50'
                }, 250, function() {
                    // Animation complete.
                });
            },
            function () {
                $('.imgscroll' + index).animate({
                    left:'+=25',
                    width: '-=50',
                    height: '-=50'
                }, 250, function() {
                    // Animation complete.
                });
            }
        );
    });


    ///转图动画
    $('.moveLeftBox').each(function(index,ele){
        $(this).hover(
            function () {
                $('#moveLeftBox'+ index).animate({
                    left: '+=388',
                }, 250, function() {
                    // Animation complete.
                });
            },
            function () {
                $('#moveLeftBox' + index).animate({
                    left:'+=388',
                }, 250, function() {
                    $('#moveLeftBox' + index).css('left','-388px');
                    // Animation complete.
                });
            }
        );
    });

    ///头部点击切换页面
    $('.headerList').each(function(index,ele){
        $(this).click(function(){
            $(this).addClass('tabberCurrent').siblings().removeClass('tabberCurrent');
        });
    });

    ///浏览器活动然后显示右侧的QQ微信等
    $(window).scroll(function() {
        var scroll_top = $(document).scrollTop();
        if(scroll_top == 0){
            $('#flexQQWXMenu').fadeOut();
        }else{
            $('#flexQQWXMenu').fadeIn();
        }

    });

    //点击返回顶部  返回
    $('#goToTop').click(function(){
        var speed=400;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
    });

});
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

/**
 * Created by Caorh on 2016/6/30.
 */
$(function(){
    linum = $('.mainlist li').length;//ͼƬ����

    w = linum/2 * 407;//ul����

    $('.piclist').css('width', w + 'px');//ul����
    $('.swaplist').html($('.mainlist').html());//��������

    $('.og_next').click(function(){

        if($('.swaplist,.mainlist').is(':animated')){
            $('.swaplist,.mainlist').stop(true,true);
        }
        if($('.mainlist li').length>3){//����3��ͼƬ
            ml = parseInt($('.mainlist').css('left'));//Ĭ��ͼƬulλ��
            sl = parseInt($('.swaplist').css('left'));//����ͼƬulλ��
            if(ml<=0 && ml>w*-1){//Ĭ��ͼƬ��ʾʱ
                $('.swaplist').css({left: '1191px'});//����ͼƬ������ʾ�����Ҳ�
                $('.mainlist').animate({left: ml - 1221+ 'px'},'slow');//Ĭ��ͼƬ����
                if(ml==(w-1221)*-1){//Ĭ��ͼƬ���һ��ʱ
                    $('.swaplist').animate({left: '0px'},'slow');//����ͼƬ����

                }
            }else{//����ͼƬ��ʾʱ
                $('.mainlist').css({left: '1191px'})//Ĭ��ͼƬ������ʾ������
                $('.swaplist').animate({left: sl - 1221+ 'px'},'slow');//����ͼƬ����
                if(sl==(w-1221)*-1){//����ͼƬ���һ��ʱ
                    $('.mainlist').animate({left: '0px'},'slow');//Ĭ��ͼƬ����
                }
            }
        }
    })
    $('.og_prev').click(function(){

        if($('.swaplist,.mainlist').is(':animated')){
            $('.swaplist,.mainlist').stop(true,true);
        }

        if($('.mainlist li').length>3){
            ml = parseInt($('.mainlist').css('left'));
            sl = parseInt($('.swaplist').css('left'));
            if(ml<=0 && ml>w*-1){
                $('.swaplist').css({left: w * -1 + 'px'});
                $('.mainlist').animate({left: ml +1221+ 'px'},'slow');
                if(ml==0){
                    $('.swaplist').animate({left: (w - 1221) * -1 + 'px'},'slow');
                }
            }else{
                $('.mainlist').css({left: (w - 1221) * -1 + 'px'});
                $('.swaplist').animate({left: sl + 1221+ 'px'},'slow');
                if(sl==0){
                    $('.mainlist').animate({left: '0px'},'slow');
                }
            }
        }
    });



});



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



