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
				<strong class="now">我的留言</strong>
		</div>
		
		
		
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				我的留言
			</H2>
			<a href="${url2 }add.action"><span style="font-size: 15px;font-weight: bold;">添加新留言</span></a>
			
    	<table align="center" border="1"  width="100%">
    	<tr><th >留言标题</th><th >留言时间</th><th >答复状态</th><th >操作</th></tr>
    	<c:forEach items="${list}"  var="bean">
    	<tr><td align="center"><span>${bean.biaoti }</span></td><td align="center">${bean.shijian1 }</td><td align="center">${bean.zhuangtai }</td>
<td align="center">
	<a href="${url2 }update3.action?id=${bean.id }">查看留言</a> &nbsp; 
  	<a href="${url2 }delete.action?id=${bean.id }">删除</a>
</td>
</tr>
</c:forEach>

<tr><td  align="center" colspan="4"><span style="font-weight: bold;font-size: 12px;">${pagerinfo }</span></td></tr>

    	
    	
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

