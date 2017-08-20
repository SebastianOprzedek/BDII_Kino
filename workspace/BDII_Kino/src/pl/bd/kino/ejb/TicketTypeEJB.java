package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.TicketType;

@Stateless
public class TicketTypeEJB extends AbstractEJB<TicketType> {
	
	public TicketTypeEJB() {
		super(TicketType.class);
	}
	
	@Override
	public List<TicketType> get() {
		Query q = manager.createQuery("select t from TicketType t");
		 return q.getResultList();
	}
	
	@Override
    public void update(int id, TicketType _ticketType) {
		TicketType ticketType = manager.find(TicketType.class, id);
		ticketType.setName(_ticketType.getName());
		ticketType.setPricelist(_ticketType.getPricelist());
	}	
}
