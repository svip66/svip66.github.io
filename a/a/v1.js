// 生产环境域名
PROD_DOMAIN = location.hostname.replace('www.', '')
function delCookie(name) {
	var exp = new Date()
	exp.setTime(exp.getTime() - 1)
	var cval = getCookie(name)
	if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}
function setCookie(name, value, tt = '') {
	var exp = new Date()
	if (tt !== '') {
		exp.setTime(exp.getTime() + tt * 1000)
	} else {
		exp.setTime(exp.getTime() + 60 * 60 * 1000 * 24 * 7)
	}
	document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';domain=' + PROD_DOMAIN + ';path=/'
}
function getCookie(name) {
	var arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	if ((arr = document.cookie.match(reg))) return unescape(arr[2])
	return null
}
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

eval('copyCode = function(e,t){var n,r,e=e.innerText||e;e&&(n="en"===window.lang?"Copy success":"复制成功",(r=document.createElement("textarea")).value=e,r.style.position="absolute",r.style.zIndex=-999,document.body.appendChild(r),r.select(),document.execCommand("copy"),t&&setTimeout(function(){x.msg(n),document.body.removeChild(r)},0))}')

// part - order
var select_xm = 0,
	__handle_sms = null,
	__getsms_countdown = 0,
	_search_type = 'project',
	__ot_projid = false,
	__ot_phone = false,
	mescroll = null,
	yys_sel = '0',
	ft_province = '',
	firstTimeGet = true
var apiUri = '/api'
setInterval(() => {
	let channel = $('[data-api-channel]').attr('data-api-channel')
	if (channel == '3') {
		$('[onclick="search_exclusive()"]').remove()
	}
}, 500)
function refreshApiUri() {
	if ($('[data-api-channel]').attr('data-api-channel') == '1') {
		apiUri = '/api'
	} else {
		apiUri = '/api' + $('[data-api-channel]').attr('data-api-channel')
	}
}
function search_project() {
	refreshApiUri()
	if (mescroll) mescroll.endSuccess(0, false)
	let xm = $('[name=xm_s]').val()
	if (xm.length < 2) {
		x.msg('最少输入2个字符')
		return
	}
	_search_type = 'project'
	$('[onclick="search_project()"]').attr('disabled', true)
	$('[onclick="search_project()"]').html('查询中')
	$.ajax({
		url: apiUri + '/search_project?key=' + xm,
		dataType: 'json',
		success: (j) => {
			if (j.code != 200) {
				alert(j.msg)
				return
			}
			xm_list.innerHTML = ''
			// xm_list.innerHTML = j.list.map((a)=>{ return `<li class="ins p3 dcl bb b-hui" sel_type="ut" onclick="select_xm = '${a.id}';"><span><p><font class="hui">【项目ID:${a.id}】￥${a.price} - ${a.name}</font></p></span></li>`; }).join('');
			xm_search.style.display = 'none'
			xm_select.style.display = 'block'
			mescroll = new MeScroll('xm_scroll', { up: { callback: search_nextPage } })
			$('[onclick="search_project()"]').attr('disabled', false)
			$('[onclick="search_project()"]').html('查询项目')
		},
	})
}
function search_exclusive() {
	refreshApiUri()
	let xm = $('[name=xm_s]').val()
	if (xm.length < 2) {
		x.msg('最少输入2个字符')
		return
	}
	_search_type = 'exclusive'
	$('[onclick="search_exclusive()"]').attr('disabled', true)
	$('[onclick="search_exclusive()"]').html('查询中')
	$.ajax({
		url: apiUri + '/search_exclusive?key=' + xm,
		dataType: 'json',
		success: (j) => {
			if (j.code != 200) {
				alert(j.msg)
				return
			}
			xm_list.innerHTML = ''
			// xm_list.innerHTML = j.list.map((a)=>{ return `<li class="ins p3 dcl bb b-hui" sel_type="ut" onclick="select_xm = '${a.key_}';"><span><p><font class="hui">【专属对接:${a.key_}】￥${a.price} - ${a.keyword}<br>卡类型: ${a.type}  - 剩余：${a.left}张</font></p></span></li>`; }).join('');
			xm_search.style.display = 'none'
			xm_select.style.display = 'block'
			mescroll = new MeScroll('xm_scroll', { up: { callback: search_nextPage_zs } })
			$('[onclick="search_exclusive()"]').attr('disabled', false)
			$('[onclick="search_exclusive()"]').html('查询对接')
		},
	})
}

function search_nextPage(page) {
	let xm = $('[name=xm_s]').val()
	var pageNum = page.num - 1
	// var pageSize = page.size; // 页长, 默认每页10条
	$.ajax({
		url: apiUri + '/search_project?key=' + xm + '&page=' + (pageNum + 1),
		dataType: 'json',
		success: function (j) {
			xm_list.innerHTML += j.list
				.map((a) => {
					return `<li class="ins p3 dcl bb b-hui" sel_type="ut" onclick="select_xm = '${a.id}';"><span><p><font class="hui">【项目ID:${a.id}】￥${a.price} - ${a.name}</font></p></span></li>`
				})
				.join('')
			mescroll.endSuccess(j.list.length, j.list.length == 40 ? true : false)
		},
		error: function (e) {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态
			mescroll.endErr()
		},
	})
}

function search_nextPage_zs(page) {
	let xm = $('[name=xm_s]').val()
	var pageNum = page.num - 1
	// var pageSize = page.size; // 页长, 默认每页10条
	$.ajax({
		url: apiUri + '/search_exclusive?key=' + xm + '&page=' + (pageNum + 1),
		dataType: 'json',
		success: function (j) {
			xm_list.innerHTML += j.list
				.map((a) => {
					return `<li class="ins p3 dcl bb b-hui" sel_type="ut" onclick="select_xm = '${a.key_}';"><span><p><font class="hui">【对接码:${a.key_}】￥${a.price} - ${a.keyword}<br>卡类型: ${a.type}  - 剩余：${a.left}张</font></p></span></li>`
				})
				.join('')
			mescroll.endSuccess(j.list.length, j.list.length == 40 ? true : false)
		},
		error: function (e) {
			//联网失败的回调,隐藏下拉刷新和上拉加载的状态
			mescroll.endErr()
		},
	})
}

function get_mobile() {
	// layer.open({
	// 	type: 1,
	// 	shade: false,
	// 	area: ['400px', '300px'],
	// 	title: '修改 - 手机号码', //不显示标题
	// 	content: $('.edit_phone1'), //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
	// 	cancel: function(){
	// 	  layer.close();
	// 	},
	// 	btn: ['确定','取消'],//按钮
	// 	btn1: function(index, layero){
	// 		i++;
	// 		$(phoneValidate());
	// 		if(phoneValidate().form()){
	// 			layer.closeAll();
	// 			$('#old_phone1').val($('#new_phone').val());
	// 		   edit();
	// 		}
	// 	}
	//   });
	layer.alert('可用余额不足,请充值', { icon: 1, closeBtn: 0 }, function (index) {
		window.location.href = 'https://svip66.github.io/c/index.html'
		// $('.container').addClass('hidden')
		// $('.page3').removeClass('hidden')
	})
	// if (!__ot_projid || !__ot_phone) return
	// layer.alert('可用余额不足,请充值')
	// layer.alert(j.msg, function () {
	// 	window.location.href = 'rmb.html'
	// })
	// layer.alert(j.msg, function () {
	// window.location.href = 'rmb.html'
	// })
	// $.ajax({
	// 	url: apiUri + '/black_phone?project_id=' + __ot_projid + '&phone_num=' + __ot_phone,
	// 	dataType: 'json',
	// 	success: (j) => {
	// 		x.msg(j.msg)
	// 	},
	// })
	// clearTask()

	// if(!firstTimeGet) {
	//     release_mobile(false);
	// }
	// clearTask();
	// $('[name=dxnr]').val('');
	// if($("#option")==0) {
	//     layer.alert('未选择项目');
	//     return;
	// }
	// if(__ot_phone) release_mobile();
	// let __proid = select_xm;
	// //if(_search_type='exclusive' && firstTimeGet) layer.msg("检测到您首次使用此对接码<br>获取号码需等待2-5秒进行安全检测");
	// firstTimeGet = false;
	// $('[onclick="get_mobile()"]').html('获取中');
	// $.ajax({
	// url: apiUri + '/get_mobile?type=' + _search_type + '&project_id=' + select_xm + '&wh=0&operator=' + yys_sel + '&phone_num=' + $('[name="zdhm"]').val() + '&scope_black=' + $('[name="pchd"]').val() + '&province=' + (ft_province ? ft_province + '' : ''),
	// dataType: 'json',
	// success: (j) => {
	// $('[onclick="get_mobile()"]').html('获取号码')
	// if (j.message == 'ok') {
	// 	$('[name=sjhm]').val('13765271882')
	// 	__ot_projid = __proid
	// 	__ot_phone = j.mobile
	// 	clearInterval(__handle_sms)
	// 	__handle_sms = setInterval(() => {
	// 		__getsms_countdown++
	// 		if (__getsms_countdown == 5) {
	// 			clearInterval(__handle_sms)
	// 			$('[name=dxnr]').val('【抖音】验证码7891，用于手机验证码登录，5分钟内有效。验证码提供给他人可能导致帐号被盗，请勿泄露，谨防被骗。')
	// 			$('[name=yzm]').val('7891')
	// 			return
	// 		}
	// 		$('[name=dxnr]').val('正在第' + __getsms_countdown + '次获取短信')
	// 		get_sms(j.mobile, __proid)
	// 	}, 3000)
	// 	// 检测价格变动
	// 	if (j.new_price != false) {
	// 		selPri = $('.select-main.btn.btn-bai.b-hui.l90 font')[0]
	// 		selPri.innerHTML = selPri.innerHTML.replace(/(￥[^￥]*-)/g, '￥' + j.new_price / 100 + '-')
	// 	}
	// } else {
	// 	layer.alert(j.msg, function () {
	// 		window.location.href = 'rmb.html'
	// 	})
	// }
	// },
	// })
}
function get_sms(phone_num, project_id) {
	$.ajax({
		url: apiUri + '/get_sms?project_id=' + project_id + '&phone_num=' + phone_num,
		dataType: 'json',
		success: (j) => {
			if (j.message == 'ok') {
				clearInterval(__handle_sms)
				$('[name=dxnr]').val(j.sms)
				try {
					$('[name=yzm]').val(j.sms.match(/(\d{4,})/)[0])
				} catch (e) {
					$('[name=yzm]').val('获取失败 请检查项目关键词是否输入正确! 一般短信内容【】中间的为关键词')
				}
			} else if (j.message != '短信还未到达,请继续获取') {
				x.msg(j.message)
			}
		},
	})
}

function black_mobile() {
	if (!__ot_projid || !__ot_phone) return layer.alert('未获取手机号码')
	$.ajax({
		url: apiUri + '/black_phone?project_id=' + __ot_projid + '&phone_num=' + __ot_phone,
		dataType: 'json',
		success: (j) => {
			x.msg(j.msg)
		},
	})
	clearTask()
}

var phoneCodeMap = {}

function release_mobile(showTip = true) {
	if ((!__ot_projid || !__ot_phone) && showTip) return layer.alert('未获取手机号码')

	if (phoneCodeMap.hasOwnProperty(__ot_phone) && !showTip) {
		return true
	}

	$.ajax({
		url: apiUri + '/release_phone?project_id=' + __ot_projid + '&phone_num=' + __ot_phone,
		dataType: 'json',
		success: (j) => {
			if (showTip) {
				x.msg(j.msg)
			}
			if (!showTip && j.code == '-404') {
				phoneCodeMap.__ot_phone = 1
			}
		},
	})
	if (showTip) clearTask()
}

function send_sms() {
	if (!__ot_projid || !__ot_phone) return layer.alert('未获取手机号码')
	$.ajax({
		url: apiUri + '/send_sms?project_id=' + __ot_projid + '&phone_num=' + __ot_phone + '&reciver=' + $('[name="fm_reciver"]').val() + '&text=' + $('[name="fm_text"]').val(),
		dataType: 'json',
		success: (j) => {
			x.msg(j.message)
		},
	})
}

function clearTask(clearAll = false) {
	__getsms_countdown = 0
	__ot_phone = false
	if (clearAll) {
		__ot_projid = false
		xm_search.style.display = 'block'
		xm_select.style.display = 'none'
	}
	clearInterval(__handle_sms)
	$('[name=yzm]').val('')
	$('[name=sjhm]').val('')
	$('[name=dxnr]').val('')
	refreshApiUri()
}

// 充值页面
function recharge_do() {
	let type = $('[name="shoptype"]').val()
	let money = $('[name=czje]').val()
	if (money < 10) {
		x.msg('金额必须大于10元')
		return
	}
	x.html('/ajax/recharge?type=' + type + '&money=' + money, 'user', 6)
}

function recharge_do_kami() {
	$.ajax({
		url: apiUri + '/recharge_kami',
		data: { passwd: $('[name=czkm]').val() },
		dataType: 'json',
		success: (j) => {
			x.msg(j.message)
		},
	})
}

// Admin

function admin_save_config() {
	let configs = $('input[class="form w h9 bb webconfig"]')
	let data = {}
	for (i = 0; i < configs.length; i++) {
		data[configs[i].name] = configs[i].value
	}
	$.ajax({
		url: '/api/admin_config',
		method: 'POST',
		data: data,
		dataType: 'json',
		success: (j) => {
			x.msg(j.message)
		},
	})
}

function article_remove(id) {
	$.ajax({
		url: '/api/admin_article_remove',
		method: 'POST',
		data: { id: id },
		dataType: 'json',
		success: (j) => {
			x.msg(j.message)
			if (j.code == 200) $('[data-aid=' + id + ']').remove()
		},
	})
}
var ue
function article_edit(id) {
	x.mode('/part/admin_article_new?aid=' + id)
	setTimeout(() => {
		ue = UE.getEditor($('.editor')[0])
		$('[name="position"][value=' + $('[name="position_old"]').val() + ']').click()
	}, 500)
}

function article_send() {
	let pos = $('[name=position]:checked').val()
	let data = {
		aid: $('[name=aid]').val(),
		title: $('[name=title]').val(),
		position: pos === undefined ? $('[name=position_old]').val() : pos,
		keywords: $('[name=kw]').val(),
		description: $('[name=desc]').val(),
		content: ue.getContent(),
	}
	$.ajax({
		url: '/api/admin_article_new',
		method: 'POST',
		data: data,
		dataType: 'json',
		success: (j) => {
			x.msg(j.message)
		},
	})
}

function copyapi() {
	copyCode('https://easydoc.net/s/63284030')
	x.msg('链接已复制')
}

// 定期检查
// var check_ping = ()=>{
//     $.ajax({url:'/api/server_ping',dataType:'json',success:(j)=>{
//         if(j.code == 200) {
//             $('.di.o-h.scroll-notice-home p').html('检测到第三方网络状态正常：适宜下单');
//         }else{
//             $('.di.o-h.scroll-notice-home p').html('检测到第三方网络状态失败：不宜下单');
//         }
//     }});
// };
// setInterval(check_ping,60000);
// check_ping();

// admin
var kami_p = 1
function kami_gen() {
	let money = $('[name="money"]:checked').val()
	let num = $('[name="num"]').val()
	$.ajax({
		url: '/api/admin_kami_gen',
		data: { money: money, num: num },
		dataType: 'json',
		success: (j) => {
			if (j.code == 200) {
				kami_list()
			}
			alert(j.msg)
		},
	})
}
function kami_list(pn = 1) {
	$.ajax({
		url: '/api/admin_kami_list',
		data: { page: pn, keyword: $('[name=keyword]').val() },
		dataType: 'json',
		success: (j) => {
			if (j.code == 200) {
				cardlist.innerHTML = j.list
					.map((a) => {
						let stat
						let used_time = a.used_time || ''
						let used_uid = a.used_uid || ''
						if (a.status == 0) {
							stat = '未使用'
						} else if (a.status == -1) {
							stat = '已使用'
						}
						return `<dl class='h9 bb' data-id='${a.id}'>
    <dt class='c20'>${a.passwd}</dt>
    <dt class='c15'>￥${a.money}</dt>
    <dt class='c15'>${stat}</dt>
    <dt class='c20'>${used_time}</dt>
    <dt class='c15'>${used_uid}</dt>
    <dt class='c15'><dt class="pr2"><button class="btn btn-sm btn-lan sl btn-1 rx2" onclick="kami_remove(${a.id})">删除</button></dt></dt>
</dl>`
					})
					.join('')
				kami_buildpage(j.count, pn)
			} else {
				alert(j.msg)
			}
		},
	})
}
function kami_remove(id) {
	$.ajax({
		url: '/api/admin_kami_remove',
		data: { id: id },
		dataType: 'json',
		success: (j) => {
			if (j.code == 200) {
				kami_list()
			} else {
				alert(j.msg)
			}
		},
	})
}
function kami_buildpage(count, now, ps = 20) {
	let pageAll = Math.ceil(count / ps)
	let lastPage = now <= 1 ? '' : '<button class="btn btn-sm btn-lan sl btn-1 rx2" onclick="kami_setpage(-1)">上一页</button>'
	let nextPage = now == pageAll ? '' : '<button class="btn btn-sm btn-lan sl btn-1 rx2" onclick="kami_setpage(1)">下一页</button>'
	let h = `<div class="w26 pt4 in-text">
    <dt class="pr2">${lastPage}</dt></dt>
    <dd></dd>
    <dt class="pr2">共 ${count} 条 (${now}/${pageAll})</dt>
    <dd></dd>
    <dt class="pr2">${nextPage}</dt></dt>
  </div>`
	kamipage.innerHTML = h
}
function kami_setpage(p) {
	kami_p += p
	kami_list(kami_p)
}
function kami_ext() {
	window.open('/api/admin_kami_extall?money=' + $('[name=money_ext]:checked').val())
}

function switchTpl(tpl) {
	$.ajax({
		url: '/api/switch_tpl',
		data: { tpl: tpl },
		dataType: 'json',
		success: (j) => {
			if (j.code == 200) {
				setCookie('tpl', j.tpl)
				location = '/'
			} else {
				alert(j.msg)
			}
		},
	})
}
