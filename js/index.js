/**
 * Created by wuzhong on 16/1/22.
 */
$(function () {

    $.restApi("rest/htzl/list",{}, function(data){

        if(data.success){

            console.log(data);

            //for(var a : data.data.)
            var str = "";

            for(var i=0;i<data.data.values.length;i++){

                var value = data.data.values[i];
                console.log(value);

                str += ("<tr><td>" + value.id + "</td>" +
                        "<td>" + value.bmmll + "</td>" +
                        "<td>"  +  "</td>" +
                        "<td>" +  "</td></tr>"  );

            }

            $("#main_table tbody").html(str);


        }else {
            $.toast("数据加载失败")
        }

    },"GET")

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