package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import pl.bd.kino.entities.Genre;

@Stateless
public class GenreEJB extends AbstractEJB<Genre> {
	
	@PersistenceContext(name="kino")
	EntityManager manager;

	public GenreEJB() {
		super(Genre.class);
	}
	
	@Override
	public List<Genre> get() {
		Query q = manager.createQuery("select g from Genre g");
		return q.getResultList();
	}
}
