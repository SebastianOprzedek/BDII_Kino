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
import pl.bd.kino.lists.TicketTypes;
import pl.bd.kino.entities.TicketType;

@Path("/ticket_type")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class TicketTypeREST {

	@EJB
	TicketTypeEJB bean;

	@POST
	public String createTicketType(TicketType type) {
		bean.create(type);
		return "ticket type created!";
	}

	@GET
	@Path("/{id}")
	public TicketType findTicketType(@PathParam("id") int id) {
		TicketType type = bean.find(id);
		return type;
	}
	
	@GET
	public TicketTypes getTicketTypes() {
		List<TicketType> ltypes = bean.get();
		TicketTypes types = new TicketTypes(ltypes);
		return types;
	}

	@PUT
	@Path("/{id}")
	public String updateTicketType(@PathParam("id") int id, TicketType type) {
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
