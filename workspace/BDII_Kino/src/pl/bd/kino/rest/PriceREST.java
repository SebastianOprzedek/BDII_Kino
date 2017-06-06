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
import pl.bd.kino.ejb.PriceEJB;
import pl.bd.kino.lists.Prices;
import pl.bd.kino.entities.Price;


@Path("/price")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PriceREST {

	@EJB
	PriceEJB bean;

	@POST
	@Path("/create")
	public String createPrice(Price price) {
		bean.create(price);
		return "price created!";
	}
	
	@GET
	@Path("/find/{id}")
	public Price findPrice(@PathParam("id") int id) {
		Price price = bean.find(id);
		return price;
	}
	
	@GET
	@Path("/get")
	public Prices getPrices() {
		List<Price> lprices = bean.get();
		Prices prices = new Prices(lprices);
		return prices;
	}

	@PUT
	@Path("/update/{id}")
	public String updatePrice(@PathParam("id") int id, Price price) {
		try {
			bean.update(id, price);
			return "price added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "price not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/delete/{id}")
	public void deletePrice(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
