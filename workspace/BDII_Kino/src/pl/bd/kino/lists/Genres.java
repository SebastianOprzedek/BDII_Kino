package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Genre;

public class Genres {
	private List<Genre> genres = new ArrayList<Genre>();

	public Genres(List<Genre> genres) {
		super();
		this.genres = genres;
	}

	public Genres() {	}

	public List<Genre> getGenres() {
		return genres;
	}

	public void setGenres(List<Genre> genres) {
		this.genres = genres;
	}	
}
