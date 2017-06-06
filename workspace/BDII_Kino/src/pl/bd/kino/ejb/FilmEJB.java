package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import pl.bd.kino.entities.Film;

@Stateless
public class FilmEJB extends AbstractEJB<Film> {
	
	@PersistenceContext(name="kino")
	EntityManager manager;

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
}
