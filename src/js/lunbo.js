/**
 * Created by Caorh on 2016/6/30.
 */
$(function(){
    linum = $('.mainlist li').length;//ͼƬ����

    w = linum/2 * 407;//ul���

    $('.piclist').css('width', w + 'px');//ul���
    $('.swaplist').html($('.mainlist').html());//��������
    $('.og_next').click(function(){
        if($('.swaplist,.mainlist').is(':animated')){
            $('.swaplist,.mainlist').stop(true,true);
        }
        if($('.mainlist li').length>3){//����3��ͼƬ
            ml = parseInt($('.mainlist').css('left'));//Ĭ��ͼƬulλ��
            sl = parseInt($('.swaplist').css('left'));//����ͼƬulλ��
            if(ml<=0 && ml>w*-1){//Ĭ��ͼƬ��ʾʱ
                $('.swaplist').css({left: '1221px'});//����ͼƬ������ʾ�����Ҳ�
                $('.mainlist').animate({left: ml - 1221+ 'px'},'slow');//Ĭ��ͼƬ����
                if(ml==(w-1221)* -1){//Ĭ��ͼƬ���һ��ʱ
                    $('.swaplist').animate({left: '0px'},'slow');//����ͼƬ����
                }
            }else{//����ͼƬ��ʾʱ
                $('.mainlist').css({left: '1221px'})//Ĭ��ͼƬ������ʾ������
                $('.swaplist').animate({left: sl - 1221+ 'px'},'slow');//����ͼƬ����
                if(sl==(w-1221)* -1){//����ͼƬ���һ��ʱ
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


