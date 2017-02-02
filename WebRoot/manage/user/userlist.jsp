<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
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
&nbsp;&nbsp;&nbsp;&nbsp;
用户名：<input name="username" type="text"  value="${username }">
<input type="submit"  value="查询"/>
</form>
</div>
<TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=1>
  	
  	<TR >
    <TD align="center" >用户名</TD>
    <TD align="center" >密码</TD>
    <TD align="center" >姓名</TD>
    <TD align="center" >地址</TD>
    <TD align="center" >电话</TD>

    <TD align="center" >账户状态</TD>
    <TD align="center" >消费总金额</TD>
    <TD align="center" >是否会员</TD>
    <TD align="center" >操作</TD>
    
   
    </TR>
    <c:forEach items="${list}"  var="bean">

    <TR >
    
    <TD align="center" >
    ${bean.username }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.password }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.truename }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.address }&nbsp; 
    </TD>
    <TD align="center" >
    ${bean.phone }&nbsp; 
    </TD>
    
     <TD align="center" >
     <c:if test="${bean.deletestatus==0}">
 正常使用
 </c:if>
  	<c:if test="${bean.deletestatus==1}">
 停用
 </c:if>
    </TD>
     <TD align="center" >
    ${bean.total }&nbsp; 
    </TD>
     <TD align="center" >
    <c:if test="${bean.total>=5000}">
 会员
 </c:if>
  	<c:if test="${bean.total<5000}">
 非会员
 </c:if>
    </TD>
    
	<TD align="center" >
    <c:if test="${bean.deletestatus==0}">
 <a onclick="return confirm('确定要停用吗？');" class=cmdField href="${url2 }delete.action?id=${bean.id }">停用</a>
 </c:if>
  	<c:if test="${bean.deletestatus==1}">
 <a onclick="return confirm('确定要启用吗？');" class=cmdField  href="${url2 }delete2.action?id=${bean.id }">启用</a>
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
