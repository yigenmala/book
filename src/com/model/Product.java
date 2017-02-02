package com.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
//商品
@Entity
@Table(name="t_product")
public class Product {

	@Id
	@GeneratedValue
	private int id;
	
	private String pname ;//产品名
	
	private String imgpath;//图片
	
	private double price1;//原价
	
	private double price2;//促销价
	
	private String createtime;//添加时间
	
	@ManyToOne
	@JoinColumn(name="fenleiid")
	private Fenlei fenlei; //所属分类
	
	@ManyToOne
	@JoinColumn(name="gysid")
	private Gys gys;//所属供应商
	

	@Column(name="info", columnDefinition="TEXT")
	private String info;//产品信息
	
	private String tuijian;//精品推荐

	private int xiaoliang;//销量
	
	private int deletestatus;//是否删除状态 0表示未删除，1表示删除

	private String cuxiao;//促销信息
	
	private String jianjie;//简单介绍
	
	private double total;//销售总计
	
	@Column(name="gaishu", columnDefinition="TEXT")
	private String gaishu;//产品概述
		
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getImgpath() {
		return imgpath;
	}

	public void setImgpath(String imgpath) {
		this.imgpath = imgpath;
	}

	public double getPrice1() {
		return price1;
	}

	public void setPrice1(double price1) {
		this.price1 = price1;
	}

	public double getPrice2() {
		return price2;
	}

	public void setPrice2(double price2) {
		this.price2 = price2;
	}

	public String getCreatetime() {
		return createtime;
	}

	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}


	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getTuijian() {
		return tuijian;
	}

	public void setTuijian(String tuijian) {
		this.tuijian = tuijian;
	}

	public int getXiaoliang() {
		return xiaoliang;
	}

	public void setXiaoliang(int xiaoliang) {
		this.xiaoliang = xiaoliang;
	}

	public int getDeletestatus() {
		return deletestatus;
	}

	public void setDeletestatus(int deletestatus) {
		this.deletestatus = deletestatus;
	}

	public Fenlei getFenlei() {
		return fenlei;
	}

	public void setFenlei(Fenlei fenlei) {
		this.fenlei = fenlei;
	}

	public Gys getGys() {
		return gys;
	}

	public void setGys(Gys gys) {
		this.gys = gys;
	}

	

	public String getJianjie() {
		return jianjie;
	}

	public void setJianjie(String jianjie) {
		this.jianjie = jianjie;
	}

	public String getCuxiao() {
		return cuxiao;
	}

	public void setCuxiao(String cuxiao) {
		this.cuxiao = cuxiao;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public String getGaishu() {
		return gaishu;
	}

	public void setGaishu(String gaishu) {
		this.gaishu = gaishu;
	}

	
	
	
	
	
}
