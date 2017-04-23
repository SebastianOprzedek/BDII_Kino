package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Ticket_types {
	private List<Ticket_type> ticket_types = new ArrayList<Ticket_type>();

	public Ticket_types(List<Ticket_type> ticket_types) {
		super();
		this.ticket_types = ticket_types;
	}

	public Ticket_types() {	}

	public List<Ticket_type> getTicket_types() {
		return ticket_types;
	}

	public void setTicket_types(List<Ticket_type> ticket_types) {
		this.ticket_types = ticket_types;
	}
	
	
	
	
	
}
