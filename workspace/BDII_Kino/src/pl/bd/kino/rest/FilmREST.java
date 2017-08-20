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
import pl.bd.kino.ejb.FilmEJB;
import pl.bd.kino.entities.Film;
import pl.bd.kino.entities.Show;
import pl.bd.kino.lists.Films;
import pl.bd.kino.lists.Shows;


@Path("/film")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class FilmREST {

	@EJB
	FilmEJB bean;

	@POST
	public String createFilm(Film film) {
		bean.create(film);
		return "film created!";
	}
	
	@GET
	@Path("/{id}")
	public Film findFilm(@PathParam("id") int id) {
		Film film = bean.find(id);
		return film;
	}
	
	@GET
	public Films getFilms() {
		List<Film> lfilms = bean.get();
		Films films = new Films(lfilms);
		return films;
	}

	@PUT
	@Path("/{id}")
	public String updateFilm(@PathParam("id") int id, Film film) {
		try {
			bean.update(id, film);
			return "film added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "film not added/updated :(";
		}
	}

	@DELETE
	@Path("/{id}")
	public void deleteFilm(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@GET
	@Path("/{id}/shows")
	public Shows getShows(@PathParam("id") int id) {
		List<Show> lshows = bean.getShows(id);
		Shows shows = new Shows(lshows);
		return shows;
	}
}
