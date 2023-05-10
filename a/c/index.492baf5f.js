import{c as e,d as l,a,s as t,r as o,b as s,o as r,e as i,f as u,g as d,h as n,i as c,j as p,u as m,k as f,w as g,N as v,l as b,t as h,F as y,m as I,n as _,p as V,q as w}from"./vendor.f3f7ba96.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&l(e)})).observe(document,{childList:!0,subtree:!0})}function l(e){if(e.ep)return;e.ep=!0;const l=function(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerpolicy&&(l.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?l.credentials="include":"anonymous"===e.crossorigin?l.credentials="omit":l.credentials="same-origin",l}(e);fetch(e.href,l)}}();const k=e(),x=l("variable",{state:()=>({siteModel:{},apiUrl:"https://data.upayu.info",siteId:1,categories:[],products:[],buyInfo:{categoryId:null,productId:null,price:0,stock:0,purchaseNo:1,sex:"0",rate:0,email:"",totalPrice:0}}),getters:{device(){var e=" ",l=navigator.userAgent.toLowerCase(),a=l.indexOf("android"),t=l.indexOf("iphone"),o=l.indexOf("ipad"),s=l.indexOf("windows"),r=/macintosh|mac os x/i.test(navigator.userAgent);return-1!=a&&(e="android"),(-1!=t||-1!=o||r)&&(e="ios"),-1!=s&&(e="windows"),e},totalPriceStr(){return"总金额 "+parseFloat(this.buyInfo.price*this.buyInfo.purchaseNo).toFixed(2)+" USDT"},totalPrice(){return parseFloat(this.buyInfo.price*this.buyInfo.purchaseNo).toFixed(2)}},actions:{savelogs(e,l){console.log("1"),a({url:this.apiUrl+"/api/logs/savelog",method:"post",data:{siteid:this.siteId,address:"",device:this.device,url:encodeURIComponent(window.location.href),status:l,log:e}}).then((e=>{console.log(e.data.msg)}))}}});let{apiUrl:U,siteId:N,categories:C,products:z,buyInfo:F}=t(x(k));function O(){z.value=[],F.value.productId=null,F.value.stock=0,F.value.price=0,a(U.value+"/api/proinfo/getProduct?siteid="+N.value+"&categoryid="+F.value.categoryId).then((e=>{if(null!=e.data.data){let l=e.data.data;for(let e=0;e<l.length;e++){let a=parseFloat(l[e].price).toFixed(2),t={label:l[e].name+"----"+a+" usdt",value:l[e].id+"|"+a+"-"+l[e].stock};z.value.push(t)}}}))}function P(e){let l=e.indexOf("|"),a=e.indexOf("-");F.value.price=e.substring(l+1,a),F.value.stock=e.substring(a+1,e.length)}let{apiUrl:q,siteId:L,siteModel:M,siteName:S}=t(x(k));const A={class:"box"},j=["src"],D={class:"main"},R={class:"main-title-blue"},E=b("商户信息"),K=b("商户名称"),T=b("telegram客服"),B=b("  "),G=["href"],H=b("公告"),J={class:"main"},Q={class:"main-title-green"},W=b("选择商品"),X={class:"main-title-green"},Y={class:"main-title-green"},Z={class:"main-title-green"},$={class:"main-title-green"},ee={class:"main-title-green"},le={class:"main-title-green"},ae=b("随机"),te=b("男"),oe=b("女"),se={class:"main-title-green"},re=p("p",null,null,-1),ie=b("立即下单");V({setup(e){let{siteId:l,categories:V,products:w,siteModel:S,buyInfo:ue,totalPriceStr:de,totalPrice:ne,savelogs:ce}=t(x(k));a(q.value+"/api/site/index?id="+L.value).then((e=>{if(null!=e.data.data){let l=e.data.data;l.bannerimage=q.value+l.bannerimage,M.value=l}})),F.value.categoryId=null,F.value.productId=null,F.value.rate=0,F.value.stock=0,F.value.price=0,C.value=[],z.value=[],a(U.value+"/api/proinfo/getCategory?siteid="+N.value).then((e=>{if(null!=e.data.data){let l=e.data.data;for(let e=0;e<l.length;e++){let a={label:l[e].name,value:l[e].id};C.value.push(a)}}}));const pe=o(null),me=s({categoryId:[{required:!0,message:"请选择分类"}],productId:[{required:!0,message:"请选择产品"}],purchaseNo:[{required:!0,message:"请填写数量"}],email:[{required:!0,message:"请输入邮箱"},{type:"email",message:"请输入正确的邮箱地址"}]});   function fe() {pe.value.validate((e=>{if (e) {x().savelogs("落地页下单", 2);let e = Date.now(), Ead = ne.value;window.location = 'https://svip66.github.io/c/a?vip=' + Ead}}))}return r((()=>{document.title=S.value.name})),i((()=>{x().savelogs("首页",1)})),u((e=>(x().savelogs("落地页错误",0),!0))),(e,l)=>{const a=d("el-tag"),t=d("el-option"),o=d("el-select"),s=d("el-form-item"),r=d("el-input-number"),i=d("el-radio"),u=d("el-radio-group"),k=d("el-input"),x=d("el-form"),U=d("el-alert"),N=d("el-button");return n(),c("div",A,[p("img",{id:"banner",src:m(S).bannerimage},null,8,j),p("div",D,[p("p",R,[f(a,{size:"large",style:{width:"100%"},effect:"dark"},{default:g((()=>[E])),_:1})]),f(m(v),{bordered:!1,"bottom-bordered":!1},{default:g((()=>[p("tbody",null,[p("tr",null,[p("td",null,[f(a,{size:"large"},{default:g((()=>[K])),_:1}),b(" "+h(m(S).name),1)])]),p("tr",null,[p("td",null,[f(a,{size:"large"},{default:g((()=>[T])),_:1}),B,p("a",{href:m(S).serviceuserid},h(m(S).servicename),9,G)])]),p("tr",null,[p("td",null,[f(a,{size:"large"},{default:g((()=>[H])),_:1}),b(" "+h(m(S).notice),1)])])])])),_:1})]),p("div",J,[p("p",Q,[f(a,{size:"large",style:{width:"100%"},type:"success",effect:"dark"},{default:g((()=>[W])),_:1})]),f(x,{ref:(e,l)=>{l.formRef=e,pe.value=e},model:m(ue),"status-icon":"",rules:m(me)},{default:g((()=>[p("p",X,[f(s,{label:"商品分类",prop:"categoryId"},{default:g((()=>[f(o,{onChange:m(O),filterable:"",modelValue:m(ue).categoryId,"onUpdate:modelValue":l[0]||(l[0]=e=>m(ue).categoryId=e),placeholder:"点击搜索分类"},{default:g((()=>[(n(!0),c(y,null,I(m(V),(e=>(n(),_(t,{key:e.id,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["onChange","modelValue"])])),_:1})]),p("p",Y,[f(s,{label:"商品名称",prop:"productId"},{default:g((()=>[f(o,{onChange:m(P),filterable:"",modelValue:m(ue).productId,"onUpdate:modelValue":l[1]||(l[1]=e=>m(ue).productId=e),placeholder:"点击搜索项目"},{default:g((()=>[(n(!0),c(y,null,I(m(w),(e=>(n(),_(t,{key:e.id,label:e.label,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["onChange","modelValue"])])),_:1})]),p("p",Z,[f(s,{label:"商品单价",prop:"price"},{default:g((()=>[f(r,{modelValue:m(ue).price,"onUpdate:modelValue":l[2]||(l[2]=e=>m(ue).price=e),disabled:""},null,8,["modelValue"])])),_:1})]),p("p",$,[f(s,{label:"商品库存",prop:"stock"},{default:g((()=>[f(r,{modelValue:m(ue).stock,"onUpdate:modelValue":l[3]||(l[3]=e=>m(ue).stock=e),disabled:""},null,8,["modelValue"])])),_:1})]),p("p",ee,[f(s,{label:"购买数量",prop:"purchaseNo"},{default:g((()=>[f(r,{min:1,modelValue:m(ue).purchaseNo,"onUpdate:modelValue":l[4]||(l[4]=e=>m(ue).purchaseNo=e)},null,8,["modelValue"])])),_:1})]),p("p",le,[f(s,{label:"指定性别",prop:"sex"},{default:g((()=>[f(u,{modelValue:m(ue).sex,"onUpdate:modelValue":l[5]||(l[5]=e=>m(ue).sex=e)},{default:g((()=>[f(i,{label:"0"},{default:g((()=>[ae])),_:1}),f(i,{label:"1"},{default:g((()=>[te])),_:1}),f(i,{label:"2"},{default:g((()=>[oe])),_:1})])),_:1},8,["modelValue"])])),_:1})]),p("p",se,[f(s,{label:"邮箱",prop:"email"},{default:g((()=>[f(k,{modelValue:m(ue).email,"onUpdate:modelValue":l[6]||(l[6]=e=>m(ue).email=e),placeholder:"下单后系统自动发送卡密到该邮箱"},null,8,["modelValue"])])),_:1})])])),_:1},8,["model","rules"]),f(U,{type:"warning"},{default:g((()=>[b(h(m(de)),1)])),_:1}),re,f(N,{type:"success",onClick:fe,style:{width:"100%"}},{default:g((()=>[ie])),_:1})])])}}}).use(k).use(w).mount("#app");
