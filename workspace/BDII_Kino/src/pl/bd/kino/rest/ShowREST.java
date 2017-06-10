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
import pl.bd.kino.ejb.ShowEJB;
import pl.bd.kino.lists.Shows;
import pl.bd.kino.entities.Show;


@Path("/show")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class ShowREST {

	@EJB
	ShowEJB bean;

	@POST
	public String createShow(Show show) {
		bean.create(show);
		return "show created!";
	}
	
	@GET
	@Path("/{id}")
	public Show findShow(@PathParam("id") int id) {
		Show show = bean.find(id);
		return show;
	}
	
	@GET
	public Shows getShows() {
		List<Show> lpshows = bean.get();
		Shows shows = new Shows(lpshows);
		return shows;
	}

	@PUT
	@Path("/{id}")
	public String updateShow(@PathParam("id") int id, Show show) {
		try {
			bean.update(id, show);
			return "show added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "show not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteShow(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
