package pl.bd.kino.ejb;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Hall;
import pl.bd.kino.entities.Place;
import pl.bd.kino.lists.Places;

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
	
    public Places findPlaces(int id) {
		Hall hall = manager.find(Hall.class, id);
		List<Place> lplaces = get();
		List<Place> places = new ArrayList<Place>();
		for(Place lplace : lplaces){
			if(lplace.getHall().getId() == hall.getId())
				places.add(lplace);
		}
		return new Places(places);
	}
    
    public void addPlace(Hall hall, Place place){
    	place.setHall(hall);
    	manager.persist(place);
    }
    
	@Override
    public void update(int id, Place _place) {
		Place place = manager.find(Place.class, id);
		place.setSector(_place.getSector());
    }

	public void deleteByHall(int id){
		List<Place> places = get();
		for(Place place: places){
			if(place.getHall().getId() == id)
				manager.remove(place);
		}
	}

}
