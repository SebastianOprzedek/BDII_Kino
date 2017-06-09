package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Genre;

@Stateless
public class GenreEJB extends AbstractEJB<Genre> {
	
	public GenreEJB() {
		super(Genre.class);
	}
	
	@Override
	public List<Genre> get() {
		Query q = manager.createQuery("select g from Genre g");
		return q.getResultList();
	}
}
