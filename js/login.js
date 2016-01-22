/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $("#login-submit").click(function (e) {
        e.preventDefault();
        var form = $("#login-form").serializeObject();
        if(!form.username){
            $.toaster({ priority : 'warning', title : '错误', message : '请输入用户名'});
            return;
        }
        if(!form.password){
            $.toaster({ priority : 'warning', title : '错误', message : '请输入密码'});
            return;
        }

        $.restApi("rest/open/login",{
            userName : form.username,
            passWord : form.password
        }, function(data){
            if(data.success){
                window.location.href = "index.html"
            }else {
                $.toast("登录失败")
            }

        },"POST")


    })


});