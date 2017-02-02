package com.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
//供应商
@Entity
@Table(name="t_Gys")
public class Gys {

	@Id
	@GeneratedValue
	private int id;
	
	private int deletestatus;//是否删除状态，0表示正常，1表示删除
	
	private String gname;//供应商名称
	
	private String dizhi;//地址
	
	private String dianhua;//手机电话

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


	public String getGname() {
		return gname;
	}

	public void setGname(String gname) {
		this.gname = gname;
	}

	public String getDizhi() {
		return dizhi;
	}

	public void setDizhi(String dizhi) {
		this.dizhi = dizhi;
	}

	public String getDianhua() {
		return dianhua;
	}

	public void setDianhua(String dianhua) {
		this.dianhua = dianhua;
	}
	
	
	
	
	
}
