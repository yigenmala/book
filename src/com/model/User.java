package com.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
//用户
@Entity
@Table(name="t_User")
public class User {

	@Id
	@GeneratedValue
	private int id;
	
	private String username;//用户名
	
	private String password;//密码
	
	private int role;//1表示管理员，2表示购物的用户
	
	
	private String truename;//姓名
	
	private String address;//地址
	
	private String phone;//手机电话
	

	
	private int deletestatus;//0表示正常，1表示锁定
	
	private String createtime;//注册时间
	
	
	private double total;//消费总计
	
	
	private String youxiang;//注册邮箱
	
	private String wenti;//我的问题
	
	private String daan;//我的答案
	
	
	

	public String getYouxiang() {
		return youxiang;
	}

	public void setYouxiang(String youxiang) {
		this.youxiang = youxiang;
	}

	public String getWenti() {
		return wenti;
	}

	public void setWenti(String wenti) {
		this.wenti = wenti;
	}

	public String getDaan() {
		return daan;
	}

	public void setDaan(String daan) {
		this.daan = daan;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getTruename() {
		return truename;
	}

	public void setTruename(String truename) {
		this.truename = truename;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	

	public int getDeletestatus() {
		return deletestatus;
	}

	public void setDeletestatus(int deletestatus) {
		this.deletestatus = deletestatus;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}
	
	

	

	
	
	
	
}
