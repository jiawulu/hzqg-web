/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };


    $.restApi = function (api, data, callback, method) {
        $.ajax({
            url: 'http://localhost/' + api,
            data: data,
            error: function (e) {
                console.log(data);
                $.toaster({priority: 'warning', title: '错误', message: '接口请求失败'});
            },
            success: function (data) {
                console.log(data);
                if (-1 == data.code) {
                    window.location.href = "http://localhost/login.html"
                }else{
                    callback(data);
                }
            },
            type: method ? method : "GET",
            dataType: 'json'
        });
    }


    $.toast = function(msg){
        $.toaster({priority: 'warning', message: msg});
    }

});