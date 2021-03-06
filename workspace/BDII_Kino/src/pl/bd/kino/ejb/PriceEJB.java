package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Price;

@Stateless
public class PriceEJB extends AbstractEJB<Price> {
	
	public PriceEJB() {
		super(Price.class);
	}
	
	@Override
	public List<Price> get() {
		Query q = manager.createQuery("select p from Price p");
		 return q.getResultList();
	}
}
