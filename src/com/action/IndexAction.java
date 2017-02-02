package com.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.DingdanDao;
import com.dao.DingdanitemDao;
import com.dao.GouwucheDao;
import com.dao.LiuyanDao;
import com.dao.ProductDao;
import com.dao.ShoucangDao;
import com.dao.ShouhuoDao;
import com.dao.UserDao;
import com.model.Dingdan;
import com.model.Dingdanitem;
import com.model.Gouwuche;
import com.model.Liuyan;
import com.model.Product;
import com.model.Shoucang;
import com.model.Shouhuo;
import com.model.User;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Arith;
import com.util.Pager;
import com.util.Util;







public class IndexAction extends ActionSupport {

	private static final long serialVersionUID = -4304509122548259589L;
	
	
	
	private String url = "./";
	
	

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	private ProductDao productDao;
	
	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}

	
	//网站首页
	public String index() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();
		
		//精品推荐
		List<Product> tuijianlist = productDao.selectBeanList(0, 8, " where deletestatus=0 and tuijian='已推荐' order by id desc ");
		
		request.setAttribute("tuijianlist", tuijianlist);
		
		//新品推荐
		List<Product> newlist = productDao.selectBeanList(0, 5, " where deletestatus=0  order by id desc ");
		
		request.setAttribute("newlist", newlist);
		
		//热销推荐
		List<Product> hotlist = productDao.selectBeanList(0, 5, " where deletestatus=0  order by xiaoliang desc ");
		
		request.setAttribute("hotlist", hotlist);
		
		
		return "success";
	}
	
	
	//产品列表
	public String productlist() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();
		
		String pname = request.getParameter("pname");
		String fid = request.getParameter("fid");
		
		String tid = request.getParameter("tid");
		
		String type = request.getParameter("type");
		
		String tuijian = request.getParameter("tuijian");
		
		
		StringBuffer sb = new StringBuffer();
		StringBuffer url = new StringBuffer();
		sb.append(" where ");
		url.append("indexmethod!productlist.action?1=1");

		if (tid != null && !"".equals(tid)) {

			sb.append(" fenlei.fenlei.id= "+tid);
			sb.append(" and "); 
			url.append("&tid="+tid);
		}
		
		if (fid != null && !"".equals(fid)) {

			sb.append(" fenlei.id= "+fid);
			sb.append(" and "); 
			url.append("&fid="+fid);
		}
		
		if (tuijian != null && !"".equals(tuijian)) {
			
			
			
			sb.append(" tuijian= '已推荐'");
			sb.append(" and ");
			url.append("&tuijian="+1);
		}
		
		if (pname != null && !"".equals(pname)) {

			sb.append("pname like '%" + pname + "%'");
			sb.append(" and ");
			request.setAttribute("pname", pname);
		}
		
		
		if("2".equals(type)){
			sb.append("   deletestatus=0 order by  id desc ");
			url.append("&type="+2);
		}else if("3".equals(type)){
			sb.append("   deletestatus=0 order by  xiaoliang desc ");
			url.append("&type="+3);
		}else {
			sb.append("   deletestatus=0  ");
		}
		
		
		String where = sb.toString();
		int total = 0;
		if("2".equals(type)){
			total = productDao.selectBeanCount(where.replaceAll("order by  id desc", ""));
		}else if("3".equals(type)){
			total = productDao.selectBeanCount(where.replaceAll("order by  xiaoliang desc", ""));
		}else {
			total = productDao.selectBeanCount(where);
		}


		int currentpage = 1;
		int pagesize = 20;
		if (request.getParameter("pagenum") != null) {
			currentpage = Integer.parseInt(request.getParameter("pagenum"));
		}
		
		request.setAttribute("list", productDao.selectBeanList((currentpage - 1)
				* pagesize, pagesize, where));
		request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
				currentpage, url.toString(), "共有" + total + "条记录"));
		
		this.setUrl("productlist.jsp");
		return SUCCESS;
	}
	
	
	private static List<Product> suiji(List<Product> list,int num){
		Collections.shuffle(list);
		List<Product> list2 = new ArrayList<Product>();
		if(list.size()<=num){
			num = list.size();
		}
		for(int i=0;i<num;i++){
			list2.add(list.get(i));
		}
		return list2;
	}
	
	
	//跳转到查看产品详细信息页面
	@SuppressWarnings("static-access")
	public String product() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Product product = productDao.selectBean(" where id= "+request.getParameter("id"));
		request.setAttribute("product", product);
		List<Product> list = productDao.selectBeanList(0, 9999, " where  id!="+product.getId()+"  and deletestatus=0 ");
		List<Product> list2 = this.suiji(list, 10);
		request.setAttribute("list", list2);
		
		this.setUrl("product.jsp");
		return SUCCESS;
	}
	
	private UserDao userDao;
	
	
	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}
	
	private ShouhuoDao shouhuoDao;

	public ShouhuoDao getShouhuoDao() {
		return shouhuoDao;
	}

	public void setShouhuoDao(ShouhuoDao shouhuoDao) {
		this.shouhuoDao = shouhuoDao;
	}

	//用户注册操作
	public void register() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");
		response.setContentType("text/html; charset=gbk");
		
		String username = request.getParameter("username");
		
		User bean = userDao.selectBean(" where username='"+username+"'  ");
		
		if(bean!=null){
			
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('该用户名已经存在，注册失败');window.location.href='register.jsp';</script>");

			return;
		}
		bean = new User();
		String password = request.getParameter("password");
		String truename = request.getParameter("truename");
		String address = request.getParameter("address");
		String phone = request.getParameter("phone");
		String youxiang = request.getParameter("youxiang");
		String wenti = request.getParameter("wenti");
		String daan = request.getParameter("daan");
		
		bean.setAddress(address);
		bean.setCreatetime(Util.getTime());
		bean.setPassword(password);
		bean.setPhone(phone);
		bean.setRole(2);
		bean.setTruename(truename);
		bean.setUsername(username);
		bean.setYouxiang(youxiang);
		bean.setWenti(wenti);
		bean.setDaan(daan);
		
		userDao.insertBean(bean);
		Shouhuo sh = new Shouhuo();
		sh.setAddress(address);
		sh.setPhone(phone);
		sh.setTruename(truename);
		sh.setUser(bean);
		shouhuoDao.insertBean(sh);
		
		response
		.getWriter()
		.print(
				"<script language=javascript>alert('注册成功');window.location.href='login.jsp';</script>");


		
	}
	
	
	//找回密码操作
	public void password() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");
		response.setContentType("text/html; charset=gbk");
		
		String username = request.getParameter("username");
		String wenti = request.getParameter("wenti");
		String daan = request.getParameter("daan");
		String password = request.getParameter("password");
		
		User bean = userDao.selectBean(" where username='"+username+"' and deletestatus=0 and wenti='"+wenti+"' and daan='"+daan+"' ");
		
		if(bean!=null){
			
			bean.setPassword(password);
			userDao.updateBean(bean);
			
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('密码修改成功。请妥善保管');window.location.href='login.jsp';</script>");

		}else{
			response
			.getWriter()
			.print(
					"<script language=javascript>alert('用户名或者我的问题或者我的回答错误，修改失败！');window.location.href='password.jsp';</script>");
		}
		
		
	}
	
	
	
	//用户登录
		public String login() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");
			response.setContentType("text/html; charset=gbk");
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			User user = userDao.selectBean(" where username = '" + username
					+ "' and password= '" + password + "' and deletestatus=0 and role=2 ");
			if (user != null) {
				HttpSession session = request.getSession();
				session.setAttribute("shop", user);
				response
				.getWriter()
				.print(
						"<script language=javascript>window.location.href='index.action';</script>");
			} else {
				response
						.getWriter()
						.print(
								"<script language=javascript>alert('用户名或者密码错误或者账户已停用');window.location.href='login2.jsp';</script>");
			}
			return null;
		}
	//用户退出
		public void loginout() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");
			response.setContentType("text/html; charset=gbk");
			HttpSession session = request.getSession();
			session.removeAttribute("shop");
			response
			.getWriter()
			.print(
					"<script language=javascript>alert('退出成功');window.location.href='index.action';</script>");
		}
	
		
		//跳转到我的信息页面
		public String userupdate() {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");

			User bean = userDao.selectBean(" where id= "+ user.getId());
			request.setAttribute("bean", bean);
			this.setUrl("userupdate.jsp");
			return SUCCESS;
		}
		
	//修改我的信息操作
		public void userupdate2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String address = request.getParameter("address");
			String password = request.getParameter("password");
			String phone = request.getParameter("phone");
			String truename = request.getParameter("truename");
			String youxiang = request.getParameter("youxiang");
			String wenti = request.getParameter("wenti");
			String daan = request.getParameter("daan");
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			User bean = userDao.selectBean(" where id= "+ user.getId());
			bean.setAddress(address);
			bean.setPassword(password);
			bean.setPhone(phone);
			bean.setTruename(truename);
			bean.setYouxiang(youxiang);
			bean.setWenti(wenti);
			bean.setDaan(daan);
			userDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!userupdate.action';</script>");
		}
		
		
		//跳转到我的会员信息页面
		public String userupdate3() {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");

			User bean = userDao.selectBean(" where id= "+ user.getId());
			request.setAttribute("bean", bean);
			this.setUrl("userupdate3.jsp");
			return SUCCESS;
		}
		
		
		//收货信息列表
		public String shouhuolist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");

			sb.append("   user.id="+user.getId()+" order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = shouhuoDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
			request.setAttribute("list", shouhuoDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "indexmethod!shouhuolist", "共有" + total + "条记录"));
			request.setAttribute("url", "indexmethod!shouhuolist.action");
			request.setAttribute("url2", "indexmethod!shouhuo");
			this.setUrl("shouhuolist.jsp");
			return SUCCESS;

		}
	//跳转到添加收货信息页面
		public String shouhuoadd() {
			this.setUrl("shouhuoadd.jsp");
			return SUCCESS;
		}
	//添加收货信息操作
		public void shouhuoadd2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String truename = request.getParameter("truename");
			
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			Shouhuo bean = new Shouhuo();
			bean.setAddress(address);
			bean.setPhone(phone);
			bean.setTruename(truename);
			bean.setUser(user);
			
			
			shouhuoDao.insertBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!shouhuolist.action';</script>");
		}
	//跳转到更新收货信息页面
		public String shouhuoupdate() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Shouhuo bean = shouhuoDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("url", "indexmethod!shouhuoupdate2.action?id="+bean.getId());
		
			this.setUrl("shouhuoupdate.jsp");
			return SUCCESS;
		}
	//更新收货信息操作
		public void shouhuoupdate2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String address = request.getParameter("address");
			String phone = request.getParameter("phone");
			String truename = request.getParameter("truename");
			Shouhuo bean = shouhuoDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setAddress(address);
			bean.setPhone(phone);
			bean.setTruename(truename);
			shouhuoDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!shouhuolist.action';</script>");
		}
		//删除收货信息操作
		public void shouhuodelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Shouhuo bean = shouhuoDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			shouhuoDao.deleteBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!shouhuolist.action';</script>");
		}
		
		
		private GouwucheDao gouwucheDao;
		
		
		public GouwucheDao getGouwucheDao() {
			return gouwucheDao;
		}

		public void setGouwucheDao(GouwucheDao gouwucheDao) {
			this.gouwucheDao = gouwucheDao;
		}

		//购物车列表
		public String gouwuchelist() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			if(user==null){
				
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('请先登录');window.location.href='login.jsp';</script>");
				return null;
			}
			
			
			
			
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");
		

			sb.append("   user.id="+user.getId()+" order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 9999;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			List<Gouwuche> list =  gouwucheDao.selectBeanList((currentpage - 1)* pagesize, pagesize, where);
			request.setAttribute("list",list );

			double zongjia = 0;
			for(Gouwuche bean:list){
				double jiage1 = bean.getSl()*bean.getProduct().getPrice2();
				zongjia  = zongjia + jiage1;
			}
			request.setAttribute("zongjia", zongjia);
			User uu = userDao.selectBean(" where id= "+user.getId());
			if(uu.getTotal()>=5000){
				request.setAttribute("vip", Arith.mul(zongjia, 0.9));
			}
			request.setAttribute("useruser", uu);
			
			this.setUrl("gouwuchelist.jsp");
			return SUCCESS;

		}
		
		
		
		//添加到购物车操作
		public void gouwucheadd() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			if(user==null){
				
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('请先登录');window.location.href='login.jsp';</script>");
				return;
			}
			
			String pid = request.getParameter("id");
			Product p = productDao.selectBean(" where id= "+pid);
			
			
			
			
			Gouwuche bean = gouwucheDao.selectBean(" where product.id= "+pid +" and user.id= "+user.getId());
			if(bean==null){
				bean = new Gouwuche();
				bean.setCreatetime(Util.getTime());
				bean.setSl(1);
				bean.setUser(user);
				bean.setProduct(p);
				gouwucheDao.insertBean(bean);
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='indexmethod!product.action?id="+pid+"';</script>");
			}else{
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('该产品已经存在购物车中，请勿重复添加！');window.location.href='indexmethod!product.action?id="+pid+"';</script>");
			}

		}
		
		//删除购物车中的产品操作
		public void gouwuchedelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Gouwuche bean = gouwucheDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			gouwucheDao.deleteBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!gouwuchelist.action';</script>");
		}
		
		
		//修改购物车的产品数量的操作
		public void gouwucheupdate() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8");
			String sl = request.getParameter("sl");
			Gouwuche gouwuche = gouwucheDao.selectBean(" where id= "+request.getParameter("id"));

			gouwuche.setSl(Integer.parseInt(sl));

			gouwucheDao.updateBean(gouwuche);
			PrintWriter writer = response.getWriter();
			writer.print("<script  language='javascript'>alert('操作成功');" +"window.location.href='indexmethod!gouwuchelist.action'; </script>");
				
		}
		
	
		
		private DingdanDao dingdanDao;



		public DingdanDao getDingdanDao() {
			return dingdanDao;
		}

		public void setDingdanDao(DingdanDao dingdanDao) {
			this.dingdanDao = dingdanDao;
		}
		
		
	

		//跳转到客户填写收件信息页面
		public String dingdanadd() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			List<Shouhuo> list = shouhuoDao.selectBeanList(0, 9999, " where user.id=  "+user.getId());
			request.setAttribute("list", list);
			
			List<Gouwuche> list2 = gouwucheDao.selectBeanList(0, 9999, " where user.id="+user.getId());
			if(list2.size()<=0){
				HttpServletResponse response = ServletActionContext.getResponse();
				response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
				PrintWriter writer = response.getWriter();
				writer.print("<script  language='javascript'>alert('操作失败，购物车不能为空！');window.location.href='indexmethod!gouwuchelist.action'; </script>");
				return null;
			}
			
			request.setAttribute("url", "indexmethod!dingdanadd2.action");
			this.setUrl("dingdanadd.jsp");
			return SUCCESS;
		}
		
		
		//添加订单操作
		public void dingdanadd2() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			String sid = request.getParameter("sid");
			Shouhuo sh = shouhuoDao.selectBean(" where id= "+sid);
			
			String beizhu = request.getParameter("beizhu");
			String phone = sh.getPhone();
			String sjname = sh.getTruename();
			String address = sh.getAddress();
			HttpSession session = request.getSession();
			User user = (User) session.getAttribute("shop");
			User uu = userDao.selectBean(" where id= "+user.getId());
			
			Dingdan bean = new Dingdan();
			bean.setAddress(address);
			bean.setBeizhu(beizhu);
			bean.setCreatetime(new Date());
		    bean.setDeletestatus(0);
		    String orderid = new Date().getTime()+"";
			bean.setOrderid(orderid);
			bean.setPhone(phone);
			bean.setSjname(sjname);
			bean.setStatus("未处理");
			bean.setUser(user);
			
			
			List<Gouwuche> list = gouwucheDao.selectBeanList(0, 9999, " where user.id="+user.getId());
			StringBuffer sb = new StringBuffer();
			double zongjia = 0;
			for(Gouwuche g:list){
				double price = 0;
				if(uu.getTotal()<5000){
					price = g.getProduct().getPrice2();
				}else{
					price = Arith.mul(g.getProduct().getPrice2(), 0.9);
				}
				
				
				sb.append(" 产品名： "+g.getProduct().getPname() +",购买数量:"+g.getSl()  +",单价"+price 
						+",￥小计"+ (g.getSl()*price) );
				
				Product product = g.getProduct();
				product.setXiaoliang(g.getProduct().getXiaoliang()+g.getSl());
				productDao.updateBean(product);
				gouwucheDao.deleteBean(g);
				
				
				
				zongjia = zongjia+(g.getSl()*price);
				
				Dingdanitem dd = new Dingdanitem();
				dd.setOrderid(orderid);
				dd.setProduct(product);
				dd.setSl(g.getSl() );
				dd.setJine(g.getSl()*price);
				
				dingdanitemDao.insertBean(dd);
				
			}
			bean.setXiangqing(sb.toString());
			bean.setZongjia(zongjia);
			dingdanDao.insertBean(bean);
			
			
			
			
			
			response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
			PrintWriter writer = response.getWriter();
			writer.print("<script  language='javascript'>alert('操作成功');window.location.href='indexmethod!dingdanlist.action'; </script>");
			
		}
		
		//查看订单列表
		public String dingdanlist() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			HttpSession session = request.getSession();
			User user = (User) session.getAttribute("shop");
			if (user == null) {
				response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
				PrintWriter writer = response.getWriter();
				writer
						.print("<script  language='javascript'>alert('请先登录');window.location.href='login.jsp'; </script>");
				return null ;
			}
			String orderid = request.getParameter("orderid");
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			


			if (orderid != null && !"".equals(orderid)) {

				sb.append("orderid like '%" + orderid + "%'");
				sb.append(" and ");
				request.setAttribute("orderid", orderid);
			}
			
			
			sb.append(" user.id="+user.getId()+" and deletestatus=0 order by id desc ");

			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if(request.getParameter("pagenum") != null){
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			
			long total = dingdanDao.selectBeanCount(where.replaceAll("order by id desc", ""));
			List<Dingdan> list = dingdanDao.selectBeanList((currentpage-1)*pagesize, pagesize, where);
			request.setAttribute("list", list);
			String pagerinfo = Pager.getPagerNormal((int)total, pagesize, currentpage, "indexmethod!dingdanlist", "共有"+total+"条记录");
			request.setAttribute("pagerinfo", pagerinfo);
		
			request.setAttribute("list", list);
			request.setAttribute("url", "indexmethod!dingdanlist.action");
			request.setAttribute("url2", "indexmethod!dingdan");
			request.setAttribute("title", "订单列表");
			this.setUrl("dingdanlist.jsp");
			return SUCCESS;
		}
		
		//跳转到订单详细信息页面
		public String dingdanupdate3(){
			HttpServletRequest request = ServletActionContext.getRequest();

			String id = request.getParameter("id");
			Dingdan bean =dingdanDao.selectBean(" where id= "+id );
			request.setAttribute("bean", bean);
			this.setUrl("dingdanupdate3.jsp");
			return SUCCESS;
		}
		
	
	
		//跳转到直接购买页面
		public String dingdanadd3() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			if (user == null) {
				response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
				PrintWriter writer = response.getWriter();
				writer
						.print("<script  language='javascript'>alert('请先登录');window.location.href='login.jsp'; </script>");
				return null ;
			}
			
			List<Shouhuo> list = shouhuoDao.selectBeanList(0, 9999, " where user.id=  "+user.getId());
			request.setAttribute("list", list);
			
			String pid = request.getParameter("pid");
			Product pro  = productDao.selectBean(" where id= "+pid);
			
			request.setAttribute("pro", pro);
			this.setUrl("dingdanadd3.jsp");
			return SUCCESS;
		}
		
		
		//添加订单操作
		public void dingdanadd4() throws IOException{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			String sid = request.getParameter("sid");
			Shouhuo sh = shouhuoDao.selectBean(" where id= "+sid);
			
			String pid = request.getParameter("pid");
			
			String beizhu = request.getParameter("beizhu");
			String phone = sh.getPhone();
			String sjname = sh.getTruename();
			String address = sh.getAddress();
			HttpSession session = request.getSession();
			User user = (User) session.getAttribute("shop");

			Dingdan bean = new Dingdan();
			bean.setAddress(address);
			bean.setBeizhu(beizhu);
			bean.setCreatetime(new Date());
		    bean.setDeletestatus(0);
		    String orderid = new Date().getTime()+"";
			bean.setOrderid(orderid);
			bean.setPhone(phone);
			bean.setSjname(sjname);
			bean.setStatus("未处理");
			bean.setUser(user);
			
			
			Product product = productDao.selectBean(" where id= "+pid);
			product.setXiaoliang(product.getXiaoliang()+1);
			productDao.updateBean(product);
			
			
			
			String xiangqing = " 产品名： "+product.getPname() +",购买数量:1,单价"+product.getPrice2() +",￥小计"+ (product.getPrice2()) ;
			
			
			bean.setXiangqing(xiangqing);
			bean.setZongjia(product.getPrice2());
			dingdanDao.insertBean(bean);
			
			
			Dingdanitem dd = new Dingdanitem();
			dd.setOrderid(orderid);
			dd.setProduct(product);
			dd.setSl(1);
			dd.setJine(product.getPrice2());
			
			dingdanitemDao.insertBean(dd);
			
			
			
			
			
			
			response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
			PrintWriter writer = response.getWriter();
			writer.print("<script  language='javascript'>alert('操作成功');window.location.href='indexmethod!dingdanlist.action'; </script>");
			
		}
	
		
		private ShoucangDao shoucangDao;



		public ShoucangDao getShoucangDao() {
			return shoucangDao;
		}

		public void setShoucangDao(ShoucangDao shoucangDao) {
			this.shoucangDao = shoucangDao;
		}
		
		
		//添加到收藏夹操作
		public void shoucangadd() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			if(user==null){
				
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('请先登录');window.location.href='login.jsp';</script>");
				return;
			}
			
			String pid = request.getParameter("id");
			Product p = productDao.selectBean(" where id= "+pid);
			
			
			
			
			Shoucang bean = shoucangDao.selectBean(" where product.id= "+pid +" and user.id= "+user.getId());
			if(bean==null){
				bean = new Shoucang();
				bean.setCreatetime(Util.getTime());
				bean.setUser(user);
				bean.setProduct(p);
				shoucangDao.insertBean(bean);
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('收藏成功');window.location.href='indexmethod!product.action?id="+pid+"';</script>");
			}else{
				response
				.getWriter()
				.print(
						"<script language=javascript>alert('该产品已经存在收藏夹中，请勿重复收藏！');window.location.href='indexmethod!product.action?id="+pid+"';</script>");
			}

		}
		
		
		//收藏信息列表
		public String shoucanglist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");

			sb.append("   user.id="+user.getId()+" order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = shoucangDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
			request.setAttribute("list", shoucangDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "indexmethod!shoucanglist", "共有" + total + "条记录"));
			request.setAttribute("url", "indexmethod!shoucanglist.action");
			request.setAttribute("url2", "indexmethod!shoucang");
			this.setUrl("shoucanglist.jsp");
			return SUCCESS;

		}
	
		//删除收藏信息操作
		public void shoucangdelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Shoucang bean = shoucangDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			shoucangDao.deleteBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!shoucanglist.action';</script>");
		}
		
		
		private LiuyanDao liuyanDao;



		public LiuyanDao getLiuyanDao() {
			return liuyanDao;
		}

		public void setLiuyanDao(LiuyanDao liuyanDao) {
			this.liuyanDao = liuyanDao;
		}
		
		
		//留言信息列表
		public String liuyanlist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");

			sb.append("   user.id="+user.getId()+" order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = liuyanDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
			request.setAttribute("list", liuyanDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "indexmethod!liuyanlist", "共有" + total + "条记录"));
			request.setAttribute("url", "indexmethod!liuyanlist.action");
			request.setAttribute("url2", "indexmethod!liuyan");
			this.setUrl("liuyanlist.jsp");
			return SUCCESS;

		}
	//跳转到添加留言信息页面
		public String liuyanadd() {
			this.setUrl("liuyanadd.jsp");
			return SUCCESS;
		}
	//添加留言信息操作
		public void liuyanadd2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String biaoti = request.getParameter("biaoti");
			String neirong = request.getParameter("neirong");
			
			HttpSession session = request.getSession();
			User user = (User)session.getAttribute("shop");
			Liuyan bean = new Liuyan();
			bean.setBiaoti(biaoti);
			bean.setNeirong(neirong);
			bean.setShijian1(Util.getTime());
			bean.setZhuangtai("未答复");
			
			bean.setUser(user);
			
			
			liuyanDao.insertBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!liuyanlist.action';</script>");
		}
	
		//删除留言信息操作
		public void liuyandelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Liuyan bean = liuyanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			liuyanDao.deleteBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='indexmethod!liuyanlist.action';</script>");
		}
		
		
		
		//跳转到查看留言页面
		public String liuyanupdate3(){
			HttpServletRequest request = ServletActionContext.getRequest();

			String id = request.getParameter("id");
			Liuyan bean =liuyanDao.selectBean(" where id= "+id );
			request.setAttribute("bean", bean);
			this.setUrl("liuyanupdate3.jsp");
			return SUCCESS;
		}
		
		
		private DingdanitemDao dingdanitemDao;



		public DingdanitemDao getDingdanitemDao() {
			return dingdanitemDao;
		}

		public void setDingdanitemDao(DingdanitemDao dingdanitemDao) {
			this.dingdanitemDao = dingdanitemDao;
		}
}
