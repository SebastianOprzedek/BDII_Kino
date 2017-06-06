package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Ticket;

public class Tickets {
	private List<Ticket> tickets = new ArrayList<Ticket>();

	public Tickets(List<Ticket> tickets) {
		super();
		this.tickets = tickets;
	}

	public Tickets() {	}

	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}
}
