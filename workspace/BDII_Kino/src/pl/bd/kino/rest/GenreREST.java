package pl.bd.kino.rest;

import java.util.List;
import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import pl.bd.kino.ejb.GenreEJB;
import pl.bd.kino.lists.Genres;
import pl.bd.kino.entities.Genre;


@Path("/genre")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class GenreREST {

	@EJB
	GenreEJB bean;

	@POST
	@Path("/create")
	public String createGenre(Genre genre) {
		bean.create(genre);
		return "genre created!";
	}	
	
	@GET
	@Path("/find/{id}")
	public Genre findGenre(@PathParam("id") int id) {
		Genre genre = bean.find(id);
		return genre;
	}
	
	@GET
	@Path("/get")
	public Genres getGenres() {
		List<Genre> lgenres = bean.get();
		Genres genres = new Genres(lgenres);
		return genres;
	}

	@POST
	@Path("/update")
	public String updateGenre(Genre genre) {
		try {
			bean.update(genre);
			return "genre added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "genre not added/updated :(";
		}
	}
	
	@GET
	@Path("/delete/{id}")
	public void deleteGenre(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
}
