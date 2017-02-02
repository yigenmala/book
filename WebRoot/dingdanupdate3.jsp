<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
				<strong class="now">订单详细信息</strong>
		</div>
		
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				订单详细信息
			</H2>
			
			 <table border="1" align="center" width="100%">
      
     

<tr><td class="time-list"><span>订单号</span></td><td align="center">${bean.orderid }</td></tr>

<tr><td class="time-list"><span>收件人姓名</span></td><td align="center">${bean.sjname }</td></tr>

<tr><td class="time-list"><span>收件人地址</span></td><td align="center">${bean.address }</td></tr>

<tr><td class="time-list"><span>收件人手机</span></td><td align="center">${bean.phone }</td></tr>

<tr><td class="time-list"><span>总价</span></td><td align="center">￥${bean.zongjia }</td></tr>

<tr><td class="time-list"><span>添加时间</span></td><td align="center">${fn:substring(bean.createtime,0, 19)}</td></tr>

<tr><td class="time-list"><span>订单状态</span></td><td align="center">${bean.status }</td></tr>

<tr><td class="time-list"><span>订单详情</span></td><td align="center">${bean.xiangqing }</td></tr>



<tr><td class="time-list"><span>操作</span></td><td align="center">

     <input  type="button" value="返回"  onclick="javascript:history.go(-1);" />
</td></tr>



      </table>
			
			
			
			
			
			
			
			
			
			
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

