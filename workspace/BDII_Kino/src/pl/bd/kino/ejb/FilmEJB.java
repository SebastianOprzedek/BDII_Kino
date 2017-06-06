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
}
