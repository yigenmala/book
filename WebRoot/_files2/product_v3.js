(function ($) {

	$.fn.get_fe_data = function(){//序列号获取表单数据

		var $named_fe = $(this).find('input,textarea,select').filter("[name!='']");

		var post_data = {};

		$named_fe.each(function(){

			var $fe = $(this);

			var tag_name = $fe.get(0).tagName.toLowerCase();

			var type = ( $fe.attr('type') || '' ).toLowerCase();

			var name = $fe.attr('name');

			

			switch( tag_name ){

				case 'input':

					switch(type){

						case 'checkbox':

							if ( $fe.is(':checked') ){

								if ( typeof post_data[name] == 'undefined' ){

									post_data[name] = [];

								}

								post_data[name].push($fe.val());

							}

							break;

						case 'radio':

							if ( $fe.is(':checked') ){

								post_data[name] = $fe.val();

							}

							break;

						default:

							post_data[name] = $fe.val();

							break;

					}

					post_data[name] = $fe.val();

					break;

				case 'textarea':

				case 'select':

					post_data[name] = $fe.val();

					break;

			}

		});

		return post_data;

	}



})(jQuery);





function loadComment(itemId) {

    var timestamp = Date.parse(new Date());

    var pi = $('#main-comments-list>div').size() + 1;

    var commentType = $("#comment-type").val();

    var ps = $("#ps").val();

    var pc = getPageCount(commentType);

    var url = ehaier.domainUrl.baseDomain + "/product/loadComment?itemId=" + itemId + "&pageId=" + pi + "&pageSize=" + ps + "&type=" + commentType + "&t=" + timestamp;

    $.get(url,

    function(result) {

        if (result.indexOf("<!--OK-->") != -1) $("#main-comments-list").append(result);

    });

    if (pi >= parseInt(pc)) {

        // 最后一页了.

        $("#more-comment").hide();

    }

}

function changeCommentDetail(obj, itemId, commentType){
	$("ul[class='tab'] li").each(function(i) {

        $(this).removeClass('curr');

    });

    $(obj).parent().addClass("curr");

    var oldType = $("#comment-type").val();

    var pi = 1;

    $("#more-comment").show("");

    var ps = $("#ps").val();

    var pc = getPageCount(commentType);

    if (pc == 0) {

        $("#main-comments-list").html("暂无评价");

    }
    
    var url =  ehaier.domainUrl.baseDomain+"/product/comment/"+itemId+".html?pageId=" + pi + "&pageSize=" + ps + "&type=" + commentType;
    
    window.location.href = url;
    $("#comment-type").val(commentType);
    
}


function changeComment(obj, itemId, commentType) {

    $("ul[class='tab'] li").each(function(i) {

        $(this).removeClass('curr');

    });

    $(obj).parent().addClass("curr");

    var oldType = $("#comment-type").val();

    var pi = 1;

    $("#more-comment").show("");

    var ps = $("#ps").val();

    var pc = getPageCount(commentType);

    if (pc == 0) {

        $("#main-comments-list").html("暂无评价");

    }

    
    var timestamp = Date.parse(new Date());
    
    var url =  ehaier.domainUrl.baseDomain+"/product/comment/"+itemId+"_byajax.html?pageId=" + pi + "&pageSize=" + ps + "&type=" + commentType;
   
    $('#commentWrapper').load(url);
//    $.get(url,
//
//    function(result) {
//
//        if (result.indexOf("<!--OK-->") != -1) $("#main-comments-list").html(result);
//
//    });

    if (pi >= parseInt(pc)) {

        // 最后一页了.

        $("#more-comment").hide();

    }

    $("#comment-type").val(commentType);

}

function getPageCount(commentType) {

    var pc = 1;

    var domId = commentType + "-count";

    var rc = $("#" + domId).val();

    var ps = $("#ps").val();

    pc = parseInt(rc / ps);

    if (rc % ps != 0) {

        pc++;

    }

    return pc;

}

function showReply(id) {

    var dom = "comment_reply_" + id;

    $("#" + dom).show();

    $("#" + dom).find('#txtrea_comment_'+id).val('');

    $("#" + dom).find('#txtrea_comment_'+id).focus();

    $("#comment_btn_" + id).hide();    

	return false;

}

function addReply(id) {

    try {
    	var mid = parent.document.getElementById('commentUserId').value;

        var mname = parent.document.getElementById('commentUserName').value;        
        
        var memberId = $('#comment_reply_memberId_'+id).val();

        	if (memberId == undefined){
        		memberId = -1;
        	}
        
        var commentId = $('#comment_reply_commentId_'+id).val();
       
        var content = $('#txtrea_comment_' + id).val();
        

    } catch(e) {

		$('#comment_reply_msg_' + id).html("请先登陆");

        ajaxLogin();

        return;

    }

if (mid == '' || mname == '') {

		ajaxLogin();

        return;

    }

    var content = $('#txtrea_comment_' + id).val();

    // if (content == '') {


    if ($.trim(content).length <= 0 || $.trim(content).length > 100) {

        $('#comment_reply_msg_' + id).html("回复内容长度在1-100个字之间");
 		
        return;

    }
     //content = content.replace('#','%23');

	$.ajax({
	    	type: "post",
	    	url: ehaier.domainUrl.baseDomain+"/product/comment/addCommentReply.html",
	    	data: "content="+content+"&comment_id="+commentId+"&member_id="+memberId+'&'+getCSRFTokenParam(),
	    	async: false,
	    	success:function(data){
	    		$("#comment_reply_msg_" + id).fadeIn().html(data.data.message);
	    		//$("#comment_reply_msg_" + id).;
	    		$("#comment_reply_" + id).hide();
	    		refrushCSRFToken(data.csrfToken);
	    	}
	    });
	setTimeout(function(){$("#comment_reply_msg_" + id).fadeOut()},5000);
}


function ajaxLogin() {
	var ajaxUrl = memberDomain+"/ajaxLogin?callback=?";
	$.getJSON(ajaxUrl, function(data){
		var ajaxPop = $.sobox.pop({
			cls:'ajax-popInfoBox',
			title : '用户登录',
			defaultShow : true,
			visibility: true,
			onlyOne : true,
			content : data.data,
			callback:function () {
				$('.ajax-popInfoBox .h2-sopop .s-title').text('用户登录');
				$('.ajax-popInfoBox').css('visibility','visible').hide().fadeIn('fast');
			}
		});
		ajaxPop.showPop();
		$('body').data('ajaxPop', ajaxPop);
	});

	//ehaier.product.js_tz_sc_toCart({ajaxUrl:"/profile.php?a=ajaxlogin"});

}


var ehaier = ehaier || {};

ehaier.product = {

	init : function () {

		var that =this;

		that.base();//基础及零碎

		that.galleryPreview();//相册滚动及放大镜

		//that._popShowGallery();//弹出窗显示相册

		that._stockMessage();//到货通知

		that._scrollTabtitle();//滚动内容tab标题

		that._scrollLoadCont();//滚动加载内容

		that._groupProScrollEvent();//套装滚动事件

		that._popGallery();

		that._sharePro();//share

	},

	base : function () {

		var that = this;

		//收藏商品

		$(document).on('click','.a-fav-product',function () {


			that.js_tz_sc_toCart({obj:this,popTitle:'.h2-popTip',css:{'width':'320px','marginLeft':'-160px'}});

			return false;

		});


		//咨询

		$('.a-link-consult').click(function () {

			that.js_tz_sc_toCart({obj:this,popTitle:'.h2-popComment',css:{'width':'610px','marginLeft':'-305px'}});

			return false;

		});



		//details-cont

		if ($('.details-cont').length) {

			$('.details-cont').soChange({

				thumbObj:'.ul-details-tab .li-tab',

				thumbNowClass:'li-now',

				slideTime:0,

				autoChange: false,

				thumbOverEvent:false

			});

		}



		if ($('.ul-rank-cont').length) {

			$('.ul-rank-cont').soChange({

				thumbObj:'.h2-rank-tab',

				thumbNowClass:'h2-rank-tab-now',

				autoChange: false,

				slideTime:0

			});

		}



	},

	_sharePro:function() {

		var proTitle = $('.product-title .s-title').text();

		var proAbs = $('.product-abs').text();

		$('.s-share').soShare({

			pic : $('.img-bigshow').attr('src'),

			content : encodeURIComponent(proTitle + ' ' + proAbs)

		});

	},

	_scrollLoadCont : function () {

		var that = this;

		if ($('.packageGroups').length) {

			var lazyCont = {one:false,two:false};

			var $tttop = parseInt($('.packageGroups').position().top);

			var ts = $(window).height()+$(window).scrollTop();

			if (ts>$tttop) {//判断采用哪种方式缓加载

				window.onload = function () {

					if (lazyCont.one===false) {loadProInfo();}

				};

			}



			$(window).bind('scroll',scrollE);



			$('.li-tab-services').click(function () {

				if (lazyCont.two === false) {

					var servicesHtml = $('#txta-services').val();

					$('.details-services').html(servicesHtml);

					lazyCont.two = true;

				}

			});

		}

		function scrollE() {

			var scrollT = parseInt($(window).scrollTop())+$(window).height();

			if ((lazyCont.one===false)&&(scrollT>$tttop)) {

				loadProInfo();

				$(window).unbind('scroll',scrollE);//解绑window scroll load事件

			}

		}



		function loadProInfo() {//执行load事件

			$('.details-proinfo').html($('#txta-proinfo').val());

			lazyCont.one = true;//不再执行标识

			loadBfdCol();//百分点推荐栏lazy处理

			//that._scrollTabtitle();//标题切换随屏滚动

		}



		//var loadn = 1;

		function loadBfdCol() {

			//console.log(loadn);

			if ($('.bfd_show_list').length) {

				$('.bfd_show_list').soLazy();

			}else {

				setTimeout(function () {

					loadBfdCol();

					//loadn++;

				},2000);

			}

		}



	},

	_scrollTabtitle : function () {//滚动内容tab标题

		if ($('.details-tab-title').length) {

			function getInfo(o) {

				return {left : o.offset().left,posLeft : o.position().left,cssPos : o.css('position'),cssTop : o.css('top'),cssLeft : o.css('left')}

			}

			var $aO = $('.details-tab-title'),$bO = $('.consult-tab-title'),$cO = $('.p-consult-link'),atop,btop,ctop;

			var $aInfo = getInfo($aO), $bInfo = getInfo($bO);

			var $aClone =$aO.clone(), $bClone = $aO.clone();





			function getAbcTop() {

				setTimeout(function () {

					atop = parseInt($('.details-cont-main').offset().top);

					btop = parseInt($bO.offset().top);

					ctop = parseInt($cO.offset().top);

					//console.log(atop+','+btop+','+ctop);

				},600);

			}



			function scrollBegin(o,oClone,oInfo,nt,aClass) {

				o.addClass(aClass).after(oClone);

				o.css({

					position:'fixed',

					top:'1px',

					left:oInfo.left,

					zIndex:'105'

				});

				var ie6 = (typeof document.body.style.maxHeight == "undefined");

				if (ie6) {//ie6事件

					o.css({position:'absolute',

						top:nt+1,

						left:oInfo.posLeft

					});

				}

			}

			function scrollEnd(o,oClone,oInfo,rClass) {

				if (oClone) {oClone.remove();}

				o.removeClass(rClass).css({

					position:oInfo.cssPos,

					left:oInfo.cssLeft,

					top:oInfo.cssTop,

					zIndex:'0'

				});

			}



			getAbcTop();



			$('.strong-comm-count').click(function () {
				$('.ul-details-tab .li-tab').eq(3).trigger('click');

				window.scrollTo(0,atop);

			});



			$aO.find('.li-tab').click(function () {

				if (parseInt($(window).scrollTop())>atop) {window.scrollTo(0,atop);}

				getAbcTop();

			});

			$bO.find('.li-tab').click(function () {

				// if (parseInt($(window).scrollTop())>btop) {window.scrollTo(0,btop);}

				$(this).siblings().removeClass('li-now').end().addClass('li-now');

				$('.details-consult').load(($(this).attr('ajaxurl')),function () {

					getAbcTop();

				});

				return false;

			});

			$(window).scroll(function () {

				var nt = parseInt($(window).scrollTop());

				if (nt>atop&&nt<btop-42) {

					scrollBegin($aO,$aClone,$aInfo,nt,'details-tab-title-scroll');

				}else {

					scrollEnd($aO,$aClone,$aInfo,'details-tab-title-scroll');

				}

				if (nt>btop&&nt<ctop-42) {

					scrollBegin($bO,$bClone,$bInfo,nt,'consult-tab-title-scroll');

				}else {

					scrollEnd($bO,$bClone,$bInfo,'consult-tab-title-scroll');

				}

			});



			// scroll tabtitle end

			$('.details-consult .p_page a').live('click',function () {

				$('.details-consult').load(this.href);

				window.scrollTo(0,btop);

				return false;

			});

			

		}

	},

	_stockMessage : function () {//到货通知

		var stockedName = $('#stockedName'),stockedMail = $('#stockedMail'),

			stockedMobile = $('#stockedMobile'),stockTip = $('#form-stockeNotice .p-messageTip');

		var stockPop = null;


		$('#stockedNotice').live('click',function (event) {

			event.preventDefault();

			if($(".s-username").length){

				stockPop = $.sobox.pop({

					type:'target',

					cls:'sopop-stockeNotice',

					title:'到货通知',

					target:'.ajax-stockeNotice'

				});

				return false;

			}else{

				ajaxLogin();

				return false;
			}
		});

		$('.ajax-stockeNotice .a-btn').click(function () {

			//var a = stockedName.val(),b = stockedMail.val(),c = stockedMobile.val(),d =$('#stockProductId').val();
			
			var c = stockedMobile.val(),d =$('#stockProductId').val();

			//if (a=='') {stockTip.text('对不起，请填写您的姓名！');return false;}

			//if (b==''||!(/^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$/.test(b))) {stockTip.text('请填写正确格式的Email！');return false;}

			if (c==''||!(/^1[3|4|5|8][0-9]\d{8}$/.test(c))) {stockTip.text('请填写正确的手机号码！');return false;}

			var $form = $("#form-stockeNotice");
			var url = $form.attr("action")+'?r='+ Number(new Date());
			var CSRFToken = $form.find("input[name='CSRFToken']").val();
			var CSRFMemKey = $form.find("input[name='CSRFMemKey']").val();

			$.post(url,{

				//'stockedName': a,

				//'stockedMail': b,

				'stockedMobile': c,

				'productId':d,
				
				'CSRFToken':CSRFToken,
				
				'CSRFMemKey':CSRFMemKey

			},function (data) {

				//console.log(data);

				//console.log(typeof(data)=='object');
				
				$form.find("input[name='CSRFToken']").val(data.csrfToken);

				if (data.success) {

					//stockedName.val('');stockedMail.val('');stockedMobile.val('');stockTip.text('');
					
					stockTip.text('');
					stockPop.removePop();
					var originMobile = $('#ajax-stockeNotice-mobile');
					if(originMobile.val()){
						stockedMobile.val(originMobile.val()); 
					}else{
						originMobile.val(stockedMobile.val());
					}
					//$("#ajax-stockeNotice-sended").val(1);//已经发送

					$.sobox.alert('您的资料已提交成功！','到货后，我们会第一时间通知您！感谢您关注海尔产品！');
					

				}else {

					stockTip.text(data.message);

				//	alert(data.message);

				}

			});



			return false;

		});

	},

	_groupProScrollEvent: function () {//套装滚动

		if ($(".group-scrollbox").length) {

			$(".group-scrollbox").each(function(){

				var _root=$(this);

				var group_list=_root.find(".group-list");

				var g_prev=_root.find(".g-prev");

				var g_next=_root.find(".g-next");

				var group_item=_root.find(".group-item");

				var group_count=group_item.length-1;

				var index_g=0;

				var left_g=0;

				var width_g=0;

				group_item.each(function(){

					width_g+=$(this).width()+30;

				})

				if (width_g>920) {

					g_next.addClass("g-next-active");

					g_next.click( function (){

						if (index_g>=group_count){ 

							g_next.removeClass("g-next-active");

						}

						else { 

							left_g += group_item.eq(index_g).width()+30;

							index_g +=1;

							g_prev.addClass("g-prev-active");

							if (index_g>=group_count){ 

								g_next.removeClass("g-next-active");

							}

						}

						group_list.animate({'left':-left_g}, "slow");

					});

					g_prev.click( function (){

						if (index_g<=0){

							g_prev.removeClass("g-prev-active");

							left_g=0;

						 }

						 else{

							index_g -=1;

							left_g -= group_item.eq(index_g).width()+30;

							g_next.addClass("g-next-active");

							if (index_g<=0){ 

								g_prev.removeClass("g-prev-active");

							}

						 }

						group_list.animate({'left':-left_g}, "slow");

					});

				}

			})

		}

	},

	js_tz_sc_toCart: function (parm) {

		var ajaxUrl = $(parm.obj).attr('href')||parm.ajaxUrl;


		$.get(ehaier.domainUrl.baseDomain + "/activity/userinit").done(function(result){
		  	// 如果已经登录则继续
		  	if (result.success && result.data.memberId ) {
			  	var ajaxPop = $.sobox.pop({

					type:'ajax',

					cls:'ajax-popInfoBox',

					visibility:false,

					ajax:{url:ajaxUrl,callback:function () {

						if ($('#ajaxLoginForm').length) {

							$('.ajax-popInfoBox .h2-sopop .s-title').text('用户登录');

							//$('.ajax-popInfoBox').css({height:'390px'});

							//setTimeout(function () {

								$('.ajax-popInfoBox').css('visibility','visible').hide().fadeIn('fast');

							//},20);

						}else {

							if ($(parm.popTitle).length) {

								//if (parm.css) {$('.ajax-popInfoBox').css(parm.css);}

								$('.ajax-popInfoBox .h2-sopop .s-title').text($(parm.popTitle).text());

								$(parm.popTitle).remove();

							}

							$('.ajax-popInfoBox').css('visibility','visible');

						}

					}}

				});

				$('body').data('ajaxPop',ajaxPop);
			} else { // 否则先登录
				ajaxLogin();
			}
		  
		});
		
	},

	galleryPreview : function () {

		//details-preview

		var page=1;var $ul=$(".ul-gallery-thumb"),$li=$(".ul-gallery-thumb .li-thumb");var $liL=$li.length;var $bigShowBox=$(".gallery-showBox");var prevBtn=$('.gallery-thumbbox .b-prev'),nextBtn=$('.gallery-thumbbox .b-next');var firstBig =$li.find("a").attr("href");var str='<div class="zoomplepopup"></div><div id="probig-preview" ><img class="img-preview" width="1024" height="1024" src="'+firstBig+'" alt="" /></div>';$bigShowBox.append(str);var $pre=$("#probig-preview");var $preimg=$(".img-preview");var $zoom=$bigShowBox.find(".zoomplepopup");var $SPage=Math.ceil($liL/5),sLong=$li.width()*5;var setmouse;function btnStyle(){if(page==1){prevBtn.removeClass('b-prev-active');}else{prevBtn.addClass('b-prev-active');};if(page==$SPage){nextBtn.removeClass('b-next-active');}else{nextBtn.addClass('b-next-active');}};btnStyle();prevBtn.click(function(){if(page>1){page--;$(".ul-gallery-thumb").animate({left:"+="+sLong})};btnStyle();return false;});nextBtn.click(function(){if(page<$SPage){page++;$(".ul-gallery-thumb").animate({left:"-="+sLong})};btnStyle();return false;});$li.mouseover(function(){var $this=$(this);setmouse=setTimeout(function(){$li.removeClass('li-now');$this.addClass('li-now');$preimg.attr("src",($this.find("a").attr("href")));$(".img-bigshow").attr("src",$this.find("img").attr("longdesc"));},200);}).mouseout(function(){clearTimeout(setmouse);}).click(function(){return false;});var zoompos={x:0,y:0};var p_w=$preimg.width();var p_h=$preimg.height();$bigShowBox.bind("mouseenter",function(g){$pre.css({visibility:"visible"});var f=$(this);var a=$(this).width(),c=$(this).height();var b=$pre.width(),d=$pre.height();$zoom.width(b*a/p_w).height(d*c/p_h).show();PositionPopupZoom(f,$zoom,g.pageX,g.pageY,p_w,p_h);f.bind("mousemove",function(h){setTimeout(function(){PositionPopupZoom(f,$zoom,h.pageX,h.pageY,p_w,p_h)},2);});}).bind("mouseleave",function(){var a=$(this);$zoom.hide();$pre.css({visibility:"hidden"});});function PositionPopupZoom(a,o,m,k,n,f){var c=a.offset().left;var i=a.offset().top;var d=o.width();var e=o.height();var l=a.width();var j=a.height();zoompos.x=m-c-(d/2);zoompos.y=k-i-(e/2);if(zoompos.x<=0){zoompos.x=0};if(zoompos.y<=0){zoompos.y=0};if(zoompos.x+d>=l){zoompos.x=l-d};if(zoompos.y+e>=j){zoompos.y=j-e};var b=n/l;var g=f/j;o.css({left:zoompos.x,top:zoompos.y});$preimg.css({left:-(zoompos.x*b),top:-(zoompos.y*g)})}

	},

	_popShowGallery : function () {

		$('.a-view-gallery').click(function () {

			$.sobox.pop({width:635,height:520,type:'target',target:'.gallery-popBox',title:$('.product-title .s-title').text()});

			return false;

		});

		var now=0,$ul=$('.pop-gallery-thumb'),$li = $('.pop-gallery-thumb li'),liLen = $li.length,

			popImgA = $('.pop-gallery-bigshow .a-bigshow'),popImg = popImgA.find('img');

			popImgA.attr('href',$li.find('a').attr('href'));

		$li.click(function () {

			var indx = $li.index(this);

			now = indx;

			$li.removeClass('li-now');

			$(this).addClass('li-now');

			var bigSrc = $(this).find('img').attr('longdesc'),bigSrcA = $(this).find('a').attr('href');

			popImg.attr('src',bigSrc);popImgA.attr('href',bigSrcA);

			return false;

		});

		$('.pop-gallery-bigshow .b-next').click(function () {

			now = (now+1)*1%liLen;

			if (now<(liLen-4)) {$ul.animate({'left':-65*now});}

			$li.eq(now).trigger('click');

		}).hoverClass('b-next-active');

		$('.pop-gallery-bigshow .b-prev').click(function () {

			now = (now+liLen-1)*1%liLen;

			if (liLen>5) {if (now>(liLen-5)) {$ul.animate({'left':-65*(liLen-5)});}else{$ul.animate({'left':-65*now});}}

			$li.eq(now).trigger('click');

		}).hoverClass('b-prev-active');

	},

	_popGallery : function () {

		var $aThumb = $('.ul-gallery-thumb .a-thumb'),urlArr = [];

		var nowIx = 0;

		var wh,imgH,btnT;



		$aThumb.each(function () {

			urlArr.push(this.getAttribute('href'));

		});

		var urlL = urlArr.length;

		$('body').append('<p class="p-gallery-show-btn"><span class="s-btn-gallery s-gallery-prev"></span><span class="s-btn-gallery s-gallery-next"></span></p>');

		var $pBtn = $('.p-gallery-show-btn');

		$('.a-view-gallery').click(function () {

			nowIx = $('.ul-gallery-thumb li').index($('.ul-gallery-thumb li.li-now')) || nowIx;

			wh = $(window).height();

			wh = wh<1240?wh:1240;

			imgH = wh-40;

			$pBtn.fadeIn();

			$.sobox.pop({

				cls:'pop-lightbox',

				width:(wh+30),height:(wh-35),

				offset:[0,8],

				showTitle : false,

				content : '<img id="img-lightbox" width="'+imgH+'" height="'+imgH+'" src="'+urlArr[nowIx]+'" alt="" /><span id="span-gallery-page"><em class="em-page-now">'+(nowIx*1+1)+'</em> / <em class="em-page-all">'+urlL+'</em></span><span class="s-loading"><img width="35" height="35" alt="" src="http://cdn09.ehaier.com/v3/images/loading.gif"></span>',

				closePop : function () {

					$pBtn.hide();

				}

			});

			return false;

		});

		$('.p-gallery-show-btn .s-gallery-next').click(function () {

			nowIx = (nowIx+1)%urlL;

			changeFunc(nowIx);

		});

		$('.p-gallery-show-btn .s-gallery-prev').click(function () {

			nowIx = (nowIx+urlL-1)%urlL;

			changeFunc(nowIx);

		});

		function changeFunc(nowIx) {

			var $img = $('<img src="'+urlArr[nowIx]+'" alt="" />');

			$('.pop-lightbox .s-loading').show();

			$img.load(function () {

				$('#img-lightbox').hide().attr('src',urlArr[nowIx]).fadeIn();

				$('.s-loading').hide();

				$('.em-page-now').html(nowIx*1+1);

			});

			$img = null;

		}

		$(window).resize(function () {//window size变化重置

			if ($('#img-lightbox').length) {

				wh = $(window).height();

				var dh = $(document).height()+10;

				wh = wh<1240?wh:1240;

				imgH = wh-40;

				$('#img-lightbox').css({'width':imgH,'height':imgH});

				$('.pop-lightbox').css({'width':(wh+30),'height':(wh-35),'marginTop':(-(wh-30)/2),'marginLeft':(-(wh+30)/2)});

				$('.so-openmask').height(dh);

			}

		});

	}

}







$(function () {

	ehaier.product.init();//product js init

});



$(function () {

/* 购物地区切换及购买 */

	(function () {

		var $_root = $('.product-info');

		var $_rootTop = $('.crumb').position().top;

		var js_pid = $_root.find('.js_pid').val();

		var js_acid = $_root.find('.js_acid').val();

		var reigonUrl = ehaier.domainUrl.baseDomain+"/outRegionJson?pid="+js_pid+'&acid='+js_acid;

		var api_change_region = '/region.php?a=selectRegion';

		var reigonData = {};



		//初始化加载地区和所有相关商品delivery信息

		$.ajax(reigonUrl,{

			dataType:'jsonp',

			success:function(data){

				reigonData = data.data;

				deliveryEvent (data.data);

			}

		});



		$('#buyActive').live('click', function() {//集合竞价提交按钮事件  **直接清空创客购物车

				if(check_region()){

					var acid=$("input[name='acid']").val();

					var num=$("input[name='num']").val();

					var canSaleFlag=$("input[name='canSaleFlag']").val();

					var cookieValue="acid:"+acid+"_num:"+num+"_canSaleFlag:"+canSaleFlag;

					//$.cookie.raw = true;

					$.cookie("ORDER_SHOW_JHJJ_PARAM", cookieValue, { path: '/', domain: ehaier.domainUrl.cookieDomain });

					

					var fe_data = $_root.get_fe_data();

					$.ajax({

						url: '/order/isShowSettlement?source=product',

						dataType: 'json',

						data: fe_data,

						success : function  (data) {

							if (data.success) {

								//$('#buyForm').submit();
								// 清空创客购物车

								window.location.href="/order.html?source=product";

							}else{

								if (data.data==0) {

									window.location.href='/';

								}else{

									$.sobox.alert('提示',data.message);

								}

							}

						}

					});

					return false;

				}else{
					return false;
				}

		});


		//立即购买（加入购物车后直接跳转到cart.html

		$('.js_buy_now').live('click',function(){directGoCart(this);});//普通流程


		$('.js_tz_toCart').live('click',function () {//组合销售 **直接清空创客购物车

			var pid = $(this).attr('pid');

			gotoCart(this,{pid:pid,allowNum:false});//销售数量只能为1

			return false;

		});

		$('.js_tz_sc_toCart').live('click',function () {//套系销售

			var pid = $(this).attr('pid');

			gotoCart(this,{pid:pid,allowNum:true});//销售数量可更改

			return false;

		});



		//加入购物车（加入购物车后跳出弹出层）

		$('.js_add_to_cart').live('click',function(){addToCart(this);});



		function deliveryEvent(data) {

			var $province = $_root.find('.js_fe_province'),$city = $_root.find('.js_fe_city'),$region = $_root.find('.js_fe_region');

			var $jieneng = $_root.find('.js_jieneng'), $isSupportCod = $_root.find('.isSupportCod');

			var js_pid = $_root.find('.js_pid').val(), js_acid = $_root.find('.js_acid').val();



			var $btn_buy_now = $_root.find('.js_buy_now');

			var $btn_add_to_cart = $_root.find('.js_add_to_cart');

			var $deliver_box = $_root.find('.deliverybox');

			var $header_curCity = $('.js-choose-city');

			var $header_curCity_name = '';



			//show and hide

			$('.p-delivery .s-location').mouseover(function () {

				$('.sel-location-box').show();

			});

			$('.fe_region').click(function () {

				$('.sel-location-box').hide();

			});

			$('.deliverybox').mouseleave(function () {

				$('.sel-location-box').hide();

			});



			//s-pro-num

			var $txtNum = $('.s-pro-num .txt-num');

			$('.s-pro-num .em-sub').click(function () {

				var nv = $txtNum.val();

				$txtNum.val(nv>1?(nv*1-1):1);

			});

			$('.s-pro-num .em-add').click(function () {

				var nv = $txtNum.val();

				$txtNum.val(nv*1+1);

			});



			var linV = 1;

			$txtNum.focus(function () {

				linV = this.value;

			}).blur(function () {

				var v = this.value;

				if (!/^[1-9]\d*$/.test(v)) {

					$.sobox.alert('提示','购买件数必须为正整数，请正确输入！');

					$(this).val(linV);

				}

			});



		//function init_region_selector (data) {



			var province_da = [];

			var city_da = [];

			var region_da = [];

			for( var i=0;i<data.length;i++ ){

				var cur_province = data[i];

				province_da.push({

					'id':cur_province.id,

					'name':cur_province.name

				});

				

				for( var j=0;j<cur_province.children.length;j++ ){

					var cur_city = cur_province.children[j];

					city_da.push({

						'id':cur_city.id,

						'name':cur_city.name,

						'fid':cur_province.id

					});

					

					for( var k=0;k<cur_city.children.length;k++ ){

						var cur_region = cur_city.children[k];

						region_da.push({

							'id':cur_region.id,

							'name':cur_region.name,

							'fid':cur_city.id

							//'url':cur_region.url

						});

					}

				}

			}

			

			//省绑定change事件


			$province.change(function(){

				var $this_sel = $(this);

				var cur_val = $this_sel.val();

				var cityHtml = '<option value="">- 请选择 -</option>';
				

				for( var i=0;i<city_da.length;i++ ){

					if( city_da[i].fid == cur_val ){

						cityHtml += '<option value="'+city_da[i].id+'">'+city_da[i].name+'</option>';

					}

				}

				$city.html(cityHtml);				

				$city.val('').change();

				$region.val('').change();

				$city.attr('disabled',(cur_val?false:true));

				$region.attr('disabled',true);

				

			});

			
		

			//城市绑定change事件

			$city.change(function(){

				var $this_sel = $(this);

				var cur_val = $this_sel.val();

				for( var i=0;i<city_da.length;i++ ){

					if (city_da[i].id == cur_val) {

						$header_curCity_name = city_da[i].name;

						break;

					}

				}

				//$region.empty();

				var regionHtml = '<option value="">- 请选择 -</option>';

				for( var i=0;i<region_da.length;i++ ){

					if( region_da[i].fid == cur_val ){

						regionHtml +='<option value="'+region_da[i].id+'">'+region_da[i].name+'</option>';

					}

				}

				$region.html(regionHtml);

				$region.val('').change().attr('disabled',(cur_val?false:true));

				

			});

			 

			//地区绑定change事件

			$region.change(function(){

				var $this_sel = $(this);

				var regionid = $this_sel.val();

				for( var i=0;i<region_da.length;i++ ){

					if( region_da[i].id == regionid ) {

						var proId = ehaier.domainUrl.productId;

						var actid = ehaier.domainUrl.actId;

						var preview = ehaier.domainUrl.preview;

						var url = memberDomain +'/changeRegionJson?id='+proId+'&regionId='+regionid;

						$.ajax(url,{

							dataType:'jsonp',

							cache : false,

							success:function(data){

								if (data.success) {

									var proLoadUrl = ehaier.domainUrl.baseDomain +'/product/changeregion/prodinfo?productId='+proId+'&regionId='+regionid+'&actId='+actid+'&preview='+preview;

									var packageUrl = ehaier.domainUrl.baseDomain+'/product/changeregion/packageinfo?productId='+proId+'&regionId='+regionid;

									$.ajax(proLoadUrl,{

										cache : false,

										dataType : 'html',

										success : function (htmlData) {

											if (htmlData=='') {

												window.location.href = 'http://www.ehaier.com/error/404.html';

											}else {

												$(".product-info").html(htmlData);

												deliveryEvent(reigonData);

												$header_curCity.html($header_curCity_name);

												ehaier.product._sharePro();//share

												$('.js-cart-num').html('0');



												//ga track

												var stock = {state:null,mes:null};

												if ($('.p-product-btn').find('#buy_Now').length>0) {

													stock.state = 1;

													stock.mes = '有货';

												}

												if ($('.p-product-btn').find('#stockedNotice').length>0) {

													stock.state = 2;

													stock.mes = '到货通知';

												}

												if ($('.p-product-btn').find('#nostock').length>0) {

													stock.state = 3;

													stock.mes = '无货';

												}

												var proTitle = $('.product-title').text();

												var location = $('.s-location').html();

												var trackData = proTitle+'-'+location+'-'+stock.mes;

												_gaq.push(['_trackEvent', 'proRegion',trackData,proTitle,stock.state]);

												_gaq.push(['_trackEvent', 'regionStock',location,stock.mes,stock.state]);

												_gaq.push(['_trackPageview',('/trackUrl/product/region-'+trackData)]);

											}

										}

										

									});

									$.ajax(packageUrl,{

										cache : false,

										dataType : 'html',

										success : function (htmlData) {

											$("#packageGroups").html(htmlData);

											ehaier.product._groupProScrollEvent();

										}

									});

								}else {

									$.sobox.alert('提示',data.message);

								}

							}

						});
						break;

					}

				}


			});

			



			//初始化数据项




			var default_id_province	= parseInt($province.data('default_id')) || '';//获得省

			var default_id_city 		= parseInt($city.data('default_id')) || '';//获得市

			var default_id_region 	= parseInt($region.data('default_id')) || '';//获得区

			$province.empty();

			var provinceHtrml = '<option value="">- 请选择 -</option>';

			for( var i=0;i<province_da.length;i++ ){

				provinceHtrml += '<option value="'+province_da[i].id+'">'+province_da[i].name+'</option>';

			}

			if (default_id_city!='') {//切换地区时省id有缓存，暂无法解决，通过市id返回查找省id

				for (var i = 0; i < city_da.length; i++) {

					if (city_da[i].id==default_id_city) {

						default_id_province = city_da[i].fid;

						break;

					}

				};	

			}



			$province.append(provinceHtrml);

			$province.val(default_id_province).change();

			$city.val(default_id_city).change();

			$region.val(default_id_region);



		}





		//检查城区

		function check_region (){

			var $region = $_root.find('.js_fe_region');

			if (parseInt($region.val())){

				return true;

			}else{

				$('.deliver-tip').addClass('red');

				$('.sel-location-box').fadeIn();

				return false;

			}

		}



		//检查节能

		function check_jieneng ( _callback ){

			var $jieneng = $_root.find('.js_jieneng')

			if ( $jieneng.val() > 0 ){

				//$.sobox.show('.subsidy-box');

				$.sobox.pop({

					cls:'subsidy-box',

					title:'节能补贴商品购买须知',

					width:480,

					content:'<div><p style="text-align: left">该产品为节能型号，下单成功后请您及时准备节能补贴资料。</p><p style="text-align: left">海尔送装人员上门时，需要您的节能补贴资料才能为您开箱安装，届时请您主动提供身份证复印件（包含正、反面）或营业执照复印件，并在《节能产品惠民工程补贴确认函》上签字确认。如您证件信息不齐全或有误，我们将无法完成送装服务。详情请查看<a href="/helpcenter.php?id=29" target="_blank" style="color:red">节能补贴实施细则</a></p><p style="font-weight:bold; text-align: left">节能补贴的商品如需退款，我们只退还您交易中实际支付的金额，节能补贴的金额不予退还。</p></div>',

					btn:[

						{text:'不接受',cls:'a-cancel'},

						{text:'接受并购买',callback:function (_params) {

						//if ( typeof _params == "function" ){_params();}

						_callback();

						}

					}]

				});

				return false;

			}else{

				_callback();

			}

		}



		//加入购物车

		function add_to_cart (d,_callback){

			var fe_data;

			if (d) {

				var num = d.allowNum?($('#buyNum').val()*1):1;

					fe_data = {id : d.pid,num :num,type : 1,acid : 0,r:Math.random()};

			}else {
				fe_data = $_root.get_fe_data();								

			}
			ehaier.base.miniCart.add(fe_data,_callback);

			flag = false;

		}



		function gotoCart(o,d) {

			var $this = $(o);

			if ( !$this.data('disable') ){

				if( check_region() ){

					check_jieneng(function(){

						add_to_cart(d,function(data){

							$('#buyNum').val(data.data.num);

							if (data.success) {
								if($('#identifier').length){
									window.location.href = '/ckcart.html';
								}else{
									window.location.href = '/cart.html';
								}
							}else {

								$.sobox.alert('提示',data.data.msg);

								return false;

							}



//							if ( typeof data.message != undefined && data.message > 0 ){

//								$.sobox.alert('出错了',data.result);

//								return false;

//							}else{

//								window.location.href = '/cart.php';

//							}

						});

					});

				}

			}

			return false;

		}


		function directGoCart(o,d) {

			var $this = $(o);

			if ( !$this.data('disable') ){

				if( check_region() ){

					check_jieneng(function(){

						add_to_cart(d,function(data){

							$('#buyNum').val(data.data.num);

							if (data.success) {

								$('.js_buy_now').die('click','**');

								if($('#identifier').length){
									window.location.href = '/ckcart.html';
								}else{
									window.location.href = '/cart.html';
								}
							}else {

								$.sobox.alert('提示',data.data.msg);

								return false;

							}

						});

					});

				}

			}

			return false;

		}

		function addToCart(o,d) {

			var $this = $(o);

			if ( !$this.data('disable') ){

				if( check_region() ){

					check_jieneng(function(){

						add_to_cart(d,function(data){

							$('#buyNum').val(data.data.num);

							if (data.success) {

								$.sobox.pop({

									cls:'pop-successCart',

									title:'加入购物车成功',

									content:data.data.msg,

									btn:[{text:'继续购物',cls:'a-cancel'},{text:'去购物车结算',cls:'a-tobuy',callback:function () {
										if($('#identifier').length){
											window.location.href='/ckcart.html';
										}else{
											window.location.href='/cart.html';
										}
									}}]

								});

							}else {

								$.sobox.alert('出错了',data.data.msg);

								return false;

							}

//							if ( typeof data.message != undefined && data.message > 0 ){

//								$.sobox.alert('出错了',data.result);

//							}else{

//								$.sobox.pop({

//									cls:'pop-successCart',

//									title:'加入购物车成功',

//									content:data.result,

//									btn:[{text:'继续购物',cls:'a-cancel'},{text:'去购物车结算',callback:function () {

//										window.location.href='/cart.php';

//									}}]

//								});

//							}

						});

					});

				}

			}

			return false;

		}



	})();



});





