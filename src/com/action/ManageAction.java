package com.action;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.dao.DingdanDao;
import com.dao.DingdanitemDao;
import com.dao.FenleiDao;
import com.dao.GysDao;
import com.dao.LiuyanDao;
import com.dao.PicDao;
import com.dao.ProductDao;
import com.dao.UserDao;
import com.dao.XiaoshouDao;
import com.model.Dingdan;
import com.model.Dingdanitem;
import com.model.Fenlei;
import com.model.Gys;
import com.model.Liuyan;
import com.model.Pic;
import com.model.Product;
import com.model.User;
import com.model.Xiaoshou;
import com.opensymphony.xwork2.ActionSupport;
import com.util.Arith;
import com.util.Pager;
import com.util.Util;

public class ManageAction extends ActionSupport {

	private static final long serialVersionUID = -4304509122548259589L;

	private UserDao userDao;

	private String url = "./";

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}


	
//管理员后台登陆
	public String login() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		User user = userDao.selectBean(" where username = '" + username
				+ "' and password= '" + password + "' and role=1");
		if (user != null) {
			HttpSession session = request.getSession();
			session.setAttribute("manage", user);
			this.setUrl("manage/index.jsp");
			return "redirect";
		} else {
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=utf-8");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('用户名或者密码错误');window.location.href='login.jsp';</script>");
		}
		return null;
	}
//用户退出
	public String loginout() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		session.removeAttribute("manage");
		this.setUrl("login.jsp");
		return SUCCESS;
	}
//跳转到修改密码页面
	public String changepwd() {
		this.setUrl("password.jsp");
		return SUCCESS;
	}
//修改密码操作
	public void changepwd2() throws IOException {
HttpServletRequest request = ServletActionContext.getRequest();
		
		HttpSession session = request.getSession();
		User u = (User)session.getAttribute("manage");
		String password1 = request.getParameter("password1");
		String password2 = request.getParameter("password2");
		User bean = userDao.selectBean(" where username= '"+u.getUsername()+"' and password= '"+password1+"'");
		if(bean!=null){
			bean.setPassword(password2);
			userDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('修改成功');window.location.href='method!changepwd.action';</script>");
		}else{
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");response.setContentType("text/html; charset=utf-8");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('用户名或者密码错误');window.location.href='method!changepwd.action';</script>");
		}
	}
	
	
	private FenleiDao fenleiDao;

	public FenleiDao getFenleiDao() {
		return fenleiDao;
	}

	public void setFenleiDao(FenleiDao fenleiDao) {
		this.fenleiDao = fenleiDao;
	}
	
	
	//分类列表
	public String fenleilist() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		
		
		StringBuffer sb = new StringBuffer();
		sb.append(" where ");

		if (fname != null && !"".equals(fname)) {

			sb.append("fname like '%" + fname + "%'");
			sb.append(" and ");
			request.setAttribute("fname", fname);
		}
		

		sb.append("   deletestatus=0 and fenlei is null order by id desc ");
		String where = sb.toString();


		int currentpage = 1;
		int pagesize = 10;
		if (request.getParameter("pagenum") != null) {
			currentpage = Integer.parseInt(request.getParameter("pagenum"));
		}
		int total = fenleiDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
		request.setAttribute("list", fenleiDao.selectBeanList((currentpage - 1)
				* pagesize, pagesize, where));
		request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
				currentpage, "method!fenleilist.action", "共有" + total + "条记录"));
		request.setAttribute("url", "method!fenleilist.action");
		request.setAttribute("url2", "method!fenlei");
		request.setAttribute("title", "分类管理");
		this.setUrl("fenlei/fenleilist.jsp");
		return SUCCESS;

	}
//跳转到添加分类页面
	public String fenleiadd() {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setAttribute("url", "method!fenleiadd2.action");
		request.setAttribute("title", "分类添加");
		this.setUrl("fenlei/fenleiadd.jsp");
		return SUCCESS;
	}
//添加分类操作
	public void fenleiadd2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		

		Fenlei bean = new Fenlei();
		bean.setFname(fname);
		
		fenleiDao.insertBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist.action';</script>");
	}
//跳转到更新分类页面
	public String fenleiupdate() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("url", "method!fenleiupdate2.action?id="+bean.getId());
		request.setAttribute("title", "分类信息修改");
		this.setUrl("fenlei/fenleiupdate.jsp");
		return SUCCESS;
	}
//更新分类操作
	public void fenleiupdate2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setFname(fname);
		fenleiDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist.action';</script>");
	}
	//删除分类操作
	public void fenleidelete() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setDeletestatus(1);
		fenleiDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist.action';</script>");
	}
	
	
	//跳转到查看分类页面
	public String fenleiupdate3() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("title", "分类信息查看");
		this.setUrl("fenlei/fenleiupdate3.jsp");
		return SUCCESS;
	}
	
	
	//二级分类列表
	public String fenleilist2() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		String fid = request.getParameter("fid");
		request.setAttribute("fid", fid);
		
		StringBuffer sb = new StringBuffer();
		sb.append(" where ");

		if (fname != null && !"".equals(fname)) {

			sb.append("fname like '%" + fname + "%'");
			sb.append(" and ");
			request.setAttribute("fname", fname);
		}
		

		sb.append("   deletestatus=0 and fenlei.id="+fid+" order by id desc ");
		String where = sb.toString();


		int currentpage = 1;
		int pagesize = 10;
		if (request.getParameter("pagenum") != null) {
			currentpage = Integer.parseInt(request.getParameter("pagenum"));
		}
		int total = fenleiDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
		request.setAttribute("list", fenleiDao.selectBeanList((currentpage - 1)
				* pagesize, pagesize, where));
		request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
				currentpage, "method!fenleilist2.action?fid="+fid, "共有" + total + "条记录"));
		request.setAttribute("url", "method!fenleilist2.action?fid="+fid);
		request.setAttribute("url2", "method!fenlei");
		request.setAttribute("title", "二级分类管理");
		this.setUrl("fenlei/fenleilist2.jsp");
		return SUCCESS;

	}
//跳转到添加二级分类页面
	public String fenleiadd10() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fid = request.getParameter("fid");
		request.setAttribute("url", "method!fenleiadd20.action?fid="+fid);
		request.setAttribute("title", "二级分类添加");
		this.setUrl("fenlei/fenleiadd10.jsp");
		return SUCCESS;
	}
//添加二级分类操作
	public void fenleiadd20() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		String fid = request.getParameter("fid");

		Fenlei bean = new Fenlei();
		bean.setFname(fname);
		bean.setFenlei(fenleiDao.selectBean(" where id= "+fid));
		
		fenleiDao.insertBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist2.action?fid="+fid+"';</script>");
	}
//跳转到更新二级分类页面
	public String fenleiupdate10() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("url", "method!fenleiupdate20.action?id="+bean.getId());
		request.setAttribute("title", "二级分类信息修改");
		this.setUrl("fenlei/fenleiupdate10.jsp");
		return SUCCESS;
	}
//更新二级分类操作
	public void fenleiupdate20() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fname = request.getParameter("fname");
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setFname(fname);
		fenleiDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist2.action?fid="+bean.getFenlei().getId()+"';</script>");
	}
	//删除二级分类操作
	public void fenleidelete10() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setDeletestatus(1);
		fenleiDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!fenleilist2.action?fid="+bean.getFenlei().getId()+"';</script>");
	}
	
	
	//跳转到查看二级分类页面
	public String fenleiupdate30() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Fenlei bean = fenleiDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("title", "二级分类信息查看");
		this.setUrl("fenlei/fenleiupdate30.jsp");
		return SUCCESS;
	}
	
	private GysDao gysDao;

	public GysDao getGysDao() {
		return gysDao;
	}

	public void setGysDao(GysDao gysDao) {
		this.gysDao = gysDao;
	}
	
	
	//供应商列表
	public String gyslist() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String gname = request.getParameter("gname");
		
		
		StringBuffer sb = new StringBuffer();
		sb.append(" where ");

		if (gname != null && !"".equals(gname)) {

			sb.append("gname like '%" + gname + "%'");
			sb.append(" and ");
			request.setAttribute("gname", gname);
		}
		

		sb.append("   deletestatus=0 order by id desc ");
		String where = sb.toString();


		int currentpage = 1;
		int pagesize = 10;
		if (request.getParameter("pagenum") != null) {
			currentpage = Integer.parseInt(request.getParameter("pagenum"));
		}
		int total = gysDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
		request.setAttribute("list", gysDao.selectBeanList((currentpage - 1)
				* pagesize, pagesize, where));
		request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
				currentpage, "method!gyslist.action", "共有" + total + "条记录"));
		request.setAttribute("url", "method!gyslist.action");
		request.setAttribute("url2", "method!gys");
		request.setAttribute("title", "供应商管理");
		this.setUrl("gys/gyslist.jsp");
		return SUCCESS;

	}
//跳转到添加供应商页面
	public String gysadd() {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setAttribute("url", "method!gysadd2.action");
		request.setAttribute("title", "供应商添加");
		this.setUrl("gys/gysadd.jsp");
		return SUCCESS;
	}
//添加供应商操作
	public void gysadd2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String dianhua = request.getParameter("dianhua");
		String dizhi = request.getParameter("dizhi");
		String gname = request.getParameter("gname");
		

		Gys bean = new Gys();
		bean.setDianhua(dianhua);
		bean.setDizhi(dizhi);
		bean.setGname(gname);
		
		gysDao.insertBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!gyslist.action';</script>");
	}
//跳转到更新供应商页面
	public String gysupdate() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Gys bean = gysDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("url", "method!gysupdate2.action?id="+bean.getId());
		request.setAttribute("title", "供应商信息修改");
		this.setUrl("gys/gysupdate.jsp");
		return SUCCESS;
	}
//更新供应商操作
	public void gysupdate2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String dianhua = request.getParameter("dianhua");
		String dizhi = request.getParameter("dizhi");
		String gname = request.getParameter("gname");
		
		Gys bean = gysDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setDianhua(dianhua);
		bean.setDizhi(dizhi);
		bean.setGname(gname);
		gysDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!gyslist.action';</script>");
	}
	//删除供应商操作
	public void gysdelete() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		Gys bean = gysDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setDeletestatus(1);
		gysDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!gyslist.action';</script>");
	}
	
	
	//跳转到查看供应商页面
	public String gysupdate3() {
		HttpServletRequest request = ServletActionContext.getRequest();
		Gys bean = gysDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("title", "供应商信息查看");
		this.setUrl("gys/gysupdate3.jsp");
		return SUCCESS;
	}
	
	
	private ProductDao productDao;

	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}
	
	
	//产品信息列表
	public String productlist() {
		HttpServletRequest request = ServletActionContext.getRequest();
		String pname = request.getParameter("pname");

		
		
		StringBuffer sb = new StringBuffer();
		sb.append(" where ");

		if (pname != null && !"".equals(pname)) {

			sb.append("pname like '%" + pname + "%'");
			sb.append(" and ");
			request.setAttribute("pname", pname);
		}
		
		sb.append("   deletestatus=0 order by tuijian,id desc ");
		String where = sb.toString();


		int currentpage = 1;
		int pagesize = 5;
		if (request.getParameter("pagenum") != null) {
			currentpage = Integer.parseInt(request.getParameter("pagenum"));
		}
		int total = productDao.selectBeanCount(where.replaceAll("order by tuijian,id desc", ""));
		request.setAttribute("list", productDao.selectBeanList((currentpage - 1)
				* pagesize, pagesize, where));
		request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
				currentpage, "method!productlist.action", "共有" + total + "条记录"));
		request.setAttribute("url", "method!productlist.action");
		request.setAttribute("url2", "method!product");
		request.setAttribute("title", "产品信息管理");
		this.setUrl("product/productlist.jsp");
		return SUCCESS;

	}
	
	private File uploadfile;
	
	

	public File getUploadfile() {
		return uploadfile;
	}

	public void setUploadfile(File uploadfile) {
		this.uploadfile = uploadfile;
	}
	
	
	//获得二级分类列表操作
	public String getcate() throws Exception{
    	HttpServletRequest request = ServletActionContext.getRequest();
    	HttpServletResponse response = ServletActionContext.getResponse();
    	response.setContentType("text/xml");
    	response.setHeader("Cache-Control", "no-store");
		response.setHeader("Pragma", "no-cache");
		response.setDateHeader("Expires", 0);
	    response.setCharacterEncoding("UTF-8");
    	List<Fenlei> list = fenleiDao.selectBeanList(0, 9999, "where deletestatus=0 and fenlei.id= "+request.getParameter("pid"));
    	String xml_start = "<selects>";
        String xml_end = "</selects>";
        String xml = "";
        for(int i=0;i<list.size();i++){
        	xml+="<select><value>"+list.get(i).getId()+"</value><text>"+list.get(i).getFname()+"</text></select>";
        }
        String last_xml = xml_start + xml + xml_end;
        response.getWriter().write(last_xml);
        return null;
    }
	
	
//跳转到添加产品信息页面
	public String productadd() {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setAttribute("fenleilist", fenleiDao.selectBeanList(0, 9999, " where deletestatus=0 and fenlei is  null "));
		request.setAttribute("gyslist", gysDao.selectBeanList(0, 9999, " where deletestatus=0 "));
		request.setAttribute("url", "method!productadd2.action");
		request.setAttribute("title", "产品信息添加");
		this.setUrl("product/productadd.jsp");
		return SUCCESS;
	}
//添加产品信息操作
	public void productadd2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fenlei = request.getParameter("fenlei");
		String gys = request.getParameter("gys");
		String pname = request.getParameter("pname");
		String price1 = request.getParameter("price1");
		String price2 = request.getParameter("price2");
		String gaishu = request.getParameter("gaishu");
		

		Product bean = new Product();
		if(!"0".equals(fenlei)){
			bean.setFenlei(fenleiDao.selectBean(" where id= "+fenlei));
		}
		
		bean.setGys(gysDao.selectBean(" where id= "+gys));
		
		bean.setCreatetime(Util.getTime());
		if(uploadfile!=null){
			String savaPath = ServletActionContext.getServletContext().getRealPath("/")+ "/uploadfile/";

			String time = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date()).toString();

			String imgpath = time + ".jpg";
			File file1 = new File(savaPath + imgpath);
			Util.copyFile(uploadfile, file1);
			
			bean.setImgpath(imgpath);
		}
		bean.setPname(pname);
		bean.setPrice1(Double.parseDouble(price1));
		if(price2==null||"".equals(price2)){
			price2 = price1;
		}
		
		bean.setPrice2(Double.parseDouble(price2));
		bean.setTuijian("未推荐");
		bean.setGaishu(gaishu);
		
		productDao.insertBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
	}
//跳转到更新产品信息页面
	public String productupdate() {
		HttpServletRequest request = ServletActionContext.getRequest();
		request.setAttribute("fenleilist", fenleiDao.selectBeanList(0, 9999, " where deletestatus=0 and fenlei is  null "));
		request.setAttribute("gyslist", gysDao.selectBeanList(0, 9999, " where deletestatus=0 "));
		Product bean = productDao.selectBean(" where id= "
				+ request.getParameter("id"));
		request.setAttribute("bean", bean);
		request.setAttribute("url", "method!productupdate2.action?id="+bean.getId());
		request.setAttribute("title", "产品信息修改");
		this.setUrl("product/productupdate.jsp");
		return SUCCESS;
	}
//更新产品信息操作
	public void productupdate2() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String fenlei = request.getParameter("fenlei");
		String gys = request.getParameter("gys");
		String info = request.getParameter("info");
		String pname = request.getParameter("pname");
		String price1 = request.getParameter("price1");
		String price2 = request.getParameter("price2");
		String gaishu = request.getParameter("gaishu");
		
		Product bean = productDao.selectBean(" where id= "
				+ request.getParameter("id"));
		if(!"0".equals(fenlei)){
			bean.setFenlei(fenleiDao.selectBean(" where id= "+fenlei));
		}
		bean.setGys(gysDao.selectBean(" where id= "+gys));
		if(uploadfile!=null){
			String savaPath = ServletActionContext.getServletContext().getRealPath("/")+ "/uploadfile/";

			String time = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(new Date()).toString();

			String imgpath = time + ".jpg";
			File file1 = new File(savaPath + imgpath);
			Util.copyFile(uploadfile, file1);
			
			bean.setImgpath(imgpath);
		}
		
		bean.setGaishu(gaishu);
		bean.setInfo(info);
		bean.setPname(pname);
		bean.setPrice1(Double.parseDouble(price1));
		if(price2==null||"".equals(price2)){
			price2 = price1;
		}
		
		bean.setPrice2(Double.parseDouble(price2));
		productDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
	}
	//删除产品信息操作
	public void productdelete() throws IOException {
		HttpServletRequest request = ServletActionContext.getRequest();
		Product bean = productDao.selectBean(" where id= "
				+ request.getParameter("id"));
		bean.setDeletestatus(1);
		productDao.updateBean(bean);
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
		response
				.getWriter()
				.print(
						"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
	}
	
	

	//跳转到产品信息管理页面
		public String productupdate3() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Product bean = productDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("url", "method!productupdate4.action?id="+bean.getId());
			request.setAttribute("title", "产品信息管理");
			this.setUrl("product/productupdate3.jsp");
			return SUCCESS;
		}
	//更新产品信息操作
		public void productupdate4() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String info = request.getParameter("content1");
			
			Product bean = productDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			
			bean.setInfo(info);
			
			productDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
		}
	
		
		//精品推荐操作
		public void productdelete2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Product bean = productDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setTuijian("已推荐");
			productDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
		}
		
		//取消精品推荐操作
		public void productdelete3() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Product bean = productDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setTuijian("未推荐");
			productDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!productlist.action';</script>");
		}
	
		private DingdanDao dingdanDao;
		
	
		public DingdanDao getDingdanDao() {
			return dingdanDao;
		}

		public void setDingdanDao(DingdanDao dingdanDao) {
			this.dingdanDao = dingdanDao;
		}

		//订单列表
		public String dingdanlist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String orderid = request.getParameter("orderid");
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (orderid != null && !"".equals(orderid)) {

				sb.append("orderid like '%" + orderid + "%'");
				sb.append(" and ");
				request.setAttribute("orderid", orderid);
			}
			

			sb.append("   1=1 order by status desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = dingdanDao.selectBeanCount(where.replaceAll("order by status desc", ""));
			request.setAttribute("list", dingdanDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!dingdanlist.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!dingdanlist.action");
			request.setAttribute("url2", "method!dingdan");
			request.setAttribute("title", "订单管理");
			this.setUrl("dingdan/dingdanlist.jsp");
			return SUCCESS;

		}
		
		private XiaoshouDao xiaoshouDao;

		public XiaoshouDao getXiaoshouDao() {
			return xiaoshouDao;
		}

		public void setXiaoshouDao(XiaoshouDao xiaoshouDao) {
			this.xiaoshouDao = xiaoshouDao;
		}

		
		private DingdanitemDao dingdanitemDao;
		
		public DingdanitemDao getDingdanitemDao() {
			return dingdanitemDao;
		}

		public void setDingdanitemDao(DingdanitemDao dingdanitemDao) {
			this.dingdanitemDao = dingdanitemDao;
		}
		
		//处理订单操作
		public void dingdandelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Dingdan bean = dingdanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setStatus("已处理");
			dingdanDao.updateBean(bean);
			
			User user = userDao.selectBean(" where id= "+bean.getUser().getId());
			user.setTotal(Arith.add(user.getTotal(), bean.getZongjia()));
			userDao.updateBean(user);
			
			List<Dingdanitem> list = dingdanitemDao.selectBeanList(0, 9999, " where orderid='"+bean.getOrderid()+"' ");
			for(Dingdanitem dd:list){
				Product pro = productDao.selectBean(" where id= "+dd.getProduct().getId());
				pro.setTotal(Arith.add(pro.getTotal(), dd.getJine()));
				productDao.updateBean(pro);
				
				Fenlei  fenlei  = fenleiDao.selectBean("  where id= "+dd.getProduct().getFenlei().getFenlei().getId());
				
				fenlei.setTotal(Arith.add(fenlei.getTotal(), dd.getJine()));
				
				fenleiDao.updateBean(fenlei);
			}
			
			
			String riqi = Util.getTime2();
			Xiaoshou xs = xiaoshouDao.selectBean(" where riqi='"+riqi+"' ");
			if(xs==null){
				xs = new Xiaoshou();
				xs.setRiqi(riqi);
				xs.setJine(bean.getZongjia());
				
				xiaoshouDao.insertBean(xs);
			}else{
				xs.setJine(Arith.add(bean.getZongjia(), xs.getJine()));
				xiaoshouDao.updateBean(xs);
			}

			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!dingdanlist.action';</script>");
		}
		
		
		//处理订单操作
		public void dingdandelete2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			Dingdan bean = dingdanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setStatus("取消订单");
			dingdanDao.updateBean(bean);
			

			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!dingdanlist.action';</script>");
		}
		
		
		//跳转到查看订单页面
		public String dingdanupdate3() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Dingdan bean = dingdanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("title", "订单信息查看");
			this.setUrl("dingdan/dingdanupdate3.jsp");
			return SUCCESS;
		}
		
		
		//销售统计列表
		public String xiaoshoulist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String riqi = request.getParameter("riqi");
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (riqi != null && !"".equals(riqi)) {

				sb.append("riqi like '%" + riqi + "%'");
				sb.append(" and ");
				request.setAttribute("riqi", riqi);
			}
			

			sb.append("   1=1 order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = xiaoshouDao.selectBeanCount(where.replaceAll("order by id desc", ""));
			request.setAttribute("list", xiaoshouDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!xiaoshoulist.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!xiaoshoulist.action");
			request.setAttribute("url2", "method!xiaoshou");
			request.setAttribute("title", "销售统计列表");
			this.setUrl("xiaoshou/xiaoshoulist.jsp");
			return SUCCESS;

		}
		
		
		
		//注册用户列表
		public String userlist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String username = request.getParameter("username");
			
		
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (username != null && !"".equals(username)) {

				sb.append("username like '%" + username + "%'");
				sb.append(" and ");
				request.setAttribute("username", username);
			}
			

			sb.append("   role=2  order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = userDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
			request.setAttribute("list", userDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!userlist.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!userlist.action");
			request.setAttribute("url2", "method!user");
			request.setAttribute("title", "注册用户管理");
			this.setUrl("user/userlist.jsp");
			return SUCCESS;

		}

		//停用注册用户操作
		public void userdelete() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			User bean = userDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setDeletestatus(1);
			userDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!userlist.action';</script>");
		}
		
		//启用注册用户操作
		public void userdelete2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			User bean = userDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setDeletestatus(0);
			userDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!userlist.action';</script>");
		}
		
		private LiuyanDao liuyanDao;

		public LiuyanDao getLiuyanDao() {
			return liuyanDao;
		}

		public void setLiuyanDao(LiuyanDao liuyanDao) {
			this.liuyanDao = liuyanDao;
		}
		
		//留言列表
		public String liuyanlist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String biaoti = request.getParameter("biaoti");
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (biaoti != null && !"".equals(biaoti)) {

				sb.append("biaoti like '%" + biaoti + "%'");
				sb.append(" and ");
				request.setAttribute("biaoti", biaoti);
			}
			

			sb.append("   1=1  order by zhuangtai ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = liuyanDao.selectBeanCount(where.replaceAll("order by zhuangtai", ""));
			request.setAttribute("list", liuyanDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!liuyanlist.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!liuyanlist.action");
			request.setAttribute("url2", "method!liuyan");
			request.setAttribute("title", "留言管理");
			this.setUrl("liuyan/liuyanlist.jsp");
			return SUCCESS;

		}
	
	//跳转到答复留言页面
		public String liuyanupdate() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Liuyan bean = liuyanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("url", "method!liuyanupdate2.action?id="+bean.getId());
			request.setAttribute("title", "答复留言");
			this.setUrl("liuyan/liuyanupdate.jsp");
			return SUCCESS;
		}
	//答复留言操作
		public void liuyanupdate2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();
			String dafu = request.getParameter("dafu");
			Liuyan bean = liuyanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			bean.setDafu(dafu);
			bean.setShijian2(Util.getTime());
			bean.setZhuangtai("已答复");
			liuyanDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!liuyanlist.action';</script>");
		}
		
		//跳转到查看留言页面
		public String liuyanupdate3() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Liuyan bean = liuyanDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("url", "method!liuyanupdate2.action?id="+bean.getId());
			request.setAttribute("title", "答复留言");
			this.setUrl("liuyan/liuyanupdate3.jsp");
			return SUCCESS;
		}
		
		
		//产品信息列表
		public String productlist2() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String pname = request.getParameter("pname");

			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (pname != null && !"".equals(pname)) {

				sb.append("pname like '%" + pname + "%'");
				sb.append(" and ");
				request.setAttribute("pname", pname);
			}
			
			sb.append("   deletestatus=0 order by tuijian,id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = productDao.selectBeanCount(where.replaceAll("order by tuijian,id desc", ""));
			request.setAttribute("list", productDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!productlist2.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!productlist2.action");
			request.setAttribute("url2", "method!product");
			request.setAttribute("title", "产品销售统计");
			this.setUrl("product/productlist2.jsp");
			return SUCCESS;

		}
		
		
		
		//分类列表
		public String fenleilist3() {
			HttpServletRequest request = ServletActionContext.getRequest();
			String fname = request.getParameter("fname");
			
			
			StringBuffer sb = new StringBuffer();
			sb.append(" where ");

			if (fname != null && !"".equals(fname)) {

				sb.append("fname like '%" + fname + "%'");
				sb.append(" and ");
				request.setAttribute("fname", fname);
			}
			

			sb.append("   deletestatus=0 and fenlei is null order by id desc ");
			String where = sb.toString();


			int currentpage = 1;
			int pagesize = 10;
			if (request.getParameter("pagenum") != null) {
				currentpage = Integer.parseInt(request.getParameter("pagenum"));
			}
			int total = fenleiDao.selectBeanCount(where.replaceAll(" order by id desc ", ""));
			request.setAttribute("list", fenleiDao.selectBeanList((currentpage - 1)
					* pagesize, pagesize, where));
			request.setAttribute("pagerinfo", Pager.getPagerNormal(total, pagesize,
					currentpage, "method!fenleilist3.action", "共有" + total + "条记录"));
			request.setAttribute("url", "method!fenleilist3.action");
			request.setAttribute("url2", "method!fenlei");
			request.setAttribute("title", "分类销售统计");
			this.setUrl("fenlei/fenleilist3.jsp");
			return SUCCESS;

		}
		
		private PicDao picDao;

		public PicDao getPicDao() {
			return picDao;
		}

		public void setPicDao(PicDao picDao) {
			this.picDao = picDao;
		}
		
		
		//首页图片列表
		public String piclist() {
			HttpServletRequest request = ServletActionContext.getRequest();
			StringBuffer sb = new StringBuffer();
			sb.append(" where 1=1 order by id desc");
			String where = sb.toString();

			request.setAttribute("list", picDao.selectBeanList(0, 9999, where));
			this.setUrl("pic/piclist.jsp");
			return SUCCESS;

		}

	//跳转到更新首页图片页面
		public String picupdate() {
			HttpServletRequest request = ServletActionContext.getRequest();
			Pic bean = picDao.selectBean(" where id= "
					+ request.getParameter("id"));
			request.setAttribute("bean", bean);
			request.setAttribute("url", "method!picupdate2.action?id="+bean.getId());
			request.setAttribute("title", "首页图片信息修改");
			this.setUrl("pic/picupdate.jsp");
			return SUCCESS;
		}
	//更新首页图片操作
		public void picupdate2() throws IOException {
			HttpServletRequest request = ServletActionContext.getRequest();

			
			Pic bean = picDao.selectBean(" where id= "
					+ request.getParameter("id"));
			
			
			if(uploadfile!=null){
				String savaPath = ServletActionContext.getServletContext().getRealPath(
				"/")
				+ "/uploadfile/";
				String time = new java.text.SimpleDateFormat("yyyyMMddHHmmss")
				.format(new Date()).toString();

				String path = time + ".jpg";
				File file1 = new File(savaPath + path);
				Util.copyFile(uploadfile, file1);
				bean.setPath(path);
			}
			String href = request.getParameter("href");
			
			bean.setHref(href);
			
			picDao.updateBean(bean);
			HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("gbk");response.setContentType("text/html; charset=gbk");
			response
					.getWriter()
					.print(
							"<script language=javascript>alert('操作成功');window.location.href='method!piclist.action';</script>");
		}
}
