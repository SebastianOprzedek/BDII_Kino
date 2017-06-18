package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;

import pl.bd.kino.entities.TicketType;

public class TicketTypes {
	private List<TicketType> ticketTypes = new ArrayList<TicketType>();

	public TicketTypes(List<TicketType> ticketTypes) {
		super();
		this.ticketTypes = ticketTypes;
	}

	public TicketTypes() {	}

	public List<TicketType> getTicketTypes() {
		return ticketTypes;
	}

	public void setTicketTypes(List<TicketType> ticketTypes) {
		this.ticketTypes = ticketTypes;
	}
}
