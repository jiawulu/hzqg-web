function initDatePicker() {
    $('.date-picker').datepicker({
        language: 'zh-CN',
        autoclose: true,
        format: "yyyy/mm/dd",
        todayHighlight: true
    });
}

function getTime(date) {
    return date ? (new Date(date + " 00:00:00")).getTime() : 0;
}

function getDate(time) {
    return  0 == time ? "" : (new Date(time)).formatDate();
}
/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    var pageNo = 1;
    var paginatorInited;
    var mainListData;

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

                mainListData = data.data.values;

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

                //TODO
                //popGdsj(14)
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

    $("#main_table").on("dblclick", "tr", function (e) {

        //console.log(e);
        var id = $(this).attr("data-id");
        popGdsj(id);

    })

    $("#logout").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        }

        delCookie("sid");
        window.location.href = "login.html"
    })

    $("#regist").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var win = window.open("regist.html", '_blank');
        win.focus();
    })

    function findHtzlBy(id) {
        if (mainListData) {
            for (i = 0; i < mainListData.length; i++) {
                if (mainListData[i]["id"] == id) {
                    return mainListData[i];
                }
            }
        }
        return null;
    }

    function popGdsj(id) {
        var htzl = findHtzlBy(id);
        console.log(htzl);

        htzl.zjs = [];
        htzl.cjs = [];
        htzl.jysj_date = function () {
            return getDate(this.jysj);
        }
        htzl.jdhdsj_date = function () {
            return getDate(this.jdhdsj);
        }
        htzl.zjhdsj_date = function () {
            return getDate(this.zjhdsj);
        }
        htzl.ypqrsj_date = function () {
            return getDate(this.ypqrsj);
        }
        htzl.psdqysj_date = function () {
            return getDate(this.psdqysj);
        }
        htzl.cswcsj_date = function () {
            return getDate(this.cswcsj);
        }

        var template = $('#gdsj_tmpl').html();
        Mustache.parse(template);   // optional, speeds up future uses

        htzl.cgjq_date = function () {
            return (new Date(this.cgjq)).formatDate();
        }
        htzl.xdrq_date = function () {
            return (new Date(this.xdrq)).formatDate();
        }


        var rendered = Mustache.render(template, htzl);
        bootbox.dialog({
                title: "跟单数据统计",
                message: rendered,
                //size:"large",
                className: "modal90",
                buttons: {
                    success: {
                        label: "提交",
                        className: "btn-success",
                        callback: function () {
                            //TODO
                            var formData = $("#htzl_update_form").serializeObject();
                            formData.ypqrsj = getTime(formData.ypqrsj);
                            formData.psdqysj = getTime(formData.psdqysj);
                            formData.cswcsj = getTime(formData.cswcsj);
                            formData.id = htzl.id;
                            formData.zjs = htzl.zjs;
                            formData.cjs = htzl.cjs;

                            htzl.ypqrsj = formData.ypqrsj;
                            htzl.psdqysj = formData.psdqysj;
                            htzl.cswcsj = formData.cswcsj;
                            htzl.csyq = formData.csyq;

                            var param = {json: JSON.stringify(formData)}
                            $.restApi("rest/htzl/save", param, function (data) {
                                if (data.success) {
                                    $.toast("数据保存成功")
                                } else {
                                    $.toast("数据保存失败")
                                }
                            }, "POST");
                        }
                    }
                }
            }
        );
        initDatePicker();

        $("select#csyq")[0].value= htzl.csyq;

        var param = {
            htId: htzl.id
        };
        $.restApi("rest/gdzj/list", param, function (data) {
            if (data.success) {
                htzl.zjs = data.data;
                renderZjTable(htzl);
                $("#addzjbtn").on('click', function (e) {
                    popAddZj(htzl);
                })
            } else {
                $.toast("加载中检数据失败")
            }
        }, "GET");

        $.restApi("rest/cyjy/list", param, function (data) {
            if (data.success) {
                htzl.cjs = data.data;
                renderCjTable(htzl);
                $("#addcjbtn").on('click', function (e) {
                    popAddCj(htzl);
                });
            } else {
                $.toast("加载出检数据失败")
            }
        }, "GET");

    }

    function popAddZj(htzl) {
        var template = $('#gdzj_form_tmpl').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, htzl);
        bootbox.dialog({
                title: "新增中检",
                message: rendered,
                buttons: {
                    success: {
                        label: "保存",
                        className: "btn-success",
                        callback: function () {

                            var data = $("#addzjform").serializeObject();
                            console.log(data);
                            data.jdhdsj = getTime(data.jdhdsj);
                            data.zjhdsj = getTime(data.zjhdsj);

                            htzl.zjs.push(data);

                            renderZjTable(htzl);
                            //this.close();
                        }
                    }
                }
            }
        );

        initDatePicker();

    }

    function popAddCj(htzl) {
        var template = $('#cyjc_form_tmpl').html();
        Mustache.parse(template);   // optional, speeds up future uses
        var rendered = Mustache.render(template, htzl);
        bootbox.dialog({
                title: "新增出检",
                message: rendered,
                buttons: {
                    success: {
                        label: "保存",
                        className: "btn-success",
                        callback: function () {

                            var data = $("#addcjform").serializeObject();
                            console.log(data);
                            data.jysj = getTime(data.jysj);

                            htzl.cjs.push(data);

                            renderCjTable(htzl);
                            //this.close();
                        }
                    }
                }
            }
        );

        initDatePicker();

    }

    function renderZjTable(htzl) {
        var table = $('#gdzj_table_tmpl').html();
        Mustache.parse(table);   // optional, speeds up future uses
        var rendered = Mustache.render(table, htzl);
        $("#gdzj_table tbody").html(rendered);
    }

    function renderCjTable(htzl) {
        var table = $('#cyjc_table_tmpl').html();
        Mustache.parse(table);   // optional, speeds up future uses
        var rendered = Mustache.render(table, htzl);
        $("#cyjy_table tbody").html(rendered);
    }
});