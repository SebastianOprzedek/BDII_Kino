package pl.bd.kino;

import java.io.File;
import java.util.List;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/")
@Consumes({ "application/json" })
@Produces({ "application/json" })

//@Consumes({ "application/xml" })
//@Produces({ "application/xml" })

public class CinemaREST implements Cinema {

	@EJB
	CinemaEJB bean;

	@Override
	@POST
	@Path("/create")
	public String create(Film film) {
		bean.create(film);
		return "car created!";
	}

	@Override
	@GET
	@Path("/find/{id}")
	public Film find(@PathParam("id") int id) {
		Film film = bean.find(id);
		return film;
	}

	@Override
	@GET
	@Path("/get")
	public Films get() {
		List<Film> lfilms = bean.get();
		Films films = new Films(lfilms);
		return films;
	}
	
	@GET
	@Path("/klient")
    @Produces("text/html")
	public File klient() {
		return new File("c:/BDII_Kino/frontend/films.html");
	}

	@Override
	@POST
	@Path("/update")
	public String update(Film film) {
		try {
			bean.update(film);
			return "film added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "film not added/updated :(";
		}
	}


	@Override
	@GET
	@Path("/delete/{id}")
	public void delete(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


}
