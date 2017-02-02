package com.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
//产品分类
@Entity
@Table(name="t_Fenlei")
public class Fenlei {

	@Id
	@GeneratedValue
	private int id;
	
	private int deletestatus;//是否删除状态，0表示正常，1表示删除
	
	private String fname;//分类名
	
	@ManyToOne
	@JoinColumn(name="fenleiid")
	private Fenlei fenlei;//父分类名
	
	private double total;//该分类销售总计

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDeletestatus() {
		return deletestatus;
	}

	public void setDeletestatus(int deletestatus) {
		this.deletestatus = deletestatus;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public Fenlei getFenlei() {
		return fenlei;
	}

	public void setFenlei(Fenlei fenlei) {
		this.fenlei = fenlei;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}
	
	
	
	
}
