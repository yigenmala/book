package com.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
//首页展示图片
@Entity
@Table(name="t_Pic")
public class Pic {


	@Id
	@GeneratedValue
	private int id;
	
	private String path;//首页图片
	
	private String href;//图片路径

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}
	
	
	
	
}
