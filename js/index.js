/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    $.restApi("rest/htzl/list",{}, function(data){

        if(data.success){

            console.log(data);

            //for(var a : data.data.)
            var str = "";

            //for(var i=0;i<data.data.values.length;i++){
            //
            //    var value = data.data.values[i];
            //    console.log(value);
            //
            //    str += ("<tr><td>" + value.id + "</td>" +
            //            "<td>" + value.bmmll + "</td>" +
            //            "<td>"  +  "</td>" +
            //            "<td>" +  "</td></tr>"  );
            //
            //}

            var template = $('#main_table_tmpl').html();
            Mustache.parse(template);   // optional, speeds up future uses
            var rendered = Mustache.render(template, data.data);
            $('#main_table tbody').html(rendered);

            //$("#main_table tbody").html(str);


        }else {
            $.toast("数据加载失败")
        }

    },"GET")

    $("#main_table").on("click", "tr", function() {
        alert($( this ).text());
    });

    $("#main_table").on("click", "tr .gdsj", function(e) {
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


    //http://jqpaginator.keenwon.com/
    $('#table_pager').jqPaginator({
        totalPages: 100,
        visiblePages: 5,
        currentPage: 1,
        onPageChange: function (num, type) {
            $('#text').html('当前第' + num + '页');
        }
    });

    //$(document).ready(function() {
    //    $('#example').DataTable( {
    //        "searching" : false,
    //        "serverSide" : true,
    //        "lengthChange":false,
    //        "pageLength": 10,
    //        "info": false,
    //        "ajax": {
    //            "url": "table.json",
    //            "dataSrc": "",
    //            "columnDefs": [ {
    //                "targets": "salary",
    //                "data": null,
    //                "defaultContent": "<button>Click!</button>"
    //            } ]
    //        },
    //        "columns": [
    //            { "data": "name" },
    //            { "data": "position" },
    //            { "data": "office" },
    //            { "data": "extn" },
    //            { "data": "start_date" },
    //            { "data": "salary" }
    //        ]
    //    } );
    //} );

    $('#upload_btn').click(function (e) {
        e.preventDefault();



        alert(123)
    });
});