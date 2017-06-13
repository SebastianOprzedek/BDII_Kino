package pl.bd.kino.rest;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import pl.bd.kino.ejb.TicketEJB;
import pl.bd.kino.lists.Tickets;
import pl.bd.kino.entities.Ticket;


@Path("/ticket")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class TicketREST {

	@EJB
	TicketEJB bean;

	@POST
	public String createTicket(Ticket ticket) {
		bean.create(ticket);
		return "ticket created!";
	}
	
	@GET
	@Path("/{id}")
	public Ticket findTicket(@PathParam("id") int id) {
		Ticket ticket = bean.find(id);
		return ticket;
	}
	
	@GET
	public Tickets getTickets() {
		List<Ticket> lptickets = bean.get();
		Tickets tickets = new Tickets(lptickets);
		return tickets;
	}

	@PUT
	@Path("/{id}")
	public String updateTicket(@PathParam("id") int id, Ticket ticket) {
		try {
			bean.update(id, ticket);
			return "ticket added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "ticket not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTicket(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
