package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Place;

public class Places {
	private List<Place> places = new ArrayList<Place>();

	public Places(List<Place> places) {
		super();
		this.places = places;
	}

	public Places() {	}

	public List<Place> getPlaces() {
		return places;
	}

	public void setPlaces(List<Place> places) {
		this.places = places;
	}	
	
	public boolean containPlace(int placeNumber){
		for(Place place: places)
			if(place.getNumber() == placeNumber)
				return true;
		return false;
	}
	
	public int getPlaceId(int placeNumber){
		for(Place place: places)
			if(place.getNumber() == placeNumber)
				return place.getId();
		return -1;
	}	

	public Place getPlace(int placeNumber){
		for(Place place: places)
			if(place.getNumber() == placeNumber)
				return place;
		return null;
	}
}
