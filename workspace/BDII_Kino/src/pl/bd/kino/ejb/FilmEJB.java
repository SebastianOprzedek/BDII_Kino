package pl.bd.kino.ejb;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Film;
import pl.bd.kino.entities.Show;
import pl.bd.kino.entities.Photo;

@Stateless
public class FilmEJB extends AbstractEJB<Film> {

	@EJB
	ShowEJB showBean;
	
	public FilmEJB() {
		super(Film.class);
	}
	
	@Override
	public List<Film> get() {
		Query q = manager.createQuery("select f from Film f");
		 return q.getResultList();
	}

	@Override
    public void update(int id, Film _film) {
		Film film = manager.find(Film.class, id);
		film.setDescription(_film.getDescription());
		film.setLength(_film.getLength());
		film.setProduction_year(_film.getProduction_year());
		film.setGenre(_film.getGenre());
		film.setTitle(_film.getTitle());
    }
	
	public void deletePhoto(int id){
		Photo photo = manager.find(Photo.class, id);
		manager.remove(photo);
	    Film film = photo.getFilm();
	    List<Photo> photos = film.getPhotos();
	    photos.remove(photo);
	    film.setPhotos(photos);	    
	}
	
	public List<Show> getShows(int id){
		Film film = manager.find(Film.class, id);
		List<Show> shows = showBean.get();
		List<Show> filmShows = new ArrayList<Show>();
		for(Show show : shows){
			if(film == show.getFilm())
				filmShows.add(show);
		}
		return filmShows;
	}
	
}
