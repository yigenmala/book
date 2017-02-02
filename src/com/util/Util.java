package com.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.dao.PicDao;
import com.dao.UserDao;
import com.model.Pic;
import com.model.User;






public class Util {

	//获取当前系统时间
	public static String getTime(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		return sdf.format(date.getTime());
	}
	
	
	//获取当前日期
	public static String getTime2(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		return sdf.format(date.getTime());
	}

	// 上传文件/复制文件。
	public static void copyFile(File src, File dst) {
		try {
			int BUFFER_SIZE = 16 * 1024;
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src),
						BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst),
						BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE]; 
				for (int byteRead = 0; (byteRead = in.read(buffer)) > 0; ) 
				{ 
					out.write(buffer, 0, byteRead); 
				} 

			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	
//初始化系统
	public static void init(HttpServletRequest request){
		  WebApplicationContext app = WebApplicationContextUtils.getWebApplicationContext(request.getSession().getServletContext());
          UserDao userDao = (UserDao)app.getBean("userDao");
          PicDao picDao = (PicDao)app.getBean("picDao");
         
          User user = userDao.selectBean(" where username='admin' and deletestatus=0  ");
  		if(user==null){
  			user = new User();
  			user.setPassword("111111");
  			user.setRole(1);
  			user.setTruename("admin");
  			user.setUsername("admin");
  			userDao.insertBean(user);
  			
  			
  			Pic p1 = new Pic();
			p1.setPath("01.jpg");
			p1.setHref(".");
			picDao.insertBean(p1);
			
			Pic p2 = new Pic();
			p2.setPath("02.png");
			p2.setHref(".");
			picDao.insertBean(p2);
			
			Pic p3 = new Pic();
			p3.setPath("03.png");
			p3.setHref(".");
			picDao.insertBean(p3);
			
			Pic p4 = new Pic();
			p4.setPath("04.png");
			p4.setHref(".");
			picDao.insertBean(p4);
			
			Pic p5 = new Pic();
			p5.setPath("05.png");
			p5.setHref(".");
			picDao.insertBean(p5);
			
			Pic p6 = new Pic();
			p6.setPath("06.png");
			p6.setHref(".");
			picDao.insertBean(p6);
			
			Pic p7 = new Pic();
			p7.setPath("07.png");
			p7.setHref(".");
			picDao.insertBean(p7);
			
			Pic p8 = new Pic();
			p8.setPath("08.png");
			p8.setHref(".");
			picDao.insertBean(p8);
  			
  		}
	}
	
	
	
	

}
