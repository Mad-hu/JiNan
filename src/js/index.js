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

});