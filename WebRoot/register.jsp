<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
		
		<script type="text/javascript" language="javascript">

var code ; //在全局 定义验证码
function createCode(){ 
code = "";
var codeLength = 4;//验证码的长度
var checkCode = document.getElementById("checkCode");
checkCode.value = "";

var selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

for(var i=0;i<codeLength;i++) {
   var charIndex = Math.floor(Math.random()*32);
   code +=selectChar[charIndex];
}
if(code.length != codeLength){
   createCode();
}
checkCode.value = code;
}



function checkform(){

	var inputCode = document.getElementById("input1").value.toUpperCase();

if(inputCode.length <=0) {
   alert("请输入验证码！");
   return false;
}
else if(inputCode != code ){
   alert("验证码输入错误！");
   createCode();
   return false;
		
		
		
}

	if(document.getElementById("usernameid").value==""){
		
		alert('用户名不能为空');
		return false;
	}
	
	var valid = /^\w+$/;
	if(!valid.test(document.getElementById("usernameid").value)){
		alert('用户名必须是数字，字母或者下划线');
		return false;
		
	}
	
	if(document.getElementById("passwordid").value==""){
		
		alert('密码不能为空');
		return false;
	}
	
	if(document.getElementById("passwordid").value.length<6){
		
		alert('密码长度必须大于6位');
		return false;
	}
	
	if(document.getElementById("passwordid").value!=document.getElementById("password2id").value){
		
		alert('确认密码和原密码不一致');
		return false;
	}
	
	if(document.getElementById("truenameid").value==""){
		
		alert('姓名不能为空');
		return false;
	}
	
	
	if(document.getElementById("addressid").value==""){
		
		alert('地址不能为空');
		return false;
	}
	
	if(document.getElementById("phoneid").value==""){
		
		alert('手机不能为空');
		return false;
	}
	
	valid = /^0?1[3,5,8][0,1,2,3,4,5,6,7,8,9]\d{8}$/;
	
	if(!valid.test(document.getElementById("phoneid").value)){
		
		alert('请输入正确的手机格式');
		return false;
	}
	
	
	if (document.getElementById('youxiangid').value=="")
	{
		alert("注册邮箱不能为空");
		return false;
	}
 


	var reg = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z][a-z.]{2,8}$');

	if(!reg.test(document.getElementById('youxiangid').value)){
		alert("请输入正确的注册邮箱格式");
		return false;
	}
	
	if (document.getElementById('wentiid').value=="")
	{
		alert("我的问题不能为空");
		return false;
	}
	if (document.getElementById('daanid').value=="")
	{
		alert("我的答案不能为空");
		return false;
	}
	
	
	return true;

}


</script>
		
	</HEAD>
	<BODY onload="createCode();">
		<%@ include file="head.jsp" %>
		
		
		<!-- crumb  -->
		<div class="crumb" id="crumb">
				您现在的位置：<a href=".">首页</a>&gt;
				<strong class="now">新用户注册</strong>
		</div>
		
		

		
		
		<DIV class="wrapper lazybox excel-recom">
			<H2>
				新用户注册
			</H2>
			<form action="indexmethod!register.action" method="post" onsubmit="return checkform()">
    	<table align="center" border="1"  width="100%">
    	<tr>
    	<td align="center" width="40%">
    	<span style="font-weight: bold;font-size: 20px;">用户名:</span>
    	</td>
    	<td>
    	<input type="text" name="username" style="width: 300px; height: 20px;" id="usernameid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">密码:</span>
    	</td>
    	<td>
    	<input type="password" name="password" style="width: 300px;height: 20px;" id="passwordid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">确认密码:</span>
    	</td>
    	<td>
    	<input type="password" name="password2" style="width: 300px;height: 20px;" id="password2id" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">姓名:</span>
    	</td>
    	<td>
    	<input type="text" name="truename" style="width: 300px;height: 20px;" id="truenameid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">地址:</span>
    	</td>
    	<td>
    	<input type="text" name="address" style="width: 300px;height: 20px;" id="addressid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">手机电话:</span>
    	</td>
    	<td>
    	<input type="text" name="phone" style="width: 300px;height: 20px;" id="phoneid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">注册邮箱:</span>
    	</td>
    	<td>
    	<input type="text" name="youxiang" style="width: 300px;height: 20px;" id="youxiangid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">我的问题（用于密码找回）:</span>
    	</td>
    	<td>
    	<input type="text" name="wenti" style="width: 300px;height: 20px;" id="wentiid" />
    	</td>
    	</tr>
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">我的答案（用于密码找回）:</span>
    	</td>
    	<td>
    	<input type="text" name="daan" style="width: 300px;height: 20px;" id="daanid" />
    	</td>
    	</tr>
    	
    	
    
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">输入验证码:</span>
    	</td>
    	<td>
    	<input type="text"  style="width: 300px;height: 20px;" id="input1" />
    	</td>
    	</tr>
    	
    	
    
    	
    	<tr>
    	<td align="center">
    	<span style="font-weight: bold;font-size: 20px;">获取验证码:</span>
    	</td>
    	<td>
    	  <input type="text" id="checkCode" class="code" style="width: 55px" size="20" readonly="readonly"  onpaste="return false" oncontextmenu="return false" oncopy="javascript:alert('不可复制');return false;" oncut="return false" />
        <a href="####" onclick="createCode()">看不清楚</a>
    	</td>
    	</tr>
    	
    	
    	<tr>
    	
    	
    	<td colspan="2" align="center">  
    	<input type="submit" value="注册" />
    	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    	<input type="reset" value="重置" />
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

