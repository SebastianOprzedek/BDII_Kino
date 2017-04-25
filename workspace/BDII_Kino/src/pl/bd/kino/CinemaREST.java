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
		return "film created!";
	}
	
	@Override
	@POST
	@Path("/createGenre")
	public String createGenre(Genre genre) {
		bean.create(genre);
		return "genre created!";
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
	@Path("/findGenre/{id}")
	public Genre find(@PathParam("id") int id) {
		Genre genre = bean.find(id);
		return genre;
	}

	@Override
	@GET
	@Path("/get")
	public Films get() {
		List<Film> lfilms = bean.get();
		Films films = new Films(lfilms);
		return films;
	}
	
	@Override
	@GET
	@Path("/getGenre")
	public Genres get() {
		List<Genre> lgenres = bean.get();
		Genres genres = new Genres(lgenres);
		return genres;
	}
	
	@GET
	@Path("/klient")
    @Produces("text/html")
	public File klient() {
		return new File("c:/BDII_Kino/frontend/films.html");
	}
	
	@GET
	@Path("/klient")
    @Produces("text/html")
	public File klientGenre() {
		return new File("c:/BDII_Kino/frontend/genres.html");
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
	@POST
	@Path("/updateGenre")
	public String updateGenre(Genre genre) {
		try {
			bean.update(genre);
			return "genre added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "genre not added/updated :(";
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
	
	@Override
	@GET
	@Path("/deleteGenre/{id}")
	public void deleteGenre(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


}
