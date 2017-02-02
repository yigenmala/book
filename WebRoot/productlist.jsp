<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">
<!-- saved from url=(0022)http://www.ehaier.com/ -->
<HTML xmlns="http://www.w3.org/1999/xhtml">
	<HEAD>
		<TITLE>
			网上书店系统
		</TITLE>

		<link href="main.css" rel="stylesheet" type="text/css" />
		<LINK rel=canonical href="http://www.ehaier.com/">
	</HEAD>
	<BODY>
		
		
		
		<%@ include file="head.jsp" %>
		
		
		<!-- crumb  -->
		<div class="crumb" id="crumb">
				您现在的位置：<a href=".">首页</a>&gt;
				<strong class="now">商品列表</strong>
		</div>
		

		
		
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				<a href="indexmethod!productlist.action?tuijian=1">商品列表</a>
			</H2>
			
			
			<UL style="DISPLAY: block" class="ul-excel ul-excel-1">
				<!--2-0-->
				
				<c:forEach items="${list}" var="product">
				<LI class=li-excel>
					<H4 class=h4-pro-title>
						<A href="indexmethod!product.action?id=${product.id }" 
						target=_blank ><SPAN class=a-title>产品名：${product.pname }</SPAN></A>
				
						<SPAN class=s-abs >供应商：${product.gys.gname }</SPAN>
						<EM class=em-price>价格：￥${product.price2 }</EM>
					</H4>
					<A class=a-thumb href="indexmethod!product.action?id=${product.id }" target=_blank >
					<IMG  src="<%=basePath %>/uploadfile/${product.imgpath }" width=288 height=288 />
					</A>
					
				</LI>
				</c:forEach>
				
				
				
				
				
				
				
				
				
				
				
			</UL>
			
			
			
			
			
			
			
			
		</DIV>
		
		
		
		
		
		
		

		
		
		
		<DIV class="lazybox all-footer">
			<DIV class=wrapper>
				
				<P class=p-icp>
					网站备案/许可证号：
					<A href="http://www.miitbeian.gov.cn/" rel=nofollow target=_blank
						ref="ixv5-9-9ft-4-7">XXXX号</A>
				</P>
				<P class=p-copyright>
					Copyright©2000-2014 网上书店系统 All Rights Reserved
				</P>
				
				
			</DIV>
		</DIV>
		
		
		<SCRIPT type=text/javascript src="_files/jquery-1.8.2.min.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/base.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/index.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/head.min.js"></SCRIPT>
		
		

	
		<SCRIPT language=javascript type=text/javascript>var memberDomain = 'http://member.ehaier.com';</SCRIPT>
		
		
	</BODY>
</HTML>

