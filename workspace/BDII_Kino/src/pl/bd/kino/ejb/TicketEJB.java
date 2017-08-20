package pl.bd.kino.ejb;

import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Ticket;
import pl.bd.kino.lists.Tickets;

@Stateless
public class TicketEJB extends AbstractEJB<Ticket> {
	
	public TicketEJB() {
		super(Ticket.class);
	}
	
	@Override
	public List<Ticket> get() {
		Query q = manager.createQuery("select t from Ticket t");
		 return q.getResultList();
	}
	
	@Override
    public void update(int id, Ticket _ticket) {
		Ticket ticket = manager.find(Ticket.class, id);
		ticket.setPlace(_ticket.getPlace());
		ticket.setShow(_ticket.getShow());
		ticket.setTicketType(_ticket.getTicketType());
    }
	
	public Tickets findTickets(int showId){
		List<Ticket> allTickets = get();
		List<Ticket> tickets = new ArrayList<Ticket>();
		for(Ticket ticket : allTickets){
			if(ticket.getShow().getId() == showId)
				tickets.add(ticket);
		}
		return new Tickets(tickets);
	}
}
