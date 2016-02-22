/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    Date.prototype.formatDate = function () {
        var day = this.getDate();
        var monthIndex = this.getMonth() + 1;
        var year = this.getFullYear();
        return year + "/" + monthIndex + "/" + day;
    }

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
            url: '/' + api,
            data: data,
            error: function (e) {
                console.log(data);
                $.toast('接口请求失败');
            },
            success: function (data) {
                console.log(data);
                if (-1 == data.code) {
                    window.location.href = "login.html"
                } else {
                    callback(data);
                }
            },
            type: method ? method : "GET",
            dataType: 'json'
        });
    }


    $.toast = function (msg) {
        bootbox.alert(msg);
        //$.toaster({priority: 'warning', message: msg});
    }

    $.readCookie = function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

});