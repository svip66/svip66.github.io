define(['jquery', 'bootstrap', 'frontend', 'form', 'template', 'clipboard'], function ($, undefined, Frontend, Form, Template, ClipboardJS) {
    // var validatoroptions = {
    //     invalid: function (form, errors) {
    //         $.each(errors, function (i, j) {
    //             Layer.msg(j);
    //         });
    //     }
    // };


    var Controller = {
        index: function () {

            $(function () {
                $("#loading").hide();
            })

            $(document).on("change", "#procategory_id", function () {
                $("#product_id").html("");//替换清空html
                load_product();
                $("#price").val("");
                $("#stock").val("");
                $("#total").html("0");
            });
            $(document).on("change", "#product_id", function () {
                let p_t = $(this).val();
                let n = p_t.indexOf("_");

                $("#price").val(p_t.substring(0, n));
                $("#stock").val(p_t.substring(n + 1, n.length));
                let total = $("#price").val() * $("#payno").val();
                $("#total").html(total);
            });

            function load_product() {
                $("#product_id").prepend("<option value='' style='display: none;' disabled selected>请选择商品</option>");
                for (let i = 0; i < product_list.length; i++) {
                    if (product_list[i].procategory_id == $('#procategory_id option:selected').val())
                        $("#product_id").append("<option value='" + product_list[i].Price_Stock + "'>" + product_list[i].name + "</option>");
                }
            }

            $("#payno").keyup(function () {
                let total = $("#price").val() * $("#payno").val();
                $("#total").html(total);
            });

            // 本地验证未通过时提示 $("#pay").data("validator-options", validatoroptions);
            Form.api.bindevent($("#pay"), function (data, ret) {
            }, function (data, ret) {
            }, function (success, error) {

                
                $('#myModal').modal('show');
                return false;
            });
        },
        paylist: function () {

            $(function () {
                $("#loading").hide();
                new ClipboardJS('#copy_TronLink');
                new ClipboardJS('#copy_Trust');
                new ClipboardJS('#copy_BitKeep');
                new ClipboardJS('#copy_Metamask');
            })

            $(".pay-list-tr").click(function () {
                let from = $(this).attr("v");
                let addtype = $("#addtype").val();
                let self_url = window.location.protocol + "//" + window.location.host;
                let last_url = "";
                if (addtype == "trc20") {
                    last_url = "/index/trc";
                } else {
                    last_url = "/index/erc";
                }
                if (from == "imToken") {
                    location.href = "imtokenv2://navigate?screen=DappView&url=" + self_url + last_url + "?from=imToken&addtype=" + addtype;
                } else if (from == "TokenPocket") {
                    if (addtype == "trc20") {
                        location.href = 'tpdapp://open?params={"url": "' + self_url + last_url + '?from=TokenPocket&addtype=trc20", "chain": "TRX", "source":"xxx"}';
                    } else {
                        location.href = 'tpdapp://open?params={"url": "' + self_url + last_url + '?from=TokenPocket&addtype=erc20", "chain": "ERC", "source":"xxx"}';
                    }

                    // if (addtype == "trc20") {
                    //     window.open('tpdapp://open?params={"url": "'+self_url + last_url+'?from=TokenPocket&addtype=trc20", "chain": "TRX", "source":"xxx"}');
                    // } else {
                    //     window.open('tpdapp://open?params={"url": "'+self_url + last_url+'?from=TokenPocket&addtype=erc20", "chain": "ERC", "source":"xxx"}');
                    // }

                } else {
                    $("#pay_" + from).modal('show');
                    $("#pay_" + from + "_url").val(self_url + last_url + "?from=" + from + "&addtype=" + addtype);
                }

            });

        },

    };
    return Controller;
});
