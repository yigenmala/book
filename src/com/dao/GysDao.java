package com.dao;

import java.util.List;

import com.model.Gys;




public interface GysDao  {
	
	
	
	public void insertBean(Gys bean);
	
	public void deleteBean(Gys bean);
	
	public void updateBean(Gys bean);

	public Gys selectBean(String where);
	
	public List<Gys> selectBeanList(final int start, final int limit,final String where);
	
	public int selectBeanCount(final String where);
	
	
}
