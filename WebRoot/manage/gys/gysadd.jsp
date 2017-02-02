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
    
   
   <script language="javascript" type="text/javascript">

function checkform()
{

	if (document.getElementById('gnameid').value=="")
	{
		alert("供应商名称不能为空");
		return false;
	}
	
	return true;
	
}


</script>
    
    <!-- side menu start -->
	
	<%@ include file="../left.jsp" %>
	
    <!-- side menu start -->
   
    <div id="main">
   
      	

	<div id="container">
		<div id="nav_links" align="center">
			当前位置：${title }
			
		</div>
		<br/>
		<div class="ui_content">
			
			<form action="${url }" method="post" onsubmit="return checkform()">
<TABLE cellSpacing=0 cellPadding=0 width="100%" align=center border=1>
  	
  	<TR height=>
    <TD align="center" >供应商名称:</TD>
    <TD align="center"> 
    <input  type="text" name="gname"  id='gnameid'  size="30"  />
 
    </TD>
    </TR>
    
    <TR height=>
    <TD align="center" >地址:</TD>
    <TD align="center"> 
    <input  type="text" name="dizhi"  id='dizhiid'  size="30"  />
 
    </TD>
    </TR>
    
    <TR height=>
    <TD align="center" >电话:</TD>
    <TD align="center"> 
    <input  type="text" name="dianhua"  id='dianhuaid'  size="30"  />
 
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
