package pl.bd.kino.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.Query;

import pl.bd.kino.entities.Hall;
import pl.bd.kino.entities.Place;

@Stateless
public class PlaceEJB extends AbstractEJB<Place> {
				
	public PlaceEJB() {
		super(Place.class);
	}
	
	@Override
	public List<Place> get() {
		Query q = manager.createQuery("select p from Place p");
		 return q.getResultList();
	}

}
