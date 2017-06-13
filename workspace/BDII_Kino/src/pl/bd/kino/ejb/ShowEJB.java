package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;

import pl.bd.kino.entities.Film;
import pl.bd.kino.entities.Show;

@Stateless
public class ShowEJB extends AbstractEJB<Show> {
	
	public ShowEJB() {
		super(Show.class);
	}
	
	@Override
	public List<Show> get() {
		Query q = manager.createQuery("select s from Show s");
		 return q.getResultList();
	}
	
	@Override
    public void update(int id, Show _show) {
		Show show = manager.find(Show.class, id);
		show.setData(_show.getData());
		show.setHall(_show.getHall());
		show.setFilm(_show.getFilm());
		}	
}
