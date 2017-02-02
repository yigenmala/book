package com.dao.impl;

import java.sql.SQLException;
import java.util.List;


import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.dao.XiaoshouDao;
import com.model.Xiaoshou;











public class XiaoshouDaoImpl extends HibernateDaoSupport implements  XiaoshouDao{


	public void deleteBean(Xiaoshou bean) {
		this.getHibernateTemplate().delete(bean);
		
	}

	public void insertBean(Xiaoshou bean) {
		this.getHibernateTemplate().save(bean);
		
	}

	@SuppressWarnings("unchecked")
	public Xiaoshou selectBean(String where) {
		List<Xiaoshou> list = this.getHibernateTemplate().find("from Xiaoshou " +where);
		if(list.size()==0){
			return null;
		}
		return list.get(0);
	}

	public int selectBeanCount(String where) {
		long count = (Long)this.getHibernateTemplate().find("select count(*) from Xiaoshou "+where).get(0);
		return (int)count;
	}

	@SuppressWarnings("unchecked")
	public List<Xiaoshou> selectBeanList(final int start,final int limit,final String where) {
		return (List<Xiaoshou>)this.getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(final Session session)throws HibernateException, SQLException {				
				List<Xiaoshou> list = session.createQuery("from Xiaoshou "+where)
				.setFirstResult(start)
				.setMaxResults(limit)
				.list();
				return list;
			}
		});
	}

	public void updateBean(Xiaoshou bean) {
		this.getHibernateTemplate().update(bean);
		
	}
	
	
}
