
function f_lzhd_loadJS(url,success){var domScript=document.createElement('script');domScript.src=url;success=success||function(){};domScript.onload=domScript.onreadystatechange=function(){if(!this.readyState||'loaded'===this.readyState||'complete'===this.readyState){success();this.onload=this.onreadystatechange=null;this.parentNode.removeChild(this);}};document.getElementsByTagName('head')[0].appendChild(domScript);}
var lzhd_obj=new Object();lzhd_obj.orderPB=new Array();window.lzhd_obj.addOrder=function(a,b){try{var tCount=1;lzhd_obj.orderPA={tOrder:a,tPrice:Number(b),tCount:tCount,userName:"",orderDetail:[]};}catch(err){return;}};window.lzhd_obj.addProduct=function(a,b,c,d,e,f,j){try{var data={orderId:a,oName:b,oId:c,oPrice:Number(d),oCount:Number(e),oItem:f,oClass:j};lzhd_obj.orderPA.orderDetail.push(data);}catch(err){return;}};window.lzhd_obj.trackOrder=function(){try{lzhd_obj.oM=new Object();lzhd_obj.oM.type="type=8";lzhd_obj.oM.domain=lzhd_obj.eM.domain;lzhd_obj.oM.uniqueId="uniqueid="+lzhd_obj.uniqueId;lzhd_obj.oM.order="order="+JSON.stringify(lzhd_obj.orderPA);lzhd_obj.oM.sessionid=lzhd_obj.eM.sessionid;f_lzhd_sendaM(lzhd_obj.oM);}catch(err){return;}};(function(){if(!window.jQuery){var url="http://liangzi1.haier.net:8099/jquery-1.8.2.min.js";f_lzhd_loadJS(url,f_lzhd_start);}
else
{f_lzhd_start();}})();jQuery(window).load(function(){var frameLength=window.frames.length;for(var i=0;i<frameLength;i++){try{jQuery(window.frames[i].document).delegate("body","mousedown",function(e){lzhd_obj.mouseX=e.screenX-lzhd_obj.offX;lzhd_obj.mouseY=e.screenY-lzhd_obj.offY;f_lzhd_sendhM_ex(lzhd_obj.mouseX,lzhd_obj.mouseY);});}catch(err){continue;}}});function f_lzhd_start(){var chara="";if(document.characterSet)
{chara=document.characterSet;}else if(document.charset)
{chara=document.charset;}
lzhd_obj.mouseX=0;lzhd_obj.mouseY=0;lzhd_obj.offX=0;lzhd_obj.offY=0;jQuery(document).mousemove(function(e){lzhd_obj.mouseX=e.pageX;lzhd_obj.mouseY=e.pageY;lzhd_obj.offX=e.screenX-e.pageX;lzhd_obj.offY=e.screenY-e.pageY;});lzhd_obj.split="***";lzhd_obj.isA=0;lzhd_obj.isL=0;lzhd_obj.isEn=false;lzhd_obj.isNew=0;lzhd_obj.uniqueId=0;lzhd_obj.sessionId=0;lzhd_obj.tOt=new Date();lzhd_obj.tIt=new Date();lzhd_obj.eM=new Object();lzhd_obj.lM=new Object();lzhd_obj.sM=new Object();lzhd_obj.hM=new Object();lzhd_obj.cPath=";path=/";lzhd_obj.bPath1="http://liangzi2.haier.net/mallsend/collect/";lzhd_obj.path_en1=lzhd_obj.bPath1+"sendEntryMessage";lzhd_obj.path_l1=lzhd_obj.bPath1+"sendLeaveMessage";lzhd_obj.path_s1=lzhd_obj.bPath1+"sendSearchMessage";lzhd_obj.path_h1=lzhd_obj.bPath1+"sendHeatMessage";var string=document.domain;var string2="";if(3==string.split(".").length)
{string2=string.substring(string.split('.')[0].length,string.length);}
else if(2==string.split(".").length)
{string2=".".concat(string);}
lzhd_obj.cDomain=";domain=".concat(string2);f_lzhd_getUniqueName();lzhd_obj.tIt=new Date();var guid=f_lzhd_newGuid();lzhd_obj.eM.type="type=1";lzhd_obj.eM.guid="guid="+guid;lzhd_obj.eM.uniqueId="uniqueid="+lzhd_obj.uniqueId;lzhd_obj.eM.domain="domain=www.ehaier.com";f_lzhd_getBrower();f_lzhd_getClassId();f_lzhd_getVname();f_lzhd_getOS();lzhd_obj.eM.isNew="newFlag="+lzhd_obj.isNew;lzhd_obj.eM.sessionid="sessionid="+lzhd_obj.sessionId;lzhd_obj.eM.url="url="+document.URL;lzhd_obj.eM.referrer="referrer="+document.referrer;var title=(jQuery.trim(document.title)!="")?document.title:document.URL;lzhd_obj.eM.title="title="+title;f_lzhd_sendeM();document.onkeydown=function(e){var keynum=0;if(window.event)
keynum=window.event.keyCode;else if(e.which)
keynum=e.which;if(keynum==116)
{if(lzhd_obj.isEn)
{lzhd_obj.isL=1;f_lzhd_leave();}}};jQuery(window).bind('beforeunload',function(){if(lzhd_obj.isL==0&&lzhd_obj.isEn)
{lzhd_obj.isL=1;f_lzhd_leave();}});jQuery(window).bind('unload',function(){if(lzhd_obj.isL==0&&lzhd_obj.isEn)
f_lzhd_leave();});jQuery(document).delegate("form","submit",function(e)
{if(jQuery(this).hasClass('hotsearch'))
{var searchkey=jQuery(this).find('input').filter('.txt-search').val();if(searchkey!="")
f_lzhd_search(searchkey);}});jQuery(document).mousedown(function(e){var x=e.pageX;var y=e.pageY;f_lzhd_sendhM_ex(x,y);});jQuery(document).delegate("a","click",function(e)
{var target=jQuery(this).attr("target");var href=jQuery(this).attr("href");if(target!="_blank"&&href!="javascript:void(0);"&&href!="#"&&href!=undefined)
{lzhd_obj.isA=1;lzhd_obj.tOt=new Date();lzhd_obj.lM.tourl="tourl="+jQuery(this).attr("href");f_lzhd_getStayTime();lzhd_obj.lM.sessionid=lzhd_obj.eM.sessionid;lzhd_obj.lM.url=lzhd_obj.eM.url;lzhd_obj.lM.referrer=lzhd_obj.eM.referrer;lzhd_obj.lM.title=lzhd_obj.eM.title;f_lzhd_sendlM(lzhd_obj.lM);}});lzhd_obj.lM.type="type=2";lzhd_obj.lM.guid=lzhd_obj.eM.guid;lzhd_obj.lM.uniqueId=lzhd_obj.eM.uniqueId;lzhd_obj.lM.domain=lzhd_obj.eM.domain;lzhd_obj.lM.vname=lzhd_obj.eM.vname;lzhd_obj.lM.browser=lzhd_obj.eM.browser;lzhd_obj.lM.classid=lzhd_obj.eM.classid;lzhd_obj.isEn=true;};function f_lzhd_sendhM_ex(x,y)
{if((x!=undefined&&x<=document.body.scrollWidth)&&(y!=undefined&&y<=document.body.scrollHeight&&y>=0)){var tempBodyX=document.body.scrollWidth/2;x=Math.floor(x-tempBodyX);y=Math.floor(y);lzhd_obj.hM=new Object();lzhd_obj.hM.type="type=4";lzhd_obj.hM.guid=lzhd_obj.eM.guid;lzhd_obj.hM.domain=lzhd_obj.eM.domain;lzhd_obj.hM.vname=lzhd_obj.eM.vname;lzhd_obj.hM.x=("x="+x);lzhd_obj.hM.y=("y="+y);lzhd_obj.hM.uniqueId=lzhd_obj.eM.uniqueId;lzhd_obj.hM.browser=lzhd_obj.eM.browser;lzhd_obj.hM.bodyX=("bodyX="+document.body.scrollWidth);lzhd_obj.hM.bodyY=("bodyY="+document.body.scrollHeight);lzhd_obj.hM.isNew=lzhd_obj.eM.isNew;lzhd_obj.hM.sessionid=lzhd_obj.eM.sessionid;lzhd_obj.hM.url=lzhd_obj.eM.url;lzhd_obj.hM.referrer=lzhd_obj.eM.referrer;f_lzhd_sendhM();}}
function f_lzhd_search(searchkey)
{lzhd_obj.sM.type="type=3";lzhd_obj.sM.guid=lzhd_obj.eM.guid;lzhd_obj.sM.searchkey="searchkey="+searchkey;lzhd_obj.sM.domain=lzhd_obj.eM.domain;lzhd_obj.sM.uniqueId=lzhd_obj.eM.uniqueId;lzhd_obj.sM.sessionid=lzhd_obj.eM.sessionid;lzhd_obj.sM.title=lzhd_obj.eM.title;f_lzhd_sendsM();}
function f_lzhd_getUniqueName()
{var uniqueName=f_lzhd_getCookie("UniqueName");if(uniqueName==0)
{lzhd_obj.isNew=1;f_lzhd_getSessionId();uniqueName=lzhd_obj.sessionId;f_lzhd_setCookie("UniqueName",uniqueName);lzhd_obj.uniqueId=uniqueName;}
else
{uniqueName=uniqueName.substr(0,36);f_lzhd_setCookie("UniqueName",uniqueName);lzhd_obj.uniqueId=uniqueName;var sessionid=f_lzhd_getCookie("ZXKJSESSIONID");if(sessionid==0)
{lzhd_obj.isNew=2;}
else
{sessionid=sessionid.substr(0,40);var session=sessionid.split(lzhd_obj.split);if(session.length==2)
{lzhd_obj.isNew=session[1];}
else
lzhd_obj.isNew=2;}
f_lzhd_getSessionId();}}
function f_lzhd_getSessionId(){var sessionid=f_lzhd_getCookie("ZXKJSESSIONID");if(sessionid==0)
{sessionid=f_lzhd_newGuid();var mix=sessionid+lzhd_obj.split+lzhd_obj.isNew;f_lzhd_setCookie_s("ZXKJSESSIONID",mix);lzhd_obj.sessionId=sessionid;}
else
{sessionid=sessionid.substr(0,40);var session=sessionid.split(lzhd_obj.split);lzhd_obj.sessionId=session[0];}}
function f_lzhd_getOS(){lzhd_obj.eM.os="os="+detectOS();}
function detectOS(){try{var sUserAgent=navigator.userAgent;var isWin=(navigator.platform==="Win32")||(navigator.platform==="Windows");var isMac=(navigator.platform==="Mac68K")||(navigator.platform==="MacPPC")||(navigator.platform==="Macintosh")||(navigator.platform==="MacIntel");var bIsIpad=sUserAgent.match(/ipad/i)==="ipad";var bIsIphoneOs=sUserAgent.match(/iphone os/i)==="iphone os";var isUnix=(navigator.platform==="X11")&&!isWin&&!isMac;var isLinux=(String(navigator.platform).indexOf("Linux")>-1);var bIsAndroid=sUserAgent.toLowerCase().match(/android/i)==="android";var bIsCE=sUserAgent.match(/windows ce/i)==="windows ce";var bIsWM=sUserAgent.match(/windows mobile/i)==="windows mobile";if(isMac)
return"Mac";if(isUnix)
return"Unix";if(isLinux){if(bIsAndroid)
return"Android";else
return"Linux";}
if(bIsCE||bIsWM){return'wm';}
if(isWin){var isWin2K=sUserAgent.indexOf("Windows NT 5.0")>-1||sUserAgent.indexOf("Windows 2000")>-1;if(isWin2K)
return"Win2000";var isWinXP=sUserAgent.indexOf("Windows NT 5.1")>-1||sUserAgent.indexOf("Windows XP")>-1;if(isWinXP)
return"WinXP";var isWin2003=sUserAgent.indexOf("Windows NT 5.2")>-1||sUserAgent.indexOf("Windows 2003")>-1;if(isWin2003)
return"Win2003";var isWinVista=sUserAgent.indexOf("Windows NT 6.0")>-1||sUserAgent.indexOf("Windows Vista")>-1;if(isWinVista)
return"WinVista";var isWin7=sUserAgent.indexOf("Windows NT 6.1")>-1||sUserAgent.indexOf("Windows 7")>-1;if(isWin7)
return"Win7";var isWin8=sUserAgent.indexOf("Windows NT 6.2")>-1||sUserAgent.indexOf("Windows 8")>-1;if(isWin8)
return"Win8";}
return"other";}catch(err)
{return"other";}}
function f_lzhd_is360()
{var z="track"in document.createElement("track"),w="scoped"in document.createElement("style"),y="v8Locale"in window;if(z&&w&&y)
return"360安全浏览器";}
function f_lzhd_getBrower(){var UA=navigator.userAgent.toLowerCase();try{if(UA.match(/opr\/([\d.]+)/)||UA.indexOf("opera")>-1)
lzhd_obj.eM.browser="browser="+"Opera";else if(UA.match(/chrome\/([\d.]+)/))
{if(UA.indexOf('bidubrowser')>-1)
lzhd_obj.eM.browser="browser="+"百度浏览器";else if(UA.indexOf('maxthon')>-1)
lzhd_obj.eM.browser="browser="+"傲游浏览器";else if(UA.indexOf('lbbrowser')>-1)
lzhd_obj.eM.browser="browser="+"猎豹浏览器";else if(UA.indexOf('ubrowser')>-1)
lzhd_obj.eM.browser="browser="+"UC浏览器";else if(UA.indexOf('qihu theworld')>-1)
lzhd_obj.eM.browser="browser="+"世界之窗浏览器";else if(UA.indexOf('theworld')>-1)
lzhd_obj.eM.browser="browser="+"世界之窗浏览器";else if(UA.indexOf('se')>-1)
lzhd_obj.eM.browser="browser="+"搜狗浏览器";else if("360安全浏览器"==f_lzhd_is360())
lzhd_obj.eM.browser="browser="+"360浏览器";else
lzhd_obj.eM.browser="browser="+"Google Chrome";}
else if(UA.match(/version\/([\d.]+)/))
lzhd_obj.eM.browser="browser="+"Safari";else if(UA.match(/firefox\/([\d.]+)/))
lzhd_obj.eM.browser="browser="+"Firefox";else if(UA.match(/msie ([\d.]+)/))
{if(UA.indexOf('qqbrowser')>-1)
lzhd_obj.eM.browser="browser="+"QQ浏览器";else if(UA.indexOf('lsie')>-1)
lzhd_obj.eM.browser="browser="+"绿色浏览器";else if(UA.indexOf('tencenttraveler')>-1)
lzhd_obj.eM.browser="browser="+"腾讯TT浏览器";else if(UA.indexOf('se')>-1)
lzhd_obj.eM.browser="browser="+"搜狗浏览器";else
{if('6.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE6";else if('7.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE7";else if('8.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE8";else if('9.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE9";else if('10.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE10";else if('11.0'==UA.match(/msie ([\d.]+)/)[1])
lzhd_obj.eM.browser="browser="+"IE11";else
lzhd_obj.eM.browser="browser="+"IE";}}
else
lzhd_obj.eM.browser="browser="+"其它";}catch(err)
{lzhd_obj.eM.browser="browser="+"其它";return;}}
function f_lzhd_newGuid()
{var guid="";for(var i=1;i<=32;i++){var n=Math.floor(Math.random()*16.0).toString(16);guid+=n;if((i==8)||(i==12)||(i==16)||(i==20))
guid+="-";}
return guid;}
function f_lzhd_getStayTime()
{var stayTime=(lzhd_obj.tOt.getTime()-lzhd_obj.tIt.getTime())/1000;lzhd_obj.lM.staytime="staytime="+stayTime.toFixed(0);}
function f_lzhd_sendhM()
{if(lzhd_obj.isEn)
{var message=f_lzhd_getMessage(lzhd_obj.split,lzhd_obj.hM);var userAgent=navigator.userAgent.toLowerCase();if(userAgent.indexOf("firefox")>-1){var url=lzhd_obj.path_h1+"?message="+encodeURIComponent(message);jQuery.ajax({url:url,crossDomain:true,async:true});}
else
f_lzhd_ajax(message,lzhd_obj.path_h1);}}
function f_lzhd_ajax(message,url)
{jQuery.ajax({url:url,contentType:"application/x-www-form-urlencoded; charset=UTF-8",type:"GET",dataType:"jsonp",jsonp:"callback",data:{message:(message)},cache:false,success:function(response){}});}
function f_lzhd_sendsM()
{if(lzhd_obj.isEn)
{var message=f_lzhd_getMessage(lzhd_obj.split,lzhd_obj.sM);f_lzhd_ajax(message,lzhd_obj.path_s1);f_lzhd_dTime();}}
function f_lzhd_sendlM()
{var message=f_lzhd_getMessage(lzhd_obj.split,lzhd_obj.lM);var userAgent=navigator.userAgent.toLowerCase();if(userAgent.indexOf("firefox")>-1){var url=lzhd_obj.path_l1+"?message="+encodeURIComponent(message);jQuery.ajax({url:url,crossDomain:true,async:false});f_lzhd_dTime();}
else
{f_lzhd_ajax(message,lzhd_obj.path_l1);f_lzhd_dTime();}}
function f_lzhd_dTime()
{var start=new Date().getTime();var timeout=0;while(timeout<150){timeout=new Date().getTime()-start;}}
function f_lzhd_sendeM()
{var message=f_lzhd_getMessage(lzhd_obj.split,lzhd_obj.eM);f_lzhd_ajax(message,lzhd_obj.path_en1);}
function f_lzhd_getClassId()
{try
{var classid=jQuery('input').filter('#YZHD_SUBMALL').val();if(classid==""||classid==undefined)
lzhd_obj.eM.classid="classid=";else
lzhd_obj.eM.classid="classid="+classid;}catch(err)
{lzhd_obj.eM.classid="classid=";return;}}
function f_lzhd_getVname()
{var vname="YZHD_USERID";vname=f_lzhd_getCookie(vname);vname==0?(lzhd_obj.eM.vname="vname="):(lzhd_obj.eM.vname="vname="+vname);}
function f_lzhd_getMessage(split,obj)
{var message="";for(var i in obj)
{message=message+obj[i]+split;}
message=message.substring(0,message.lastIndexOf(split));return message;}
function f_lzhd_setCookie_s(name,value)
{var curCookie=name+"="+escape(value);if((name+"="+escape(value)).length<=4000)
document.cookie=curCookie+lzhd_obj.cDomain+lzhd_obj.cPath;}
function f_lzhd_setCookie(name,value)
{var years=2;var exp=new Date();exp.setTime(exp.getTime()+years*365*24*60*60*1000);var curCookie=name+"="+escape(value);if((name+"="+escape(value)).length<=4000)
document.cookie=curCookie+";expires="+exp.toGMTString()+lzhd_obj.cDomain+lzhd_obj.cPath;}
function f_lzhd_getCookie(name)
{var prefix=name+"=";var cookieStartIndex=document.cookie.indexOf(prefix);if(cookieStartIndex==-1)
return 0;var cookieEndIndex=document.cookie.indexOf(";",cookieStartIndex+prefix.length);if(cookieEndIndex==-1)
cookieEndIndex=document.cookie.length;return unescape(document.cookie.substring(cookieStartIndex+prefix.length,cookieEndIndex));}
function f_lzhd_leave()
{if(lzhd_obj.isA!=1)
{lzhd_obj.tOt=new Date();lzhd_obj.lM.tourl="tourl=";f_lzhd_getStayTime();lzhd_obj.lM.sessionid=lzhd_obj.eM.sessionid;lzhd_obj.lM.url=lzhd_obj.eM.url;lzhd_obj.lM.referrer=lzhd_obj.eM.referrer;lzhd_obj.lM.title=lzhd_obj.eM.title;f_lzhd_sendlM();}};