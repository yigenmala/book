/*function area*/

var ehaier = ehaier ||{};

window.console && console.log(ehaier.domainUrl);

var baseDomain;

baseDomain = (ehaier.domainUrl)?ehaier.domainUrl.baseDomain:'http://www.ehaier.com';


//ehaier.domainUrl.baseDomain = 'http://www.ehaier.com';

testMode = (baseDomain=='http://www.testehaier.com')?true:false;

window.console && console.log(testMode);

ehaier.tool = {

	domain : !!testMode?'testehaier':'ehaier',

	ie6 : typeof document.body.style.maxHeight == "undefined"

};



var _gaq = _gaq || [];//ga



//jQuery.cookie

jQuery.cookie=function(a,b,c){var d,e,f,g,h,i,j,k,l;if("undefined"==typeof b){if(i=null,document.cookie&&""!=document.cookie)for(j=document.cookie.split(";"),k=0;k<j.length;k++)if(l=jQuery.trim(j[k]),l.substring(0,a.length+1)==a+"="){i=decodeURIComponent(l.substring(a.length+1));break}return i}c=c||{},null===b&&(b="",c.expires=-1),d="",c.expires&&("number"==typeof c.expires||c.expires.toUTCString)&&("number"==typeof c.expires?(e=new Date,e.setTime(e.getTime()+1e3*60*60*24*c.expires)):e=c.expires,d="; expires="+e.toUTCString()),f=c.path?"; path="+c.path:"",g=c.domain?"; domain="+c.domain:"",h=c.secure?"; secure":"",document.cookie=[a,"=",encodeURIComponent(b),d,f,g,h].join("")};



(function ($) {

	$.fn.hoverClass=function(b){var a=this;a.each(function(c){a.eq(c).mouseenter(function(){$(this).addClass(b)});a.eq(c).mouseleave(function(){$(this).removeClass(b)})});return a};

	$.fn.overOnlyClass=function(b){var a=this;a.each(function(c){a.eq(c).mouseenter(function(){a.removeClass(b);$(this).addClass(b)})});return a};

	$.fn.foucsText=function(c){var a=this;var b=(c==null)?$(a).val():c;a.val(b);a.focus(function(){if(a.val()==b){a.val("")}});a.blur(function(){if(a.val()==""){a.val(b)}});return a};

	$.fn.focusChangeStyle=function(b){var a=this;var b=(b==null)?"txt-focus":b;a.focus(function(){$(this).addClass(b)});a.blur(function(){$(this).removeClass(b)});return a};



	/* soLazy 1.1 */
	$.fn.extend({soLazy:function(g){g=$.extend({type:"scroll",imgTag:"src2",defHeight:-100,defDelay:4000},g||{});var a=$(this);var c=a.find("img"),e=g.imgTag;if(g.type=="scroll"){var b=function(){return document.documentElement.clientHeight+Math.max(document.documentElement.scrollTop,document.body.scrollTop)-g.defHeight};var f=function(){c.each(function(){if($(this).offset().top<=b()){var h=$(this).attr(e);if(h){$(this).attr("src",h).removeAttr(e)}}})};f();$(window).bind("scroll",function(){f()})}if(g.type=="delay"){var d=setTimeout(function(){c.each(function(){var h=$(this).attr(e);if(h){$(this).attr("src",h).removeAttr(e)}})},g.defDelay)}return a}});
})(jQuery);
/* jquery.soChange 1.6.2 */

(function(a){a.fn.extend({soChange:function(b){b=a.extend({thumbObj:null,btnPrev:null,btnNext:null,changeType:"fade",thumbNowClass:"now",thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300,callback:function(){}},b||{});var h=a(this);var i;var k=h.size();var e=0;var g;var c;var f;function d(){if(e!=g){if(b.thumbObj){a(b.thumbObj).removeClass(b.thumbNowClass).eq(g).addClass(b.thumbNowClass)}if(b.slideTime<=0){h.eq(e).hide();h.eq(g).show()}else{if(b.changeType=="fade"){h.eq(e).hide();h.eq(g).fadeIn(b.slideTime)}else{h.eq(e).slideUp(b.slideTime);h.eq(g).slideDown(b.slideTime)}}if(b.callback){b.callback(e,g)}e=g}}function j(){g=(e+1)%k;d()}h.hide().eq(0).show();if(b.thumbObj){i=a(b.thumbObj);i.removeClass(b.thumbNowClass).eq(0).addClass(b.thumbNowClass);i.click(function(){g=i.index(a(this));d();if(b.clickFalse){return false}});if(b.thumbOverEvent){i.hover(function(){g=i.index(a(this));f=setTimeout(d,b.delayTime)},function(){clearTimeout(f)})}}if(b.btnNext){a(b.btnNext).click(function(){if(h.queue().length<1){j()}return false})}if(b.btnPrev){a(b.btnPrev).click(function(){if(h.queue().length<1){g=(e+k-1)%k;d()}return false})}if(b.autoChange){c=setInterval(j,b.changeTime);if(b.overStop){h.hover(function(){clearInterval(c)},function(){clearInterval(c);c=setInterval(j,b.changeTime)})}}}})})(jQuery);
/* soTabChange */

!function(a){a.fn.extend({soTabChange:function(b){b=a.extend({cont:".tab-cont",title:".tab-title",titleNowCls:"tab-title-now",lazyImgTag:"src3",slideTime:0,autoChange:!1,clickFalse:!0,callback:function(){}},b||{});var c=a(this);return c.length&&c.each(function(){var c=a(this).find(b.title),d=a(this).find(b.cont);d.soChange({thumbObj:c,thumbNowClass:b.titleNowCls,slideTime:b.slideTime,autoChange:b.autoChange,clickFalse:b.clickFalse,callback:function(c,e){d.eq(e).find("img").each(function(){var c=a(this).attr(b.lazyImgTag);c&&a(this).attr("src",c).removeAttr("src3")}),b.callback(c,e)}})}),c}})}(jQuery);
/* soBanner */

!function(a){a.fn.extend({soBanner:function(b){b=a.extend({cont:".slide-each",thumbUlCls:"ul-slide",thumbLiCls:"li-slide",thumbLiNowCls:"li-slide-now",thumbNumber:!1,changeDelayTime:0,imgDelayTime:4e3,lazyImgTag:"src4",changeTime:5e3,slideTime:500,autoChange:!0,callback:function(){}},b||{});var c=a(this);return c.length&&c.each(function(){function h(){d.soChange({thumbObj:c.find("."+b.thumbLiCls),thumbNowClass:b.thumbLiNowCls,changeTime:b.changeTime,slideTime:b.slideTime,autoChange:b.autoChange,callback:b.callback})}var f,g,c=a(this),d=c.find(b.cont),e=d.length;if(e>1){for(f='<ul class="'+b.thumbUlCls+'">',g=1;e>=g;g++)f+=b.thumbNumber?'<li class="'+b.thumbLiCls+'">'+g+"</li>":'<li class="'+b.thumbLiCls+'"></li>';f+="</ul>",c.soLazy({type:"delay",imgTag:b.lazyImgTag,defDelay:b.delayTime}),c.append(f),b.changeDelayTime>0?setTimeout(function(){h()},b.changeDelayTime):h()}}),c}})}(jQuery);
/* soShare */

!function(a){a.fn.extend({soShare:function(b){var c,d;return b=a.extend({space:["sina","qq","qZone","renren","kaixin","douban"],url:location.href,title:encodeURIComponent(a("title").text()),pic:null,content:null},b||{}),c=a(this),"all"===b.space&&(b.space=["sina","qq","qZone","renren","kaixin","douban"]),d="",a.each(b.space,function(a,c){switch(c){case"sina":d+='<a class="a-share a-share-sina"href="http://v.t.sina.com.cn/share/share.php?url='+b.url+"&title="+b.content+"&rcontent="+b.content+"&pic="+b.pic+'" title="分享到新浪微博" target="_blank">新浪微博</a>';break;case"qq":d+='<a class="a-share a-share-qqZone" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+b.url+"&title="+b.title+"&pics="+b.pic+"&summary="+b.content+'" title="分享到QQ空间" target="_blank">QQ空间</a>';break;case"qZone":d+='<a class="a-share a-share-qqwb" href="http://share.v.t.qq.com/index.php?c=share&a=index&url='+b.url+"&title="+b.content+"&pic="+b.pic+'" title="分享到腾讯微博" target="_blank">腾讯微博</a>';break;case"renren":d+='<a class="a-share a-share-renren" href="http://widget.renren.com/dialog/share?resourceUrl='+b.url+"&srcUrl="+b.url+"&title="+b.content+"&pic="+b.pic+'&description=" title="分享到人人网" target="_blank">人人网</a>';break;case"kaixin":d+='<a class="a-share a-share-kaixin" href="http://www.kaixin001.com/rest/records.php?url='+b.url+"?sid=&style=11&content="+b.content+'&stime=&sig=" title="分享到开心网" target="_blank">开心网</a>';break;case"douban":d+='<a class="a-share a-share-douban" href="http://shuo.douban.com/!service/share?image='+b.pic+"&href="+b.url+"?sid=&name="+b.title+'" title="分享到豆瓣" target="_blank">豆瓣</a>'}}),c.append(d),c}})}(jQuery);
/* soScrollTo */
jQuery.extend(jQuery.easing,{easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c}}),function(a){a.fn.soScrollTo=function(b){var c;b=a.extend({direction:"y",speed:800,easeType:"easeInOutExpo"},b||{}),c=a(this),c.click(function(){var d,c=a(this).attr("href");return c=a("#"!=c?c:"body"),c.length&&(d={t:c.offset().top||0,l:c.offset().left||0},"x"==b.direction?a("html,body").stop().animate({scrollLeft:d.l},b.speed,b.easeType):a("html,body").stop().animate({scrollTop:d.t},b.speed,b.easeType)),!1})}}(jQuery);
/* sobox 2.0 */
!function(a,b){a.sobox={maskIndex:0,showMask:function(c){var d=this,e=a(".so-openmask"),f=a(b).height();return e.length?d.maskIndex++:(e=a('<div class="so-openmask"></div>'),a("body").append(e),d.maskIndex=1),e.height(c?f+20:0),e.css("z-index",1e3+10*d.maskIndex),e},show:function(b,c,d){var e=this,f=a(b.obj),g=e.showMask(c);return e.setPos(b),b.onlyOne&&a("body").data("soonlyone",!0),f.css("z-index",1002+10*e.maskIndex).fadeIn(),f.find(".s-close").bind("click",function(){e.hide(f)}),d&&d(),g},hide:function(b,c){var d=this,e=a(".so-openmask");a(b).fadeOut("fast",function(){a("select").show(),c&&c()}),d.maskIndex--,e.css("z-index",1e3+10*d.maskIndex),0==d.maskIndex&&e.remove(),a(b).find(".s-close").unbind("click")},drag:function(c,d){function g(a){null==a&&(a=window.event),e.css({opacity:"0.4",left:a.clientX-posX+"px",top:a.clientY-posY+"px"})}var e=a(c),f=a(d);f.mousedown(function(c){c||(c=window.event),posX=c.clientX-parseInt(e.css("left")),posY=c.clientY-parseInt(e.css("top")),a(b).mousemove(function(a){g(a)})}),a(b).mouseup(function(){a(b).unbind("mousemove"),e.css({opacity:"1"})})},setPos:function(c){var e,f,g,h,i,j,k,l,m,n;switch(c=a.extend({mode:"center",obj:null,pos:[0,0],offset:[0,0]},c),e=a(c.obj),f=Math.floor(e.height()/2),g=Math.floor(e.width()/2),h=a(window).scrollTop(),i=a(window).height(),j=c.pos[0],k=c.pos[1],l=c.offset[0],m=c.offset[1],e.css({position:"fixed"}),"undefined"==typeof b.body.style.maxHeight&&(n=e.find("select"),a("select").not(n).hide()),c.mode){case"win":e.css({left:j+l,top:k+m}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+k+m});break;case"doc":e.css({position:"absolute",left:j+l,top:k+m});break;case"tc":e.css({left:"50%",top:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m});break;case"bc":e.css({left:"50%",bottom:m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+m+i});break;default:e.css({top:"50%",left:"50%",marginTop:-f-10+m,marginLeft:-g+l}),"undefined"==typeof b.body.style.maxHeight&&e.css({position:"absolute",top:h+i/2})}},pop:function(b){function j(i){var j,l,m;b=a.extend(b,i||{}),b.showTitle?e.append(f):g.addClass("s-sopop-single-close"),e.append(g).append(h),b.height&&"iframe"!=b.type&&e.css("height",b.height+"px"),e.css({visibility:b.visibility?"visible":"hidden"}),"content"==b.type&&h.html(b.content),"target"==b.type&&(j=a(b.target).show(),h.append(j)),"iframe"==b.type&&(l=a('<iframe src="'+b.iframe+'" width="100%" height="'+b.height+'" frameborder="0" scrolling="auto"></iframe>'),h.html(l)),"ajax"==b.type&&h.load(b.ajax.url,b.ajax.data,function(){c.setPos({mode:b.posType,obj:e,pos:b.pos,offset:b.offset}),b.ajax.callback&&b.ajax.callback()}),b.btn.length>0&&(m=a('<p class="p-so-popBtn"></p>'),a.each(b.btn,function(){var b=a.extend({cls:null,text:"确定",link:"#",removePop:!0,callback:function(){}},this),c=a('<a class="a-sopop-btn" href="'+b.link+'"><span class="s-sopop-btn">'+b.text+"</span></a>");null!==b.cls&&c.addClass(b.cls),c.bind("click",function(){return b.callback&&b.callback(k),b.removePop&&k(),"#"===b.link?!1:!0}),m.append(c)}),e.append(m)),a("body").append(e),b.showTitle&&b.drag&&(f.addClass("h2-sopop-move"),c.drag(e,f)),b.beforePop(e,f,g,h),d=c.show({mode:b.posType,obj:e,pos:b.pos,offset:b.offset,onlyOne:b.onlyOne},b.showMask,b.onPop(k)),g.bind("click",function(){k()}),b.maskClick&&d.bind("click",function(){k()})}function k(d){b=a.extend(b,d||{}),c.hide(e),a("body").removeData("soonlyone"),null!=b.target&&a(b.target).appendTo("body").hide(),e.remove(),b.closePop()}var d,e,f,g,h,i,c=this;return b=a.extend({type:"content",target:null,content:null,iframe:null,ajax:{url:null,data:null,callback:function(){}},posType:"center",pos:[0,0],offset:[0,0],cls:null,width:400,height:null,defaultShow:!0,visibility:!0,title:"提示",showTitle:!0,showMask:!0,onlyOne:!1,drag:!0,maskClick:!0,btn:[],beforePop:function(){},onPop:function(){},closePop:function(){}},b||{}),e=a('<div class="so-popbox '+(b.cls?b.cls:"")+'" style="width:'+b.width+'px;display:none;"></div>'),f=a('<h2 class="h2-sopop"><span class="s-sopop-title">'+b.title+"</span></h2>"),g=a('<span class="s-sopop-close">[关闭]</span>'),h=a('<div class="so-popbox-cont"></div>'),i=a("body").data("soonlyone"),b.defaultShow&&!i&&j(),{wrap:e,opt:b,removePop:k,showPop:j}},alert:function(a,b,c){var d=this;d.pop({cls:"so-popAlert",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}}]})},confirm:function(a,b,c,d){var e=this;e.pop({cls:"so-popConfirm",title:a,width:360,content:b,btn:[{text:"确定",callback:function(){c&&c()}},{text:"取消",cls:"a-sopop-cancel",callback:function(){d&&d()}}]})},tip:function(b){var d,c=this;b=a.extend({cls:"so-popTip",showTitle:!1,posType:"tc",showMask:!1,width:360,stayTime:5e3,offset:[0,12]},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime)},loading:function(b){var d,c=this;return b=a.extend({type:"content",cls:"so-loading",showTitle:!1,maskClick:!1,width:80,height:36,content:"",stayTime:0},b||{}),d=c.pop(b),b.stayTime>0&&setTimeout(function(){d.removePop()},b.stayTime),{open:d.showPop,close:d.removePop}}},a.fn.soIframePop=function(b){var c=a.extend({type:"iframe",targetTag:"href",splitString:"#soIframe?",width:800,height:480,showTitle:!1},b||{}),d=[];return this.each(function(){var g,h,b=a(this),e=b.attr(c.targetTag).split(c.splitString),f=e[0];par=e[1]?e[1].split("&"):"",g={},a.each(par,function(){var a=this.split("=");g[a[0]]=a[1]}),c=a.extend(c,g||{}),c.showTitle="true"==c.showTitle?1:+c.showTitle,c.iframe=f,c.defaultShow=!1,h=a.sobox.pop(c),d.push(h),b.click(function(){return h.showPop(),a(this).data("iframePop",h),!1})}),d},a.fn.soSidePop=function(b){var c=a(this),d=b.event||"click";return c.bind(d,function(c){var d=a.extend({showMask:!1,posType:"doc",pos:[c.pageX,c.pageY],offset:[10,10],onlyOne:!0,returnFalse:!0},b||{});return sidepop=a.sobox.pop(d),d.returnFalse?!1:void 0}),c},a.fn.soOverTip=function(b){var c=a(this),d=a.extend({cls:"so-overTip",showMask:!1,posType:"doc",offset:[10,10],showTitle:!1,onlyOne:!0},b||{}),e=null;return c.mouseenter(function(b){d.pos=[b.pageX,b.pageY],e=a.sobox.pop(d)}).mouseleave(function(){e.removePop()}),c}}(jQuery,document);
/* START Class MMJS.Cart */
!function(){window.MMJS=window.MMJS||{},MMJS.Cart=function(a){a=a||{};var b={api_add:baseDomain+"/cart/addToCart",api_ck_add:baseDomain+"/ckcart/addToCart",api_remove:"http://www."+ehaier.tool.domain+".com/cart/removeCartInfoByAjax",api_ck_remove:"http://www."+ehaier.tool.domain+".com/ckcart/removeCartInfoByAjax",api_clear:"http://www."+ehaier.tool.domain+".com/cart.php?a=clearCartInfoByAjax",api_get:"http://www."+ehaier.tool.domain+".com/cart/getCartJsonByAjax",api_ck_get:"http://www."+ehaier.tool.domain+".com/ckcart/getCartJsonByAjax",list:[],total_count:0,total_price:0,$root:null,$list:null,$item_tpl:null,$total_count:null,$total_price:null,$cart_empty:null,$cart_wrap:null};a=jQuery.extend(b,a),jQuery.extend(this,a)},MMJS.Cart.prototype.bind=function(a){var b=this;b.$root=jQuery(a),b.$list=b.$root.find(".ul-mini-cart-list"),b.$item_tpl=b.$list.children().eq(0).clone(!0),b.$total_count=b.$root.find(".js-cart-num"),b.$total_price=b.$root.find(".em-total-price"),b.$cart_empty=b.$root.find(".cart-empty-tip"),b.$cart_wrap=b.$root.find(".ul-mini-cart-list"),b.get(function(){b.update()})},MMJS.Cart.prototype.add=function(a,b){var c=this,d=a||{};if(a['identifier']==undefined){jQuery.ajax(c.api_add,{data:d,dataType:"jsonp",cache:!1,success:function(a){a&&(c.get(a),b(a))}})}else{jQuery.ajax(c.api_ck_add,{data:d,dataType:"jsonp",cache:!1,success:function(a){a&&(c.get(a),b(a))}})}},MMJS.Cart.prototype.remove=function(a){var b=this;this.get(this.api_get,function(data){if(data&&data.data.path=='ckcart'){jQuery.ajax(b.api_ck_remove,{data:{id:a},dataType:"jsonp",success:function(a){a.success&&b.get(a)}});}else{jQuery.ajax(b.api_remove,{data:{id:a},dataType:"jsonp",success:function(a){a.success&&b.get(a)}});}});},MMJS.Cart.prototype.clear=function(a){var a=this;jQuery.ajax(a.api_clear,{data:{},dataType:"jsonp",success:function(b){b.success&&a.get(a)}})},MMJS.Cart.prototype.get=function(a,callback){var b=this;if(a['identifier']==undefined){jQuery.ajax(b.api_get,{data:{},dataType:"jsonp",success:function(a){a.success&&(b.list=a.data.list||[],b.total_count=a.data.total_count,b.total_price=a.data.total_price,b.update());callback&&callback(a);}})}else{jQuery.ajax(b.api_ck_get,{data:{},dataType:"jsonp",success:function(a){a.success&&(b.list=a.data.list||[],b.total_count=a.data.total_count,b.total_price=a.data.total_price,b.update());callback&&callback(a);}})}},MMJS.Cart.prototype.check=function(){var api_get="http://www."+ehaier.tool.domain+".com/cart/getCartJsonByAjax";jQuery.ajax(api_get,{data:{},dataType:"jsonp",success:function(data){location.href="http://www."+ehaier.tool.domain+".com/"+data.data.path+".html";}})},MMJS.Cart.prototype.update=function(){var b,c,d,a=this;if(null==a.$root){return;}
for(a.$total_count.html(a.total_count),a.$total_price.html(a.total_price),a.$list.find("li").not(".li-total").remove(),a.list.length>0?(a.$cart_empty.hide(),a.$cart_wrap.show()):(a.$cart_empty.show(),a.$cart_wrap.hide()),b=0;b<a.list.length;b++)c=a.list[b],d=a.$item_tpl.clone(!0),d.find(".a-title").text(c.name),d.find(".em-price").text(c.price),d.find(".em-num").text(c.num),d.find(".js_link").attr("href","http://www."+ehaier.tool.domain+".com/product/"+c.pid+".html"),d.find(".js_thumb").attr("src",c.thumb),d.find(".s-del").data("sid",c.sid).bind("click",function(){var b=jQuery(this);return a.remove(b.data("sid")),!1}),a.$list.prepend(d)}}(jQuery);
//2014-5-7 增加soTend及eseInOutExpo by Chenxi
/* soTend */
!function(a){a.fn.extend({soTend:function(b){function l(){g!=h&&(b.thumb&&a(b.thumb).removeClass(b.thumbNowClass).eq(h).addClass(b.thumbNowClass),b.slideTime<=0?d.css({left:-100*h+"%"}):d.stop().animate({left:-100*h+"%"},b.moveTime,function(){b.callback&&b.callback(g,h)}),g=h)}function m(){h=(g+1)%f,l()}var c,d,e,f,g,h,i,j,k,n;b=a.extend({moveWrap:"moveWrap",easing:"swing",obj:null,btnPrev:null,btnNext:null,thumb:null,thumbOverEvent:!0,thumbNowClass:"now",defInx:0,overStop:!0,clickFalse:!0,autoChange:!0,changeTime:5e3,moveTime:800,callback:function(){}},b||{}),c=a(this),d=c.find(b.moveWrap),e=d.find(b.obj),f=e.length,g=b.defInx,k=!1,d.css({left:-100*g+"%"}),b.thumb&&(n=a(b.thumb),n.removeClass(b.thumbNowClass).eq(g).addClass(b.thumbNowClass),n.click(function(){return h=n.index(a(this)),l(),b.clickFalse?!1:void 0}),b.thumbOverEvent&&n.hover(function(){h=n.index(a(this)),j=setTimeout(l,b.delayTime)},function(){clearTimeout(j)})),b.btnNext&&a(b.btnNext).click(function(){return c.queue().length<1&&m(),!1}),b.btnPrev&&a(b.btnPrev).click(function(){return c.queue().length<1&&(h=(g+f-1)%f,l()),!1}),b.autoChange&&(clearInterval(i),i=setInterval(function(){k||m()},b.changeTime),b.overStop&&(c.hover(function(){k=!0},function(){k=!1}),b.thumb&&a(b.thumb,b.obj).hover(function(){k=!0},function(){k=!1})))}})}(jQuery);
/* easeInOutExpo */
$.extend($.easing,{def:"easeInOutExpo",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c}});




ehaier.base = {

	/* base begin */

	init : function () {

		var that = this;
		flag = true;

		that.autoW();// auto page width <>1200

		that._headFooterBase();//侧导航分类事件

		that._favHome();//顶部收藏

		that._headLoadLoginInfo();//载入用户登录和城市信息

		that._chooseCity();//城市选择事件

		//that._cookieVersion();//click cookie to new index version (v4)

		that._sideAllTipBar();//侧边帮助栏事件

		that._ajaxMessage();//留言弹出窗口

		that.uniteHaier();//联合Haier用户信息 $.cookie('ehaierToken')

		that.baseAjaxLogin();//通用异步登录

		that._directCart();//判断通往创客或者普通购物车

		if ($('.txt-search').length) {

			that._loadHotWords();//加载搜索词列表

		}

		$('.js_submit').click(function(){//兼顾js_submit提交事件

			$(this).parents('form').eq(0).submit();

			return false;

		});

		 

		$('a[ref]').mouseenter(function () {
			var ref = $(this).attr('ref')||'';
			var href = $(this).attr('href').split(/[?&]?ebi=ref-/)[0];
			$(this).attr('href',(href.indexOf('?')>0)?(href+'&ebi=ref-'+ref):(href+'?ebi=ref-'+ref));
		}).click(function () {
			var ref = $(this).attr('ref')||'';
			var href = $(this).attr('href');
			var trackUrl = '/trackUrl/index/'+ref;
			_gaq.push(['_trackPageview',trackUrl]);
		});


	},

	miniCart : null,//mini购物车

	curRegionId :null,//当前地区id

	autoW : function () {// page width two size: 1200 || 1000
		function autoAjustWidth() {
			var wW = $(window).width();
			if (wW<1200) {
				$('.wrapper').addClass('wrapper-1000');
			}else {
				$('.wrapper').removeClass('wrapper-1000');
			}
		}
		autoAjustWidth();
		$(window).resize(function () {
			autoAjustWidth();
		});
	},

	_headFooterBase : function () {//侧导航分类事件

		var that = this;

		if ($('.all-category-box').length) {//侧导航分类

			$('.all-category-box').hoverClass('all-category-box-over');//鼠标经过触发显示下拉

			$('.dl-category-item').hoverClass('dl-category-item-over');//鼠标经过触发显示当前分类

			$('.dl-category-item').mouseenter(function () {//触发当前分类，加载当前分类下的推广图片

					$(this).find('img').each(function () {//callback lazy

						var srcPath = $(this).attr('src3');

						if (srcPath) {$(this).attr('src',srcPath).removeAttr('src3');}

					});

			});

		}

		if ($('.js_cart').length) {//绑定头部mini购物车
			that.flag = true;
			$('.mini-cart').hoverClass('mini-cart-over');//mini cart hover
			that.miniCart = new MMJS.Cart();
			$('.mini-cart').mouseenter(function(){	//鼠标移上去再请求购物车数据				
				if(that.flag){
					that.miniCart.bind('.js_cart');
					that.flag = false;
				}
				
			});		
		}

		if ($('.all-header-bar').length) {

			that._weixin();//显示微信
			
			$('.a-header-to-haier').mouseenter(function () {

				$(this).attr('href','http://www.haier.com/');

			});
			

		}


		$('.delaybox').soLazy({type : 'delay',imgTag : 'src3'});//delay lazy
		
		$('.lazybox').soLazy();//scroll lazy

		$('.footer').soLazy();//lazy

		$('.js-scorllTo').soScrollTo();//绑定 js-scrollTo类执行滑动返回 <a class="js-scorllTo" href="#toId">滚动到id为toId的对象，href="#"默认滚到顶部



	},

	_weixin : function () {//weixin show or hide



		var $wxBox = $('.js-show-weixin');

		var $imgWx = $('.img-weixin-qr');

//		var ss = setTimeout(function(){//after 4s hide 

//			$wxBox.removeClass('s-weixin-box-over');

//		},4000);



		$wxBox.mouseenter(function  () {//mouse event show or hide

			$(this).addClass('s-weixin-box-over');

			$imgWx.attr({'src':$imgWx.attr('src3')});

			//clearTimeout(ss);

		}).mouseleave(function() {

			$(this).removeClass('s-weixin-box-over');

		});



		$('.a-weixin-ehaier').click(function () {

			return false;

		});

		$wxBox.find('.em-close').click(function() {

			$wxBox.removeClass('s-weixin-box-over');

		});

	},

	_cookieVersion : function () {//v3，v4版本转换

		var indexVersion = $.cookie('indexVersion')||'v3';

		(indexVersion == 'v3')&&$('.a-to-newIndex').show();//判断是否v3来显示导航上的"尝试新版"

		$('.a-to-newIndex').click(function () {//点击记录cookie

			var href = $(this).attr('href');

			$.cookie('indexVersion','v4',{domain:'.ehaier.com'});

			window.location.href = href;

			return false;

		});

	},

	uniteHaier : function () {//打通haier与ehaier账号关联

		//ehaierToken

		if ($.cookie('ehaierToken')) {

			var toHaier = {};

			toHaier.script = document.createElement("script");

			toHaier.script.type = "text/javascript";

			toHaier.script.async = true;

			toHaier.script.charset = "utf-8";

			toHaier.script.src = "http://user.haier.com//ids/p3p_haier.jsp?action=addcookie&trsidssdssotoken=" + $.cookie('ehaierToken');

			document.getElementsByTagName("head")[0].appendChild(toHaier.script);

		}

		if ($.cookie('ehaierToken')) {

         var toRRS = {};

         toRRS.script = document.createElement("script");

         toRRS.script.type = "text/javascript";

         toRRS.script.async = true;

         toRRS.script.charset = "utf-8";

         toRRS.script.src = "http://www.rrs.com/api/thridPart/auth?source=ehaier&targetUrl=www.rrs.com&thirdPartToken=" + $.cookie('ehaierToken');

         document.getElementsByTagName("head")[0].appendChild(toRRS.script);

		}
 


	},

	_favHome : function () {//顶部收藏

		$('.js-addtofav').click(function () {

			var siteUrl = "http://www."+ehaier.tool.domain+".com/";

			var title = "海尔商城 - 海尔集团唯一网上官方商城, 全场包邮送装一体可至乡镇村。";

			if (document.all) {//ie

				window.external.addFavorite(siteUrl, title);

			}

//			else if (window.sidebar) {//firefox高版本已不支持此属性

//				window.sidebar.addPanel(title, siteUrl, "");

//			}

			else {

				$.sobox.alert("提示","当前浏览器不支持此操作，请使用 Ctrl+D 收藏海尔商城！");

			}

			return false;

		});

	},

	_headLoadLoginInfo : function () {

		var that = this;

		$.ajax({//加载顶部右侧用户登录信息

			type:"GET",
			//url: memberDomain+"/headLoginAjax",

			//url: "http://www."+ehaier.tool.domain+".com/index.php?a=headLoginAjax",

			url: memberDomain+"/headLoginAjax",

			dataType: "jsonp",

			jsonp: "callback",

			success: function (data) {
				if (data.result) {
					$('.js-login-info').html(data.data);
					if($('.s-username').length){
						$('.ul-pulldown').hoverClass('over');
						$('.ul-pulldown').one('mouseenter',function(){
							$.ajax({
								url: memberDomain+'/getOrderCount.html',
								type: 'GET',
								dataType: 'jsonp',
								cache:true,
								success : function (data) {
									if (data.success){
										var paynum = data.data.unPaidCount;
										var waitcommentnum = data.data.waitCommentCount;
										var sharenum = data.data.iUnShowCount;										
										$('#js_ToPayNum').html('('+paynum+')');
									 	$('#js_ToCommentNum').html('('+waitcommentnum+')');
										$('#js_ToShareNum').html('('+sharenum+')');					
											
									}
								}								
								
							})
						})		 	
						//that._downMenu();//显示下拉菜单						
					}
				}

			}

		});

		$.ajax({//加载顶部左侧当前城市信息，v3首页还会根据当前城市id加载团购信息

			type:"GET",

			url: memberDomain+"/currCityAjax?r=" + Math.random(),

			dataType: "jsonp",

			jsonp: "callback",

			cache: false,

			success: function (data) {
				if (data.success) {
				
					$('.js-choose-city').html(data.data.cityName).attr('name',data.data.cityId);

					that.curRegionId = data.data.cityId;

				}

			}

		});

	},
	_chooseCity : function () {//城市选择事件

		var that =this;

		if ($('.js-choose-city').length) {

			var $citybox = $('.city-list');

			var markPosArr={mark:0,arr:[]};//new arr save city mark

			$('.js-choose-city').click(function () {

				_gaq.push(['_trackPageview','/trackUrl/all/clickSelectCity']);

				if (markPosArr.mark==0) {//初次加载

					$.ajax({//load city list

						type:"GET",

						url: baseDomain+"/getRegons",//修改成memberDomain

						dataType: "jsonp",

						jsonp: "callback",

						success : function (msg) {

							$(msg.data).appendTo($citybox);

							var nowCity = $('.js-choose-city').text();

							$citybox.find('a:contains("'+nowCity+'")').addClass('active');

							$citybox.find('a').click(function () {

								var href = $(this).attr('href');

								_gaq.push(['_trackPageview',href]);

							});

						}

					});

					$('body').append('<div class="allcity-mask"></div>');

					$('.allcity-box').append('<span class="s-sopop-close">X</span>');

					$('.allcity-box .s-sopop-close,.allcity-mask').click(function () {

						$('.allcity-mask').hide();

						$('.allcity-box').hide();

					});

				}

				var dh = $(document).height();

				$('.allcity-mask').height(dh).show();//mask显示

				$('.allcity-box').fadeIn(300,function () {//显示城市选择

					$citybox.scrollTop(0);

					if (markPosArr.mark==0) {//base get mark position-y

						$citybox.find('li').each(function () {

							markPosArr.arr.push($(this).position().top);//push save mark position-y

						});

						markPosArr.mark = 1;

					}

				});

			});



			$('.letter-mark').live('click',function () {//点击字母事件

				var indx = $('.letter-mark').index($(this));

				$citybox.scrollTop(markPosArr.arr[indx]);

				return false;

			});

			//if (testMode) {//www.testehaier.com状态下点击返回当前域名

				//window.console && console.log(baseDomain);

				// $('.city-list').find('a').live('click',function () {//点击地区

				// 	var href = $(this).attr('href').split('www.ehaier.com')[1];

				// 	window.console && console.log(baseDomain+href);

				// 	window.location.href = baseDomain+href;

				// 	return false;

				// });

			//}

		}

	},

	_sideAllTipBar : function () {//all-tipbar
		
		var $tipbar = $('.all-tipbar');
		$tipbar.removeClass('all-tipbar-show');
		$(window).scroll(function () {
			var wst = $(window).scrollTop();
			wst < 200 ? $tipbar.removeClass('all-tipbar-show') : $tipbar.addClass('all-tipbar-show'); 
		});
		if (ehaier.tool.ie6) {
			$('body').css('position','relative');
			$(window).scroll(function(){
				// The number 3 is a offset 
				var bottomVal = $(document).height() - $(window).height() - $(window).scrollTop() + 3;
				$tipbar.css('bottom', bottomVal)
			});
		}
		//$tipbar.hoverClass('all-tipbar-over');
		$('.s-wx2w').mouseenter(function () {

			$(this).addClass('s-wx2w-over');

			$('.img-wx2w').attr('src',$('.img-wx2w').attr('src3'));

		}).mouseleave(function () {

			$(this).removeClass('s-wx2w-over');
		});

	},

	_ajaxMessage : function () {//ajaxmessage
		if ($('.a-ajax-message').length) {

			function newCode(){//get valite code
				var valSrc = $('.a-refresh-code').attr('href');
				$('.ajax-stockeNotice .img-code').attr('src',valSrc+Math.random());
			}

			var colseP = null;
			$('.ajax-stockeNotice .txta').foucsText();//focus event
			$('.ajax-stockeNotice .txt').each(function () {$(this).foucsText();});//focus event
			$('.a-ajax-message').click(function () {
				
				//colseP = $.sobox.pop({type:'target',title:'我要留言',target:'.fancy_popup',width:660});
				
				var ajaxUrl = $(this).attr('href');
				colseP = $.sobox.pop({
						    type:'ajax',
						    width:1000,
						    title:'我要留言',
						    posType:'center',
						    ajax:{
						      url:ajaxUrl,
						      callback:function (){
						        newCode();
								var messageTip = $('.ajax-msgNotice .p-messageTip');
								var nickname= $('.nickname'),contact =$('.contact'),popMessage = $('.txta-pop-message'),captcha =$('#captcha');
								var nameVal = nickname.val(),contactVal =contact.val(),messageVal = popMessage.val();
								$('.ajax-stockeNotice .a-refresh-code').click(function(){newCode();return false;});
								$('.ajax-stockeNotice .a-btn').click(function () {
									var a=nickname.val(),b=contact.val(),c=popMessage.val(),d= captcha.val();
									if (a==nameVal) {a='';}
									if (b==contactVal) {b='';}
									if (c==messageVal||c=='') {messageTip.text('请填写留言内容！');return false;}
									if (d=='') {messageTip.text('请填写注册码！');return false;}
									$.post('http://www.'+ehaier.tool.domain+'.com/guestbook.php?a=doaddguestmessagenew',{'nickName':a,'contact':b,'message':c,'captcha':d},function (data) {
										if (data.result) {
											popMessage.val(messageVal);
											captcha.val('');
											messageTip.text('');
											colseP.removePop();
											$.sobox.alert('提示','留言成功！感谢您的留言，海尔客服会以最快的速度来解答您的问题。');
										}else {
											messageTip.text(data.message);
											newCode();
										}
									});
									return false;
								});
						      }
						    }
						});
			return false;

			});


		}
	},

	searchSmartWords : function () {

		var o = $.extend({

			defWord : null

		},o||{});

		var jsonUrl = 'http://search.'+ehaier.tool.domain+'.com/suggestJson.html?q=';

		var $searchT = $('.txt-search');

		//var sw = $searchT.width();

		var oldVal = '',nowI = -1;//初始化共享列表index

		var $keyList = $('<ul class="ul-searchKeyList" style="display:none;"></ul>');

		var sSearch = {

			init : function () {

				var that = this;

				$('.all-header-cont .all-search').append($keyList);//插入联想列表盒子



				$searchT.keyup(function (e) {//keyup事件

					that._keyEvent(this,e,false);

				}).focus(function (e) {//focus事件

					that._keyEvent(this,e,true);

				});



				$(document).on('click',function (e) {//document点击事件

					var target= e.target;

					if (!$(e.target).hasClass('txt-search')) {

						$keyList.empty().hide();

					}

				});



				$(document).on('click','.ul-searchKeyList .li-searchKey',function () {//点击列表处理

					$searchT.val($(this).find('.s-keyword').text());

					$searchT.parents('form').eq(0).submit();

					$keyList.empty().hide();

					nowI = -1;

					return false;

				});

			},

			_keyEvent : function (o,e,style) {

				var that = this;

				var _self = $(o);

				var val = $.trim($(o).val());

				val = (val != o.defWord)?val:'';

				var keycode = e.keyCode;

				var url = jsonUrl+encodeURIComponent(val);

				var  lock = (keycode>36&&keycode<41||oldVal==val)?true:false;//是否在操作光标键



				if (!lock&&oldVal!=val) {//如果value有变化重置list index

					nowI = -1;

					oldVal=val;

				}



				if (!lock||style) {//输入请求事件

					$.ajax({

						type:"GET",

						url:url,

						dataType: "jsonp",

						jsonp: "jsonpCallback",

						success:function ( data ) {

//					$.getJSON(url,function (data) {

							if (data.success&&data.data.length) {

								var data = data.data,smartList = '';

								dLen = data.length;

								for (i = 0; i < dLen; i++) {

									smartList += '<li class="li-searchKey"><span class="s-keyword">'+data[i].smartWord+'</span><span class="s-keyNumber">约'+data[i].resultCount+'个商品</span></li>';

								}

								$keyList.html(smartList).show();

								that._doKey(_self,keycode);

							}else {

								$keyList.empty().hide();

							}

						}

					});

				}else {//只光标操作

					that._doKey(_self,keycode);

				}

			},

			_doKey : function (_self,keycode) {//键盘事件

				var that = this;

				var $li = $keyList.find('li');

				var keyLen = $li.length;

				$li.hoverClass('li-searchKeyOver');

				if (keycode==38) {//键盘上键事件

					nowI = (nowI>0)?(nowI-1):0;

					that._liEvent(_self);

				}

				if (keycode==40) {//键盘下键事件

					nowI = (nowI<(keyLen-1))?(nowI+1):(keyLen-1);

					that._liEvent(_self);

				}

				if (keycode==13) {//键盘回车键事件

					if (nowI!=-1) {

						var v = $keyList.find('li').eq(nowI).find('.s-keyword').text();

						window.console && console.log(nowI);

						_self.val(v);

						$keyList.empty().hide();

						nowI = -1;

					}

				}

			},

			_liEvent : function(_self) {//键盘上下处理

				$keyList.find('li').removeClass('li-searchKeyNow');

				var nowLi = $keyList.find('li').eq(nowI);

				_self.val(nowLi.find('span.s-keyword').html());

				nowLi.addClass('li-searchKeyNow');

			}

		};

		sSearch.init();

	},

	_loadHotWords : function () {

		var that = this;

		var $txtSearch = $('.txt-search');

		if (ehaier.domainUrl&&ehaier.domainUrl.word) {

			$txtSearch.val(ehaier.domainUrl.word);

			that.searchSmartWords();//下拉搜索列表联想

		}else {

			var defKey = $txtSearch.attr('rel');

			$txtSearch.val(defKey).foucsText();

			$('.txt-search-beta').val(defKey);

			that.searchSmartWords({defWord:defKey});//下拉搜索列表联想

		}

	},

	coutDownEvent : function (o,time) {//倒计时函数

		var time=time*1;var jThis=$(o);var $day=jThis.find('.count_day');var $ho=jThis.find('.count_ho');var $mi=jThis.find('.count_min');var $se=jThis.find('.count_sec');var cd=null;var jDay=0;var jHour=0;var jMinute=0;var jSecond=0;var countDown=function(){if(time>0){time--;};jMinute=parseInt((time%3600)/60);jSecond=parseInt(time%60);if ($day.length) {jDay=parseInt((time/3600)/24);jHour=parseInt((time/3600)%24);if(jDay==0&&jHour==0&&jMinute==0&&jSecond==0){clearInterval(cd);clearInterval(cms1);clearInterval(cms2);};sDay=(jDay<10)?('0'+jDay):jDay;$day.html(sDay);}else{jHour=parseInt(time/3600);if(jHour==0&&jMinute==0&&jSecond==0){clearInterval(cd);clearInterval(cms1);clearInterval(cms2);}};sHour=(jHour<10)?('0'+jHour):jHour;sMinute=(jMinute<10)?('0'+jMinute):jMinute;sSecond=(jSecond<10)?('0'+jSecond):jSecond;$ho.html(sHour);$mi.html(sMinute);$se.html(sSecond);};cd=setInterval(countDown,1000);var $ms1=jThis.find('.count_ms1');if ($ms1.length) {var $ms2=jThis.find('.count_ms2');var cms1=null;var cms2=null;var ms2=0;var ms1=0;var countMS1=function(){ms1++;ms1=(ms1<10)?(ms1):0;$ms1.html(ms1);};var countMS2=function(){ms2++;ms2=(ms2<10)?(ms2):0;$ms2.html(ms2);};cms1=setInterval(countMS1,100);cms2=setInterval(countMS2,80);};

	},

	baseAjaxLogin: function () {

		if ($('.a-baseAjaxLogin').length) {//此登录方式只能在www域名下使用

			// var ajaxLoginUrl = memberDomain+'/ajaxLogin';//登录模板路径
			
			/*
			var ajaxLoginUrl = '/profile.php?a=ajaxLogin&isAjax=1';

			var ajaxPop = $.sobox.pop({

				type:'ajax',

				cls:'ajax-popInfoBox',

				defaultShow : false,

				onlyOne : true,//防止重复调用，一次只显示一个

				title : '用户登录',

				ajax:{url:ajaxLoginUrl}

			});
			*/
			$('.a-baseAjaxLogin').click(function () {//点击时show

				// ajaxPop.showPop();
				
				var ajaxLoginUrl = "http://member.ehaier.com/ajaxLogin?callback=?";
				$.getJSON(ajaxLoginUrl, function(data){
					var ajaxPop = $.sobox.pop({
						cls:'ajax-popInfoBox',
						defaultShow : true,
						onlyOne : true,//防止重复调用，一次只显示一个
						title : '用户登录',
						content : data.data
					});
					ajaxPop.showPop();
					$('body').data('ajaxPop', ajaxPop);
				});
				
				return false;

			});

			// $('body').data('ajaxPop',ajaxPop);//防止重复调用

		}

	},

	_directCart:function(){
		$('.a-to-check').click(function(evt){
			evt.preventDefault();
			MMJS.Cart.prototype.check();
		})
	}

}





/*use*/

$(function () {

	ehaier.base.init();

});
