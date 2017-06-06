package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Hall;

public class Halls {
	private List<Hall> halls = new ArrayList<Hall>();

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
}
