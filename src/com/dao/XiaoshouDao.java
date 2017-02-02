package com.dao;

import java.util.List;

import com.model.Xiaoshou;




public interface XiaoshouDao  {
	
	
	
	public void insertBean(Xiaoshou bean);
	
	public void deleteBean(Xiaoshou bean);
	
	public void updateBean(Xiaoshou bean);

	public Xiaoshou selectBean(String where);
	
	public List<Xiaoshou> selectBeanList(final int start, final int limit,final String where);
	
	public int selectBeanCount(final String where);
	
	
}
