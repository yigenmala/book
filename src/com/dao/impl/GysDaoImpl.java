package com.dao.impl;

import java.sql.SQLException;
import java.util.List;


import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.dao.GysDao;
import com.model.Gys;











public class GysDaoImpl extends HibernateDaoSupport implements  GysDao{


	public void deleteBean(Gys bean) {
		this.getHibernateTemplate().delete(bean);
		
	}

	public void insertBean(Gys bean) {
		this.getHibernateTemplate().save(bean);
		
	}

	@SuppressWarnings("unchecked")
	public Gys selectBean(String where) {
		List<Gys> list = this.getHibernateTemplate().find("from Gys " +where);
		if(list.size()==0){
			return null;
		}
		return list.get(0);
	}

	public int selectBeanCount(String where) {
		long count = (Long)this.getHibernateTemplate().find("select count(*) from Gys "+where).get(0);
		return (int)count;
	}

	@SuppressWarnings("unchecked")
	public List<Gys> selectBeanList(final int start,final int limit,final String where) {
		return (List<Gys>)this.getHibernateTemplate().executeFind(new HibernateCallback() {
			public Object doInHibernate(final Session session)throws HibernateException, SQLException {				
				List<Gys> list = session.createQuery("from Gys "+where)
				.setFirstResult(start)
				.setMaxResults(limit)
				.list();
				return list;
			}
		});
	}

	public void updateBean(Gys bean) {
		this.getHibernateTemplate().update(bean);
		
	}
	
	
}
