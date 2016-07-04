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
                $($('.ci2bbgItem3Btn')[index]).addClass('ci2bbgItem3BtnCurrent');

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
                $($('.ci2bbgItem3Btn')[index]).removeClass('ci2bbgItem3BtnCurrent');

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

    ///转图背景颜色修改，支持IE
    $('.mlb1').css('opacity','0.6');
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


    ///底部窗口不够高的时候自动在页面下边
    lrFixFooter("div.indexFooter");
    function lrFixFooter(obj){
        var footer = $(obj),doc = $(document);
        function fixFooter(){
            if(doc.height()-4 <= window.screen.availHeight){
                footer.css({
                    width:"100%",
                    position:"absolute",
                    left:0,
                    bottom:0
                });
            }else{
                footer.css({
                    position:"static"
                });
            }
        }
        fixFooter();
        $(window).on('resize.footer', function(){
            fixFooter();
        });
        $(window).on('scroll.footer',function(){
            fixFooter();
        });
    }


});