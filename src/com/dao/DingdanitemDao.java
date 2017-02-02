package com.dao;

import java.util.List;

import com.model.Dingdanitem;




public interface DingdanitemDao  {
	
	
	
	public void insertBean(Dingdanitem bean);
	
	public void deleteBean(Dingdanitem bean);
	
	public void updateBean(Dingdanitem bean);

	public Dingdanitem selectBean(String where);
	
	public List<Dingdanitem> selectBeanList(final int start, final int limit,final String where);
	
	public int selectBeanCount(final String where);
	
	
}
