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
