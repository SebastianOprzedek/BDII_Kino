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
import pl.bd.kino.ejb.TicketTypeEJB;
import pl.bd.kino.lists.Ticket_types;
import pl.bd.kino.entities.Ticket_type;

@Path("/ticket_type")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class TicketTypeREST {

	@EJB
	TicketTypeEJB bean;

	@POST
	public String createTicketType(Ticket_type type) {
		bean.create(type);
		return "ticket type created!";
	}

	@GET
	@Path("/{id}")
	public Ticket_type findTicketType(@PathParam("id") int id) {
		Ticket_type type = bean.find(id);
		return type;
	}
	
	@GET
	public Ticket_types getTicketTypes() {
		List<Ticket_type> ltypes = bean.get();
		Ticket_types types = new Ticket_types(ltypes);
		return types;
	}

	@PUT
	@Path("/{id}")
	public String updateTicketType(@PathParam("id") int id, Ticket_type type) {
		try {
			bean.update(id, type);
			return "type added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "type not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTicketType(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
