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
		
		
		
	
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				商品详情
			</H2>
			<form action="indexmethod!register" method="post" onsubmit="return checkform()">
    	<table align="center" border="1"  width="100%">
    	
    	<tr>
    	<td colspan="2" align="center">  
    	<a href="indexmethod!gouwucheadd.action?id=${product.id }"><img src="images/gwc.jpg" border="0"></img></a>
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center" width="40%">
    	<span style="font-weight: bold;font-size: 15px;">产品名:</span>
    	</td>
    	<td>
    	${product.pname }
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">产品分类:</span>
    	</td>
    	<td>
    	${product.fenlei.fenlei.fname }---${product.fenlei.fname }
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">供应商:</span>
    	</td>
    	<td>
    	${product.gys.gname }
    	</td>
    	</tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">原价:</span>
    	</td>
    	<td>
    	￥${product.price1 }
    	</td>
    	</tr>
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">促销价:</span>
    	</td>
    	<td>
    	<span style="color: red;font-weight: bold;">￥${product.price2 }</span>
    	</td>
    	</tr>
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">销量:</span>
    	</td>
    	<td>
    	${product.xiaoliang }
    	</td>
    	</tr>
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">图片:</span>
    	</td>
    	<td>
    	<IMG  src="<%=basePath %>/uploadfile/${product.imgpath }" width=300 height=300 />
    	</td>
    	</tr>
    	<tr>
    	
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 15px;">产品信息:</span>
    	</td>
    	<td>
    	${product.info }
    	</td>
    	</tr>
    	
    	<tr>
    	<td colspan="2" align="center">  
    	<a href="indexmethod!gouwucheadd.action?id=${product.id }"><img src="images/gwc.jpg" border="0"></img></a>
    	</td>
    	</tr>
    	
    	</table>
    	
    	</form>
			
			
			
			
			
			
			
			
			
			
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
		
		<SCRIPT language=javascript type=text/javascript>var memberDomain = 'http://member.ehaier.com';</SCRIPT>
		
		
	<SCRIPT type=text/javascript src="_files/jquery-1.8.2.min.js"></SCRIPT>	
		

	<SCRIPT type=text/javascript src="_files/base.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/index.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/head.min.js"></SCRIPT>
		
		
		
	</BODY>
</HTML>

