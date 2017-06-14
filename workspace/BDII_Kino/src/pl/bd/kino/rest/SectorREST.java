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
import pl.bd.kino.ejb.SectorEJB;
import pl.bd.kino.lists.Sectors;
import pl.bd.kino.entities.Sector;


@Path("/sector")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class SectorREST {

	@EJB
	SectorEJB bean;

	@POST
	public String createSector(Sector sector) {
		bean.create(sector);
		return "sector created!";
	}
	
	@GET
	@Path("/{id}")
	public Sector findSector(@PathParam("id") int id) {
		Sector sector = bean.find(id);
		return sector;
	}
	
	@GET
	public Sectors getSectors() {
		List<Sector> lsectors = bean.get();
		Sectors sectors = new Sectors(lsectors);
		return sectors;
	}

	@PUT
	@Path("/{id}")
	public String updateSector(@PathParam("id") int id, Sector sector) {
		try {
			bean.update(id, sector);
			return "sector added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "sector not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteSector(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
