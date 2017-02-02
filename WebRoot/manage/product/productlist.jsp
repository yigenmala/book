<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>网上书店系统管理后台</title>
	<link href="style/authority/main_css.css" rel="stylesheet" type="text/css" />
	<link href="style/authority/zTreeStyle.css" rel="stylesheet" type="text/css">

</head>
<body >
    
    <%@ include file="../head.jsp" %>
    
    
    <!-- side menu start -->
	
	<%@ include file="../left.jsp" %>
	
    <!-- side menu start -->
   
    <div id="main">
   
      	

	<table width="100%" border="0" align="center" cellpadding="0" cellspacing="1" bgcolor="d5d4d4" >
  <tr>
    <td height="22" colspan="4" background="images/bg.gif" bgcolor="#FFFFFF" class="STYLE3"><div align="center">${title }</div></td>
  </tr>
  <tr>
    <td colspan="4" bgcolor="#FFFFFF" class="STYLE1">
    
    <form action="${url }" method="post">
    <input class='btn btn-primary' type='button' value="添加新产品"  onclick="javascript:window.location.href='${url2 }add.action';"/>
&nbsp;&nbsp;&nbsp;&nbsp;
产品名：<input name="pname" type="text"  value="${pname }">
<input type="submit"  value="查询"/>
</form>
</div>
<TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=1>
  	
  	<TR >
    <TD align="center" >一级分类</TD>
    <TD align="center" >二级分类</TD>
    <TD align="center" >供应商</TD>
    <TD align="center" >产品名</TD>
    <TD align="center" >原价</TD>
    <TD align="center" >促销价</TD>
    <TD align="center" >精品推荐</TD>
    <TD align="center" >销量</TD>
    <TD align="center" >添加时间</TD>
    <TD align="center" >操作</TD>
    
   
    </TR>
    <c:forEach items="${list}"  var="bean">

    <TR >
    
    <TD align="center" >
    ${bean.fenlei.fenlei.fname }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.fenlei.fname }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.gys.gname }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.pname }&nbsp; 
    </TD>
    <TD align="center" >
    ￥${bean.price1 }&nbsp; 
    </TD>
    <TD align="center" >
    ￥${bean.price2 }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.tuijian }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.xiaoliang }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.createtime }&nbsp; 
    </TD>
    
	<TD align="center" >
    <a href="../indexmethod!product.action?id=${bean.id }" target="_blank" >查看</a> &nbsp; &nbsp; &nbsp;
  	<a href="${url2 }update.action?id=${bean.id }">修改</a> &nbsp; &nbsp; &nbsp;
  	<a href="${url2 }delete.action?id=${bean.id }" onclick="return confirm('确定要删除吗?'); ">删除</a>&nbsp; &nbsp; &nbsp;
  	<a href="${url2 }update3.action?id=${bean.id }" >产品信息介绍</a>&nbsp; &nbsp; &nbsp;
  	<c:if test="${bean.tuijian=='未推荐'}">
    <a href="${url2 }delete2.action?id=${bean.id }" onclick="return confirm('确定要推荐吗?'); ">精品推荐</a>&nbsp; &nbsp; &nbsp;
    </c:if>
    <c:if test="${bean.tuijian=='已推荐'}">
    <a href="${url2 }delete3.action?id=${bean.id }" onclick="return confirm('确定要取消推荐吗?'); ">取消推荐</a>&nbsp; &nbsp; &nbsp;
    </c:if>
    </TD>
    
   
    </TR>
    </c:forEach>
    
    <TR >
    <TD align="center" colspan="21" >${pagerinfo }</TD>

  	
    </TR>
    
    
    </TABLE>
    
    </td>
  </tr>
</table>


    </div>

</body>
</html>
