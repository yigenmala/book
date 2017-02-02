package com.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

//留言板
@Entity
@Table(name="t_Liuyan")
public class Liuyan {
	
	@Id
	@GeneratedValue
	private int id;//主键
    
	@ManyToOne
	@JoinColumn(name="userid")
	private User user;//留言用户 关联用户的ID 外键
	
	private String biaoti;//留言标题
	
	@Column(name="neirong", columnDefinition="TEXT")
	private String neirong;//留言内容
	
    private String shijian1;//留言时间

    private String zhuangtai;//未答复/已答复
    
    @Column(name="dafu", columnDefinition="TEXT")
    private String dafu;//答复
    
    private String shijian2;//答复时间

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getBiaoti() {
		return biaoti;
	}

	public void setBiaoti(String biaoti) {
		this.biaoti = biaoti;
	}

	public String getNeirong() {
		return neirong;
	}

	public void setNeirong(String neirong) {
		this.neirong = neirong;
	}

	public String getShijian1() {
		return shijian1;
	}

	public void setShijian1(String shijian1) {
		this.shijian1 = shijian1;
	}

	public String getZhuangtai() {
		return zhuangtai;
	}

	public void setZhuangtai(String zhuangtai) {
		this.zhuangtai = zhuangtai;
	}

	public String getDafu() {
		return dafu;
	}

	public void setDafu(String dafu) {
		this.dafu = dafu;
	}

	public String getShijian2() {
		return shijian2;
	}

	public void setShijian2(String shijian2) {
		this.shijian2 = shijian2;
	}

    
    
	

	

    
    
	
}
