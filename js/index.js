/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    var pageNo = 1;
    var paginatorInited;

    initMainTable();

    function initMainTable() {

        $.restApi("rest/htzl/list", {pageNo : pageNo - 1}, function (data) {

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

        if(paginatorInited){
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

                if(pageNo == num){
                    return;
                }

                pageNo = num;
                initMainTable();

            }
        });
    }

    $("#main_table").on("dbclick", "tr", function () {
        alert($(this).text());
    });

    $("#main_table").on("click", "tr .gdsj", function (e) {
        e.preventDefault();
        e.stopPropagation();
        //alert(1);
        //alert($( this ).text());

        bootbox.dialog({
                title: "This is a form in a modal.",
                message: $('#gdzj_form_tmpl').html(),
                //size:"large",
                className: "modal100",
                buttons: {
                    success: {
                        label: "Save",
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
    });


});