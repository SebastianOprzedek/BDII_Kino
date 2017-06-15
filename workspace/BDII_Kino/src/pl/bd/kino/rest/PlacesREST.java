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

import pl.bd.kino.ejb.PlaceEJB;
import pl.bd.kino.entities.Place;
import pl.bd.kino.lists.Places;


@Path("/places")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PlacesREST {

	@EJB
	PlaceEJB bean;

	@POST
	public String createPlace(Place place) {
		bean.create(place);
		return "place created!";
	}
	
	@GET
	@Path("/{id}")
	public Place findPlace(@PathParam("id") int id) {
		Place place = bean.find(id);
		return place;
	}
	
	@GET
	public Places getPricelists() {
		List<Place> lplaces = bean.get();
		Places places = new Places(lplaces);
		return places;
	}

	@PUT
	@Path("/{id}")
	public String updatePlace(@PathParam("id") int id, Place place) {
		try {
			bean.update(id, place);
			return "place added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "place not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deletePlace(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
