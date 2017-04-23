package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Shows {
	private List<Show> shows = new ArrayList<Show>();

	public Shows(List<Show> shows) {
		super();
		this.shows = shows;
	}

	public Shows() {	}
	
	public List<Show> GetSeanse() {
		return shows;
	}

	public void setCars(List<Show> shows) {
		this.shows = shows;
	}
	
	
	
}
