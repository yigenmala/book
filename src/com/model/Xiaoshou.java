package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
//销售统计
@Entity
@Table(name="t_Xiaoshou")
public class Xiaoshou {


	

	@Id
	@GeneratedValue
	private int id;
	
	private String riqi;//销售日期
	
	private double jine;//销售金额


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getRiqi() {
		return riqi;
	}

	public void setRiqi(String riqi) {
		this.riqi = riqi;
	}

	public double getJine() {
		return jine;
	}

	public void setJine(double jine) {
		this.jine = jine;
	}

	
	
	

	
}
