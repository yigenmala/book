package com.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

//订单表
@Entity
@Table(name="t_Dingdanitem")
public class Dingdanitem {
	
	@Id
	@GeneratedValue
	private int id;//主键
	
	private String orderid;//订单ID
	
	@ManyToOne
	@JoinColumn(name="productid")
	private Product product;//关联商品ID，外键
	
	private int sl;//购买数量
	
	private double jine;//购买总金额
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public String getOrderid() {
		return orderid;
	}

	public void setOrderid(String orderid) {
		this.orderid = orderid;
	}

	public int getSl() {
		return sl;
	}

	public void setSl(int sl) {
		this.sl = sl;
	}

	public double getJine() {
		return jine;
	}

	public void setJine(double jine) {
		this.jine = jine;
	}
	

	

	
}
