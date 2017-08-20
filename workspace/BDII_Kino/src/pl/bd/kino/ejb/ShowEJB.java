package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Place;
import pl.bd.kino.entities.Show;
import pl.bd.kino.entities.Ticket;
import pl.bd.kino.lists.Places;

@Stateless
public class ShowEJB extends AbstractEJB<Show> {
	
	@EJB
	PlaceEJB placeBean;

	@EJB
	TicketEJB ticketBean;
	
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
	
	public Places freePlaces(int id) {
		Show show = manager.find(Show.class, id);		
		List<Place> allPlaces = placeBean.findPlaces(show.getHall().getId()).getPlaces();
		List<Ticket> tickets = ticketBean.findTickets(id).getTickets();
		for(Ticket ticket : tickets){
			allPlaces.remove(ticket.getPlace());		
		}
		return new Places(allPlaces);
	}
    
}
