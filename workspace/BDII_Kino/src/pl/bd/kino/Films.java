package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Films {
	private List<Film> films = new ArrayList<Film>();

	public Films(List<Film> films) {
		super();
		this.films = films;
	}

	public Films() {	}
	
	public List<Film> getFilms() {
		return films;
	}

	public void setFilms(List<Film> films) {
		this.films = films;
	}
	
	
	
}
