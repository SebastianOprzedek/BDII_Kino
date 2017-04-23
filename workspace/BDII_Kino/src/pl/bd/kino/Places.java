package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
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
	
	
}
