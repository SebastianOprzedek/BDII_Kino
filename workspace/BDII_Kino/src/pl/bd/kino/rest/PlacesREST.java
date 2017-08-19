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
import pl.bd.kino.ejb.ShowEJB;
import pl.bd.kino.entities.Hall;
import pl.bd.kino.entities.Place;
import pl.bd.kino.lists.Places;


@Path("/place")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PlacesREST {

	@EJB
	PlaceEJB placeBean;

	@EJB
	HallEJB hallBean;

	@EJB
	ShowEJB showBean;
	
	@PUT
	@Path("/{id}")
	public String updatePlaces(@PathParam("id") int id, Places newPlaces) { 
		Hall hall = hallBean.find(id);
		Places actualPlaces = placeBean.findPlaces(id);
		int number = 1;
		while(true){
			if(newPlaces.containPlace(number) && actualPlaces.containPlace(number))
				placeBean.update(actualPlaces.getPlaceId(number), newPlaces.getPlace(number));
			if(!newPlaces.containPlace(number) && actualPlaces.containPlace(number))
				placeBean.delete(actualPlaces.getPlaceId(number));
			if(newPlaces.containPlace(number) && !actualPlaces.containPlace(number))
				placeBean.addPlace(hall, newPlaces.getPlace(number));
			if(!newPlaces.containPlace(number) && !actualPlaces.containPlace(number))
				break;
			number++;
		}
		return "places modified!";
	}
	
	@GET
	@Path("/{id}")
	public Places findPlace(@PathParam("id") int id) {
		Places places = placeBean.findPlaces(id);
		return places;
	}
	
	@GET
	@Path("/free/{id}")
	public Places findFreePlace(@PathParam("id") int id) {
		Places freePlaces = showBean.freePlaces(id);
		return freePlaces;
	}
	
}
