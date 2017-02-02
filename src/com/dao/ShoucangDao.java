package com.dao;

import java.util.List;

import com.model.Shoucang;




public interface ShoucangDao  {
	
	
	
	public void insertBean(Shoucang bean);
	
	public void deleteBean(Shoucang bean);
	
	public void updateBean(Shoucang bean);

	public Shoucang selectBean(String where);
	
	public List<Shoucang> selectBeanList(final int start, final int limit,final String where);
	
	public int selectBeanCount(final String where);
	
	
}
