<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page import="com.util.Util"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			
			
			Util.init(request);
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
		
		
		
		<SCRIPT language=javascript type=text/javascript>var memberDomain = 'http://member.ehaier.com';</SCRIPT>

		<DIV class="wrapper clearfix main-banner">
			<DIV class="delaybox banner-slidewrap">
				
				
				 <%
org.springframework.web.context.WebApplicationContext app2 = org.springframework.web.context.support.WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());

com.dao.PicDao picDao = (com.dao.PicDao) app2.getBean("picDao");

List<com.model.Pic> piclist = picDao.selectBeanList(0,9999,"  ");

%>
				
				<%
				for(int i=0;i<piclist.size();i++){
				%>	
					
					<DIV class="slide-each slide-each-<%=i+1 %>">
					<A href="<%=piclist.get(i).getHref() %>" rel=nofollow  target=_blank >
					<%
					if(i==0){
					%>
					<IMG class=child0 src="uploadfile/<%=piclist.get(i).getPath() %>"    width=1600 height=425>
					<% 	
					}else{
					%>
					<IMG class=child0 src="_files/blank(1).png" width=1600 height=425 src3="uploadfile/<%=piclist.get(i).getPath() %>">
					<%
					}
					%>
					
					</A>
				</DIV>
					
					
				<%	
				}
				
				%>
				
				
				
				
				
			</DIV>
		</DIV>
		
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				<a href="indexmethod!productlist.action?tuijian=1">精品推荐</a>
			</H2>
			
			
			<UL style="DISPLAY: block" class="ul-excel ul-excel-1">
				<!--2-0-->
				
				<c:forEach items="${tuijianlist}" var="tuijian">
				<LI class=li-excel>
					<H4 class=h4-pro-title>
						<A href="indexmethod!product.action?id=${tuijian.id }" 
						target=_blank ><SPAN class=a-title>产品名：${tuijian.pname }</SPAN>
						<SPAN class=s-abs >${tuijian.fenlei.fenlei.fname }--${tuijian.fenlei.fname }</SPAN>
						</A><EM class=em-price>价格：￥${tuijian.price2 }</EM>
					</H4>
					<A class=a-thumb href="indexmethod!product.action?id=${tuijian.id }" target=_blank >
					<IMG  src="<%=basePath %>/uploadfile/${tuijian.imgpath }" width=288 height=288 />
					</A>
					
				</LI>
				</c:forEach>
				
				
				
				
				
				
				
				
				
				
				
			</UL>
			
			
			
			
			
			
			
			
		</DIV>
		
		
		<DIV class="wrapper lazybox index-new">
			<H2>
				<a href="indexmethod!productlist.action?type=2">新品首发</a>
			</H2>
			
			<c:forEach items="${newlist}" var="news">
			
			<DIV class=resize-item rewidth="190" width="237">
				<A href="indexmethod!product.action?id=${news.id }" rel=nofollow target=_blank >
				<IMG src="<%=basePath %>/uploadfile/${news.imgpath }" width="236" height="256" />
				</A>
			</DIV>
			</c:forEach>
			
			
		</DIV>
		
		
		<DIV class="wrapper lazybox index-diy">
			<H2>
				<a href="indexmethod!productlist.action?type=3">热销推荐</a>
			</H2>
			<c:forEach items="${hotlist}" var="hot">
			<DIV class=resize-item rewidth="190" width="237">
				<A href="indexmethod!product.action?id=${hot.id }" rel=nofollow target=_blank >
				<IMG src="<%=basePath %>/uploadfile/${hot.imgpath }" width="236" height="256" />
				</A>
			</DIV>
			</c:forEach>
			
			
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
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="manage/login.jsp">管理后台</a>
				</P>
				
				
			</DIV>
		</DIV>
		
		
		<SCRIPT type=text/javascript src="_files/jquery-1.8.2.min.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/base.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/index.js"></SCRIPT>

		<SCRIPT type=text/javascript src="_files/head.min.js"></SCRIPT>
		
		

	
		
		
		
	</BODY>
</HTML>

