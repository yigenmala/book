<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<DIV class=all-header-bar>
			<DIV class=wrapper>
				
				<A class="a-fav-ehaier js-addtofav" onclick=shoucang(document.title,window.location) href="javascript:void(0)">收藏本网站</A>
				
				<DIV class=p-header-bar>
					<UL class=ul-topnav>
						<LI >
					<c:if test="${shop==null}">
							嗨，欢迎来到网上书店系统请
							<A class=a-header-bar href="login.jsp" > 登录</A>|
							<A class=a-header-bar href="register.jsp" >
								免费注册 </A>|
								</c:if>
						<c:if test="${shop!=null}">
						嗨，欢迎${shop.truename }来到网上书店系统<A class=a-header-bar href="indexmethod!loginout.action"  onclick="return confirm('确定要退出吗?'); "> 安全退出</A>
						</c:if>
						</LI>
						<c:if test="${shop!=null}">
						<LI class=ul-pulldown>
							<A class=a-header-bar href="indexmethod!dingdanlist.action" >我的订单</A>
						</LI>
						<LI>
							|
							<A class="a-header-bar a-header-to-services" href="indexmethod!shoucanglist.action" >我的收藏</A>
							|
							<A class="a-header-bar a-header-to-services" href="indexmethod!liuyanlist.action" >我的留言</A>
							|
							<A class="a-header-bar a-header-to-services" href="indexmethod!shouhuolist.action" >收货信息</A>
							|
							<A class="a-header-bar a-header-to-services" href="indexmethod!userupdate.action" >个人信息</A>
							|
							<A class="a-header-bar a-header-to-services" href="indexmethod!userupdate3.action" >会员信息</A>
						
						</LI>
						</c:if>
					</UL>
				</DIV>
			</DIV>
		</DIV>

<script type="text/javascript" language="javascript">		
		function shoucang(sTitle,sURL) 

{ 

try 

{ 

window.external.addFavorite(sURL, sTitle); 

} 

catch (e) 

{ 

try 

{ 

window.sidebar.addPanel(sTitle, sURL, ""); 

} 

catch (e) 

{ 

alert("加入收藏失败，请使用Ctrl+D进行添加"); 

} 

} 

}
</script>		
		
		<DIV class=all-header-cont>
			<DIV class=wrapper>
				<H1 class=h1-site>
					<A  href="." ref="ixv5-1-hd-2-a-0">
					<span style="font-size: 25px;">网上书店系统</span>
					</A>
					
				</H1>
				<DIV class=all-search>
					<FORM class=hotsearch method="post" action="indexmethod!productlist.action">
						<INPUT class="txt txt-search" maxLength=50 type=text name="pname" >
						<INPUT class=btn-search value=搜索 type=submit>
					</FORM>
					
				</DIV>
				<!-- 
				<DIV class=head-promise>
					<A class="a-promise freeship" href="" rel=nofollow >全场免运费</A>
					<A class="a-promise deliverinstall"  href="" rel=nofollow >送装同步</A>
					<A class="a-promise satisfy"  href="" rel=nofollow  >满意再付款</A>
				</DIV>
				 -->
			</DIV>
		</DIV>
		
		<DIV class=mainnav>
			<DIV class="clearfix wrapper">
				<UL class=ul-mainnav>
					<LI class="li-mainnav li-mainnav-0">
						<A href="." >首页</A>
					</LI>
					
					<LI class="li-mainnav li-mainnav-2">
						<A href="indexmethod!productlist.action?type=2" >新品首发</A>
					</LI>
					<LI class="li-mainnav li-mainnav-3">
						<A href="indexmethod!productlist.action?type=3" >热销推荐</A>
					</LI>
					<LI class="li-mainnav li-mainnav-4">
						<A href="indexmethod!productlist.action?tuijian=1" >精品推荐</A>
					</LI>
				</UL>
				
				<DIV class=all-category-box>
					<DIV class=h2-all-category>
						<A class=a-all-category href="." >商品分类</A>
					</DIV>
					
					<%
org.springframework.web.context.WebApplicationContext app = org.springframework.web.context.support.WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());

com.dao.FenleiDao fenleiDao = (com.dao.FenleiDao) app.getBean("fenleiDao");

List<com.model.Fenlei> fenleilist = fenleiDao.selectBeanList(0,12," where deletestatus=0 and fenlei is null  ");

%>
  
					
					<DIV>
						<DIV class=all-category-list>
							
							<DL class=dl-category-item>
							
							<%
							if(fenleilist.size()>=1){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(0).getId() %>"  ><%=fenleilist.get(0).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(0).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
								
								
								
								<%
							if(fenleilist.size()>=2){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(1).getId() %>"  ><%=fenleilist.get(1).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(1).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
								
								
								
								
							</DL>
							
							
							<DL class=dl-category-item>
								
								<%
							if(fenleilist.size()>=3){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(2).getId() %>"  ><%=fenleilist.get(2).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(2).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
								
								
								
								
								<%
							if(fenleilist.size()>=4){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(3).getId() %>"  ><%=fenleilist.get(3).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(3).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							</DL>
							
							
							<DL class=dl-category-item>
								
								
								<%
							if(fenleilist.size()>=5){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(4).getId() %>"  ><%=fenleilist.get(4).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(4).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							
							
								<%
							if(fenleilist.size()>=6){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(5).getId() %>"  ><%=fenleilist.get(5).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(5).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							</DL>
							
							
							<DL class=dl-category-item>
								
								<%
							if(fenleilist.size()>=7){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(6).getId() %>"  ><%=fenleilist.get(6).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(6).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							
							
								<%
							if(fenleilist.size()>=8){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(7).getId() %>"  ><%=fenleilist.get(7).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(7).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							</DL>
							
							
							<DL class=dl-category-item>
								<%
							if(fenleilist.size()>=9){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(8).getId() %>"  ><%=fenleilist.get(8).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(8).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
								
								<%
							if(fenleilist.size()>=10){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(9).getId() %>"  ><%=fenleilist.get(9).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(9).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							</DL>
							
							<DL class=dl-category-item>
								<%
							if(fenleilist.size()>=11){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(10).getId() %>"  ><%=fenleilist.get(10).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(10).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							
							
							<%
							if(fenleilist.size()>=12){
							%>
							<DT class=dt-category-item>
									<A href="indexmethod!productlist.action?tid=<%=fenleilist.get(11).getId() %>"  ><%=fenleilist.get(11).getFname() %></A>
								</DT>
								<%
								List<com.model.Fenlei> fenleilist2 = fenleiDao.selectBeanList(0,9999," where deletestatus=0 and fenlei.id=   "+fenleilist.get(11).getId());
								
									
								%>
								
								<DD class=dd-category-item>
								<%
								for(com.model.Fenlei fenlei:fenleilist2){
								%>
									<A
										href="indexmethod!productlist.action?fid=<%=fenlei.getId() %>" ><%=fenlei.getFname() %></A> |
								<%	
								}
								
								%>
									
									
								</DD>
							
							<% 	
							}
							%>
							
							</DL>
							
						</DIV>
					</DIV>
					
				</DIV>
				
				<DIV class="mini-cart js_cart">
					<a href="indexmethod!gouwuchelist.action"><img src="images/gwc2.JPG"></img></a>
				</DIV>
				
			</DIV>
		</DIV>

