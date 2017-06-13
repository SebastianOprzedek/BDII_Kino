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
import pl.bd.kino.ejb.PricelistEJB;
import pl.bd.kino.lists.Pricelists;
import pl.bd.kino.entities.Pricelist;


@Path("/pricelist")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PricelistREST {

	@EJB
	PricelistEJB bean;

	@POST
	public String createPricelist(Pricelist pricelist) {
		bean.create(pricelist);
		return "pricelist created!";
	}
	
	@GET
	@Path("/{id}")
	public Pricelist findPricelist(@PathParam("id") int id) {
		Pricelist pricelist = bean.find(id);
		return pricelist;
	}
	
	@GET
	public Pricelists getPricelists() {
		List<Pricelist> lpricelists = bean.get();
		Pricelists pricelists = new Pricelists(lpricelists);
		return pricelists;
	}

	@PUT
	@Path("/{id}")
	public String updatePricelist(@PathParam("id") int id, Pricelist pricelist) {
		try {
			bean.update(id, pricelist);
			return "pricelist added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "pricelist not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deletePricelist(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
