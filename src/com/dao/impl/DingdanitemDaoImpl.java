package com.dao.impl;

import java.sql.SQLException;
import java.util.List;


import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.dao.DingdanitemDao;
import com.model.Dingdanitem;











public class DingdanitemDaoImpl extends HibernateDaoSupport implements  DingdanitemDao{


	public void deleteBean(Dingdanitem bean) {
		this.getHibernateTemplate().delete(bean);
		
	}

	public void insertBean(Dingdanitem bean) {
		this.getHibernateTemplate().save(bean);
		
	}

	@SuppressWarnings("unchecked")
	public Dingdanitem selectBean(String where) {
		List<Dingdanitem> list = this.getHibernateTemplate().find("from Dingdanitem " +where);
		if(list.size()==0){
			return null;
		}
		return list.get(0);
	}

	public int selectBeanCount(String where) {
		long count = (Long)this.getHibernateTemplate().find("select count(*) from Dingdanitem "+where).get(0);
		return (int)count;
	}

	@SuppressWarnings("unchecked")
	public List<Dingdanitem> selectBeanList(final int start,final int limit,final String where) {
		return (List<Dingdanitem>)this.getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(final Session session)throws HibernateException, SQLException {				
				List<Dingdanitem> list = session.createQuery("from Dingdanitem "+where)
				.setFirstResult(start)
				.setMaxResults(limit)
				.list();
				return list;
			}
		});
	}

	public void updateBean(Dingdanitem bean) {
		this.getHibernateTemplate().update(bean);
		
	}
	
	
}
