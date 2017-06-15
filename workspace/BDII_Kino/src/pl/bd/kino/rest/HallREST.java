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

import pl.bd.kino.ejb.HallEJB;
import pl.bd.kino.ejb.PlaceEJB;
import pl.bd.kino.entities.Hall;
import pl.bd.kino.lists.Halls;


@Path("/hall")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class HallREST {

	@EJB
	HallEJB bean;

	@EJB
	PlaceEJB placeBean;

	@POST
	public String createHall(Hall hall) {
		bean.create(hall);
		return "hall created!";
	}

	@GET
	@Path("/{id}")
	public Hall findHall(@PathParam("id") int id) {
		Hall hall = bean.find(id);
		return hall;
	}

	@GET
	public Halls getHalls() {
		List<Hall> lphalls = bean.get();
		Halls halls = new Halls(lphalls);
		return halls;
	}

	@PUT
	@Path("/{id}")
	public String updateHall(@PathParam("id") int id, Hall hall) {
		try {
			bean.update(id, hall);
			return "hall added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "hall not added/updated :(";
		}
	}

	@DELETE
	@Path("/{id}")
	public void deleteHall(@PathParam("id") int id) {
		try {
			placeBean.deleteByHall(id);
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
