package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Photo;

@Stateless
public class PhotoEJB extends AbstractEJB<Photo> {
			
	public PhotoEJB() {
		super(Photo.class);
	}
	
	@Override
	public List<Photo> get() {
		Query q = manager.createQuery("select p from Photo p");
		 return q.getResultList();
	}
}
