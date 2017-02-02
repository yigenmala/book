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
				<strong class="now">购物车列表</strong>
		</div>
		
		<script language="javascript" type="text/javascript">

function changenum(id){
		var num = document.getElementById(id+"_num").value;
		var reg1 =  /^\d+$/;
	if (num.match(reg1) == null)
	{
		alert("购买数量必须为正整数");
		return false;
	}
		if (num == 0 )
	{
		alert("购买数量必须大于0的正整数");
		return false;
	}
		var now = new Date(); 
		var t = now.getTime()+''; 
		window.location.href="indexmethod!gouwucheupdate.action?id="+id+"&sl="+num+"&t="+t;
		
		
	}

</script>
		
		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				我的购物车
			</H2>
			
			
    	<table align="center" border="1"  width="100%">
    	<tr><th >商品名</th><th >价格</th><th >购买数量</th><th >小计</th><th >操作</th></tr>
    	<c:forEach items="${list}"  var="bean">
    	<tr>
    	<td align="center"><span>${bean.product.pname }</span></td>
    	<td align="center">￥${bean.product.price2 }</td>
    	<td align="center">
    	<input type="text" name="sl"  value="${bean.sl }" id="${bean.id }_num"  size="5"/>&nbsp;
   		<a href="javascript:;"  onclick="changenum(${bean.id })">变更</a> &nbsp;
    	</td>
    	<td align="center">￥${bean.product.price2 * bean.sl}</td>
<td align="center">
	<a href="indexmethod!gouwuchedelete.action?id=${bean.id }" onclick=" return confirm('确定要删除吗?'); ">删除</a>
</td>
</tr>
</c:forEach>

<tr>
<td  align="center" colspan="3"><span style="color: red;font-size: 25px;font-weight: bold;">
总价：￥${zongjia }
&nbsp;&nbsp;&nbsp;
<c:if test="${useruser.total>=5000}">
会员价：￥${vip }
</c:if>
</span>

</td>
<td  align="center" colspan="2"><a href="indexmethod!dingdanadd.action">
<img src="images/dingdan.jpg"></img>
</a></td>
</tr>

    	
    	
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

