package pl.bd.kino.ejb;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Hall;
import pl.bd.kino.entities.Place;

@Stateless
public class HallEJB extends AbstractEJB<Hall> {
	
	@EJB
	PlaceEJB placeBean;
	
	public HallEJB() {
		super(Hall.class);
	}
	
	@Override
	public List<Hall> get() {
		Query q = manager.createQuery("select h from Hall h");
		 return q.getResultList();
	}

	public int countPlaces(Hall hall) {
		List<Place> places = placeBean.get();
		int count = 0;
		for(Place place : places){
			if(place.getHall().getId() == hall.getId())
				count++;
		}
		return count;
	}

	@Override
    public void update(int id, Hall _hall) {
    	Hall hall = manager.find(Hall.class, id);
		hall.setName(_hall.getName());
    }

	
	
}
