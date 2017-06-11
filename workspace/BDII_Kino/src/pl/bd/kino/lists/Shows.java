package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Show;

public class Shows {
	private List<Show> shows = new ArrayList<Show>();

	public Shows(List<Show> shows) {
		super();
		this.shows = shows;
	}

	public Shows() {	}
	
	public List<Show> getShows() {
		return shows;
	}

	public void setShows(List<Show> shows) {
		this.shows = shows;
	}
}
