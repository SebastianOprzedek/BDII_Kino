package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Ticket_type;

@Stateless
public class TicketTypeEJB extends AbstractEJB<Ticket_type> {
	
	public TicketTypeEJB() {
		super(Ticket_type.class);
	}
	
	@Override
	public List<Ticket_type> get() {
		Query q = manager.createQuery("select t from Ticket_type t");
		 return q.getResultList();
	}
	
}
