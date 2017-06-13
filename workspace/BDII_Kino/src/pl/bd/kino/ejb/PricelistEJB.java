package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;

import pl.bd.kino.entities.Pricelist;

@Stateless
public class PricelistEJB extends AbstractEJB<Pricelist> {
	
	public PricelistEJB() {
		super(Pricelist.class);
	}
	
	@Override
	public List<Pricelist> get() {
		Query q = manager.createQuery("select p from Pricelist p");
		 return q.getResultList();
	}
	
}
