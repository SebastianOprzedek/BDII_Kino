package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Hall;

@Stateless
public class HallEJB extends AbstractEJB<Hall> {
	
	public HallEJB() {
		super(Hall.class);
	}
	
	@Override
	public List<Hall> get() {
		Query q = manager.createQuery("select h from Hall h");
		 return q.getResultList();
	}
}
