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
   
      	

	<div id="container">
		<div id="nav_links" align="center">
			当前位置：${title }
			
		</div>
		<div class="ui_content">
			
			<form action="${url }" method="post" onsubmit="return checkform()"  enctype="multipart/form-data">
<TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=1>
  
  
  	
  	
    <TR height=>
    <TD align="center" >产品信息:</TD>
    <TD align="center"> 
    <textarea id="content1" name="content1" style="display: none;">${bean.info }</textarea>
				<iframe ID="eWebEditor" src="<%=basePath %>editor/ewebeditor.htm?id=content1" frameborder="0" scrolling="no" width="950" height="350"></iframe>
 
    </TD>
    </TR>
    
   
  

    <TR height=>
    <TD align="center" > 操作：</TD>
    <TD align="center"> 
     <input type="submit" value="提交" style="width: 60px" />
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	 <input  onclick="javascript:history.go(-1);" style="width: 60px" type="button" value="返回" />
    
    </TD>
    </TR>
    
    </TABLE>
    </form>
		
		</div>
	</div>


    </div>

</body>
</html>
