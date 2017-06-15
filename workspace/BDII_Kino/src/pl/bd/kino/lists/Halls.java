package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.EJB;

import pl.bd.kino.ejb.PlaceEJB;
import pl.bd.kino.entities.Hall;

public class Halls {
	private List<Hall> halls = new ArrayList<Hall>();
	private List<Integer> hallSizes= new ArrayList<Integer>();

	public Halls(List<Hall> halls) {
		super();
		this.halls = halls;		
	}

	public Halls() {	}

	public List<Hall> getHalls() {
		return halls;
	}

	public void setHalls(List<Hall> halls) {
		this.halls = halls;
	}

	public List<Integer> getHallSizes() {
		return hallSizes;
	}

	public void setHallSizes(List<Integer> hallSizes) {
		this.hallSizes = hallSizes;
	}		
	
}
