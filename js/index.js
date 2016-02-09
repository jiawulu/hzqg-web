/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    var pageNo = 1;
    var paginatorInited;

    initMainTable();

    function initMainTable() {

        var param = {
            pageNo: pageNo - 1,
            cgjqWarnType: $("#warnsearch").val()

        };

        if (0 == param.cgjqWarnType) {
            var formdata = $("#customsearch form").serializeObject();
            if (formdata.startJq) {
                param.startJq = (new Date(formdata.startJq + " 00:00:00")).getTime();
            }
            if (formdata.endJq) {
                param.endJq = (new Date(formdata.endJq + " 23:59:59")).getTime();
            }
            if (formdata.zjcs) {
                param.zjcs = formdata.zjcs;
            }
            if (formdata.cycs) {
                param.cycs = formdata.cycs;
            }
        }
        console.log(param);

        $.restApi("rest/htzl/list", param, function (data) {

            if (data.success) {

                var template = $('#main_table_tmpl').html();
                Mustache.parse(template);   // optional, speeds up future uses
                data.data.wxjq_date = function () {
                    return (new Date(this.wxjq)).formatDate();
                }
                data.data.cgjq_date = function () {
                    return (new Date(this.cgjq)).formatDate();
                }
                data.data.xdrq_date = function () {
                    return (new Date(this.xdrq)).formatDate();
                }
                var rendered = Mustache.render(template, data.data);
                $('#main_table tbody').html(rendered);


                //init pager
                initOrUpdatePaginator(data.data);

            } else {
                $.toast("数据加载失败")
            }

        }, "GET")
    }

    function initOrUpdatePaginator(pager) {

        if (0 == pager.totalPage) {
            $('#table_pager').hide();
            return;
        }
        $('#table_pager').show();

        if (paginatorInited) {
            $('#table_pager').jqPaginator('option', {
                totalPages: pager.totalPage,
                currentPage: pager.pageNo + 1,
            });
            return;
        }

        paginatorInited = true;
        $('#table_pager').jqPaginator({
            totalPages: pager.totalPage,
            visiblePages: 5,
            currentPage: pager.pageNo + 1,

            onPageChange: function (num, type) {

                if (pageNo == num) {
                    return;
                }

                pageNo = num;
                initMainTable();

            }
        });
    }

    $("#warnsearch").on("change", function (e) {

        if (0 == $("#warnsearch").val()) {
            $("#customsearch").show();
        } else {
            $("#customsearch").hide();
            initMainTable();
        }
    })

    $("#customsearch button").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        initMainTable();
    })

    $('.date-picker').datepicker({
        language: 'zh-CN',
        autoclose: true,
        format: "yyyy-mm-dd",
        todayHighlight: true
    })

    $("#toolbar button").on("click", function (e) {
        bootbox.dialog({
                title: "上传合同资料",
                message: $('#htzl_upload_tmpl').html(),
            }
        );
    })

    $("#main_table").on("dblclick","tr",function(e){
        bootbox.dialog({
                title: "跟单数据统计",
                message: $('#gdzj_form_tmpl').html(),
                //size:"large",
                className: "modal90",
                buttons: {
                    success: {
                        label: "提交",
                        className: "btn-success",
                        callback: function () {
                            var name = $('#name').val();
                            var answer = $("input[name='awesomeness']:checked").val()
                            Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");
                        }
                    }
                }
            }
        );
    })

    $("#logout").on("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        function delCookie(name)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval= getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
        function getCookie(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }
        delCookie("sid");
        window.location.href = "login.html"
    })

    $("#regist").on("click",function(e){
        e.preventDefault();
        e.stopPropagation();
        var win = window.open("regist.html", '_blank');
        win.focus();
    })


});