<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!-- saved from url=(0063)http://www.ehaier.com/product/4582.html?ebi=ref-ixv5-5-main-1-1 -->
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">


<title>商品详情</title>
<link type="text/css" rel="stylesheet" media="all" href="_files2/base-1000.css">
<link type="text/css" rel="stylesheet" media="all" href="_files2/product_v4.css">




<link href="_files2/haiershangcheng.css" rel="stylesheet" type="text/css">

</head>
<body>


<!-- 公共头开始 -->

<%@ include file="head.jsp" %>








<!-- 公共头结束 -->
        <div id="gscrumb" style="display:none;">洗衣机</div>
        <input type="hidden" id="YZHD_SUBMALL" value="洗衣机">
<div class="bigwrapper">
	<div class="wrapper all-cont-box">
	
		<!-- crumb  -->
		<div class="crumb" id="crumb">
				您现在的位置：<a href=".">首页</a>&gt;
					<a href="indexmethod!productlist.action?tid=${product.fenlei.fenlei.id }">${product.fenlei.fenlei.fname }</a>&gt;
					<a href="indexmethod!productlist.action?fid=${product.fenlei.id }">${product.fenlei.fname }</a>&gt;
				<strong class="now">${product.pname }</strong>
		</div>
	
		<!-- product-info-box -->
		<div class="product-info-box clearfix">
			<!-- product-info -->
			<div class="product-info" id="product_info">
<h1 class="product-title"><span class="s-title">
${product.pname }
</span></h1>

<c:if test="${product.price1!=product.price2 }">
	<ul class="product-info-list">
	<li><span class="s-title">原  价：</span><strong class="haierred cur-price">
					￥${product.price1 }
			</strong></li>
			
		</c:if>	
	
					<li><span class="s-title">商 城 价：</span><strong class="haierred cur-price">
					￥${product.price2 }
			</strong></li>
		<li><span class="s-title">已 售 出：</span><em class="blue">${product.xiaoliang }</em></li>
		<li><span class="s-title">供 应 商：</span><em class="blue">${product.gys.gname }</em></li>
		
		
		
	</ul>
	
	<div class="deliverybox clearfix">
		
		
		
		<form action="http://www.ehaier.com/flow.php" method="POST" id="buyForm">
		
			
			<p class="p-product-btn">
							<a class="a-to-buy js_buy_now" href="indexmethod!dingdanadd3.action?pid=${product.id }" id="buy_Now">立即购买</a>
							&nbsp;&nbsp;&nbsp;&nbsp;
							<a href="indexmethod!gouwucheadd.action?id=${product.id }"><img src="images/gwc.jpg" border="0" width="120" height="40"></img></a>
							
					</p>
					
		  <p></p>
		  	
		  
		</form>
	</div>
	<p class="p-share-fav">
	
	<a class="a-fav-product" rel="nofollow" href="indexmethod!shoucangadd.action?id=${product.id }">收藏此商品</a></p>
	<br/>
	<div>
	<span style="font-size: 20px;">${product.gaishu }</span>
	
	</div>
	
			</div>
			
			
			<!-- 大图相册 -->
			<div class="product-gallerybox">
<div class="gallery-bigshow">
	<div class="gallery-showBox"> 
			<img class="img-bigshow" width="380" height="380" src="<%=basePath %>/uploadfile/${product.imgpath }" >
			

	
	
	
	</div>
	
</div>
		

</div>
		</div>
	
		
			
			
			<!-- product-info-box -->
			<div class="product-details-box">
<div class="details-bar"><div class="bfd_border_left"><div class="bfd_header">您可能还喜欢</div>
<ul class="bfd_show_list">

<c:forEach items="${list}" var="bean">
<li>
<a href="indexmethod!product.action?id=${bean.id }" target="_blank" class="bfd_img">
<img  src="<%=basePath %>/uploadfile/${bean.imgpath }">
</a>
<h3 class="bfd_title">
<a href="indexmethod!product.action?id=${bean.id }"  target="_blank">${bean.pname }</a>
</h3>
<h4 class="bfd_price">￥${bean.price2 }</h4>
</li>
</c:forEach>
</ul></div></div>

<div id="details-cont-main" class="details-cont-main">
	<div class="details-tab-title" style="position: static; left: auto; top: auto; z-index: 0;">
		<ul class="ul-details-tab">
			<li class="li-tab li-now"><h2>商品详情</h2></li>
			
		</ul>
	</div>
	
	${product.info }
	
	
	

	

	
		
	

	
	
	</div>			</div>
		
			</div>
</div>





<!--百分点代码：单品页-->



<!-- 公共尾开始 -->






<div class="lazybox all-footer">
    <div class="wrapper">
       
        <p class="p-icp">网站备案/许可证号：
            <a rel="nofollow" href="http://www.miitbeian.gov.cn/" target="_blank">XXXX号</a>
        </p>
     
        <P class=p-copyright>
					Copyright©2000-2014 网上书店系统 All Rights Reserved
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="manage/login.jsp">管理后台</a>
				</P>
    </div>
</div>







<!-- google [2] -->


<!-- 公共尾结束-->


</body></html>

