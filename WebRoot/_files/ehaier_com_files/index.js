/* soTend */ 

!function(a){a.fn.extend({soTend:function(b){function p(){g==h||l||(l=!0,b.thumb&&a(b.thumb).removeClass(b.thumbNowClass).eq(h-1).addClass(b.thumbNowClass),b.slideTime<=0?(h==o-1&&(h=1),0==h&&(h=o-2),d.css({left:-100*h+"%"} ),g=h,l=!1):(g=h,d.animate({left:-100*h+"%"} ,b.moveTime,function(){h>o-2&&(h=1,d.css({left:"-100%"} ),g=h),0==h&&(h=o-2,d.css({left:-100*h+"%"} ),g=h),b.thumb&&a(b.thumb).removeClass(b.thumbNowClass).eq(h-1).addClass(b.thumbNowClass),b.callback&&b.callback(g,h),l=!1;$(".child").css({ margin:"0 0 0 1000px"});var x=300;f=e.eq(h).find(".child");f.each(function(){$(this).animate({ margin:"0 0 0 -500px"},x);x+=300;});} )))}function q(){h=g+1,p()} var c,d,e,g,h,i,j,k,l,m,n,o,r;b=a.extend({moveWrap:"moveWrap",easing:"swing",obj:null,btnPrev:null,btnNext:null,thumb:null,thumbOverEvent:!0,thumbNowClass:"now",defInx:0,overStop:!0,clickFalse:!0,autoChange:!0,changeTime:5e3,moveTime:500,delayLazy:!0,delayTag:"src3",delayTime:3e3,callback:function(){}} ,b||{} ),c=a(this),d=c.find(b.moveWrap),e=d.find(b.obj),e.length,g=b.defInx+1,k=!1,l=!1,m=e.first().clone(),n=e.last().clone(),d.append(m).prepend(n),e=d.find(b.obj),o=e.length,e.each(function(b,c){a(c).css({ left:100*b+"%" } );} ),d.css({ left:-100*g+"%"} ),b.delayLazy&&setTimeout(function(){d.find("img").each(function(){a(this).attr("src",a(this).attr(b.delayTag)).removeAttr(b.delayTag)})} ,b.delayTime),b.thumb&&(r=a(b.thumb),r.removeClass(b.thumbNowClass).eq(g-1).addClass(b.thumbNowClass),r.click(function(){return h=r.index(a(this))+1,p(),b.clickFalse?!1:void 0}),b.thumbOverEvent&&r.hover(function(){h=r.index(a(this))+1,j=setTimeout(p,b.delayTime)} ,function(){clearTimeout(j)} )),b.btnNext&&a(b.btnNext).click(function(){return q(),!1}),b.btnPrev&&a(b.btnPrev).click(function(){return h=(g+o-1)%o,p(),!1} ),b.autoChange&&(clearInterval(i),i=setInterval(function(){k||q()} ,b.changeTime),b.overStop&&(c.hover(function(){k=!0} ,function(){k=!1}),b.thumb&&a(b.thumb,b.obj).hover(function(){k=!0},function(){k=!1} )))}})}(jQuery);



var wW = $(window).width();

var Cookie = {};

/**
 * @method set
 * @namespace Cookie
 * @param {String} name  
 * @param {String} value 
 * @param {string number date} expiredays 
 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
 * @param {String} path
 * @param {String} domain 
 * @param {Boolean} secure
 * @return {Boolean}
 */

 Cookie.set = function (name, value, expiredays, path, domain, secure) {

	if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) { return false; }
	var expires = '',
		today = new Date();
	if (expiredays) {
		switch (expiredays.constructor) {
		case Number:
			 expires = expiredays === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + expiredays;
			 break;
		case String:
			today.setDate(today.getDate() + expiredays*1);
			expires = '; expires=' + today.toUTCString();
			break;
		case Date:
			expires = '; expires=' + expiredays.toUTCString();
			break;
		}
	}
	document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + 
					  expires + 
					  (domain ? '; domain=' + domain : '') + 
					  (path ? '; path=' + path : '') + 
					  (secure ? '; secure' : '');
	return true; 
 };

/**
 * @method get
 * @namespace Cookie
 * @param {String} name  
 * @return {String}
 *
 */

 Cookie.get = function (name) {
	
	return decodeURIComponent(
			document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + 
			encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
			'\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
 };

/**
 * @method rm
 * @namespace Cookie
 * @param {String} name  
 * @param {String} path
 * @param {String} domain 
 * @return {Boolean}
 *
 */

 Cookie.rm = function (name, path, domain) {
	 
	if (!name || !this.has(name))  return false;     
	document.cookie = encodeURIComponent(name) + 
						'=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + 
						( domain ? '; domain=' + domain : '') + 
						( path ? '; path=' + path : '');
	return true;
 };

/**
 * @method has
 * @namespace Cookie
 * @param {String} name  
 * @return {Boolean}
 *
 */

 Cookie.has = function (name) {
	return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);	 
 };

/**
 * cookie 记录的一次性操作
 * @method once
 * @namespace Cookie
 * @param {String} name  
 * @param {String} value 
 * @param {string number date} expiredays ［可选］
 * 字符串型表示天数 数字型表示秒数 日期型表示日期对象
 * @param {String} path    ［可选］
 * @param {String} domain  ［可选］
 * @param {Boolean} secure ［可选］
 * @param {Function} callback
 * @return {Boolean}
 *
 */

 Cookie.once = function (name, value, expiredays,path,domain, secure,  callback) {
	 var args = Array.prototype.slice.call(arguments),
		 name = args.shift(),
		 callback = args.pop();
	 if (this.has(name)) return false;
	 this.set(name, args[0], args[1], args[2], args[3], args[4]);
	 callback && typeof callback == 'function' &&  callback();
	 return true;	
 };
ehaier.newIndex = {

	init : function () {

		var t = this;

		// t.bootWelcomeBanner();
		t.warnTip();
		t.bootTopBanner();
		t._indexBanner();

		t.autoW();// auto page width <>1200

		t._hoveranimate();

		t._hovertab();

	},

	_indexBanner : function () {//banner

		if ($('.slide-each').length>1) {

			var $thumbH = '<p class="p-slide-thumb">';

			var len = $('.slide-each').length;

			for (var i = len; i--;) {

				$thumbH += '<span class="s-thumb"></span>';

			}

			$thumbH += '</p><p class="wrapper p-slide-btn"><span class="s-thumb-next"></span></p>';

			$('.main-banner').append($thumbH);

			setTimeout(function () {

				$('.main-banner').soTend({

					moveWrap : '.banner-slidewrap',

					obj : '.slide-each',

					thumb : '.p-slide-thumb .s-thumb',

					thumbNowClass : 's-thumb-now',

					btnPrev : '.s-thumb-prev',

					btnNext : '.s-thumb-next'

				});

			},2500);

		}

	},

	autoW : function () {// page width two size: 1200 || 1000

		function autoAjustWidthIndex() {

		wW = $(window).width();

			if (wW<1200) {

				$('.resize-item').each(function(){

					$(this).width($(this).attr('rewidth'));

					$(".resize-item img").css('left',"-20px");

				})

			}else {

				$('.resize-item').each(function(){

					$(this).width($(this).attr('width'));

					$(".resize-item img").css('left',"0px");

				})

			}

		}

		autoAjustWidthIndex();

		$(window).resize(function () {

			autoAjustWidthIndex();

		});

	},

	_hoveranimate : function () {

		$(".resize-item").hover(function(){

			var index = $(".resize-item").index(this);

			if (wW<1200) {

				var mleft="-30px";

			}else {

				var mleft="-10px";

			}

			$(".resize-item img").eq(index).animate({ 

				left: mleft

			}, 200 );

		},function(){

			var index = $(".resize-item").index(this);

			if (wW<1200) {

				var mleft="-20px";

			}else {

				var mleft="0px";

			}

			$(".resize-item img").eq(index).animate({ 

				left: mleft

			}, 200 );

		});

	},

	_hovertab : function () {

		$(".dl-recom-item").hover(function(){

			var index=$(".dl-recom-item").index(this);

			$('.dl-recom-item').removeClass('dl-recom-item-over');

			if (index>0){

				$('.dl-recom-item').eq(index).addClass('dl-recom-item-over');

			}

			$('.ul-excel').hide();

			$('.ul-excel').eq(index).show();

		});

	},
	bootWelcomeBanner: function () {
		Cookie.once('isWelcomBanner',true, '1', function () {
			$.get('/tpl/welcomeBanner/welcomeBanner.html').done(function(data){
				$(data).appendTo('body');
			});		
		});	
	},
	bootTopBanner: function () {
		var html = '';
		if ( !!ehaier.indexparam && !!ehaier.indexparam.adLink && !!ehaier.indexparam.adImg ) {
			html = '<a href="' + ehaier.indexparam.adLink + '" target="_blank" style="display: block;width: 100%;height: 80px;'+
				   'background: url(' + ehaier.indexparam.adImg + ') no-repeat top center;"></a>';
			$('body').prepend(html);
		}
	},

	warnTip : function(){
		var tipHTML = '<div id="message" class="message_box" style="bottom:0px;">' +
					  	'<span class="message_close">' +
					  		'<img src="http://cdn09.ehaier.com/v5/images/gg_03.png" height="7" width="7">' + 
					  	'</span>' + 
					  	'<a href="http://www.ehaier.com/article/679.html?ebi=ref-ixv5-8-main-2-1" class="message_con" target="_blank">关于不法分子假借海尔及海尔商城名义欺诈的公告</a>' +
					  '</div>';
		var message_box = {
			border: '#f19149 1px solid',
			width: '260px',
			height: '119px',
			position: 'fixed',
			background: 'url(http://cdn09.ehaier.com/v5/images/gg_07.jpg) no-repeat 30px center #fff',
			right: '65px',
			bottom: '5px',
			'z-index': 99
		},
		message_close = {
		    cursor: 'pointer',
		    position: 'absolute',
		    right: '15px',
		    top: '5px'
		},
		message_con = {
			'font-weight': 'bold',
			'font-size': '1.1em',
			color:'#000',
			display: 'block',
			width: '147px',
			height: '29px',
			position: 'absolute',
			top: '42px',
			right: '30px'
		};
		var parentEle = $(tipHTML).appendTo('body').css(message_box),
			closeBtn  = parentEle.find('.message_close').css(message_close),
			msgCon    = parentEle.find('.message_con').css(message_con);
		closeBtn.bind('click', function() { parentEle.hide(); });
		if (ehaier.tool.ie6) {
			$('body').css('position','relative');
			parentEle.css('position','absolute');
			var bottomVal = $(document).height() - $(window).height() - $(window).scrollTop() + 5;
			parentEle.css('bottom', bottomVal);
			$(window).scroll(function(){
				// The number 3 is a offset 
				var bottomVal = $(document).height() - $(window).height() - $(window).scrollTop() + 5;
				parentEle.css('bottom', bottomVal);
			});
		}

	}
}



$(function () {

	ehaier.newIndex.init(); // do

});





