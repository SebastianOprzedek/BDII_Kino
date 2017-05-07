package pl.bd.kino;

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

public class CinemaREST implements Cinema {

	@EJB
	CinemaEJB bean;

	@Override
	@POST
	@Path("/film/create")
	public String createFilm(Film film) {
		bean.createFilm(film);
		return "film created!";
	}
	
	@Override
	@POST
	@Path("/genre/create")
	public String createGenre(Genre genre) {
		bean.createGenre(genre);
		return "genre created!";
	}

	@Override
	@GET
	@Path("/film/find/{id}")
	public Film findFilm(@PathParam("id") int id) {
		Film film = bean.findFilm(id);
		return film;
	}

	@Override
	@GET
	@Path("/genre/find/{id}")
	public Genre findGenre(@PathParam("id") int id) {
		Genre genre = bean.findGenre(id);
		return genre;
	}

	@Override
	@GET
	@Path("/film/get")
	public Films getFilms() {
		List<Film> lfilms = bean.getFilms();
		Films films = new Films(lfilms);
		return films;
	}

	@GET
	@Path("/genre/get")
	public Genres getGenres() {
		List<Genre> lgenres = bean.getGenres();
		Genres genres = new Genres(lgenres);
		return genres;
	}

	@Override
	@POST
	@Path("/film/update")
	public String updateFilm(Film film) {
		try {
			bean.updateFilm(film);
			return "film added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "film not added/updated :(";
		}
	}
	
	@Override
	@POST
	@Path("/genre/update")
	public String updateGenre(Genre genre) {
		try {
			bean.updateGenre(genre);
			return "genre added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "genre not added/updated :(";
		}
	}


	@Override
	@GET
	@Path("/film/delete/{id}")
	public void deleteFilm(@PathParam("id") int id) {
		try {
			bean.deleteFilm(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	@GET
	@Path("/genre/delete/{id}")
	public void deleteGenre(@PathParam("id") int id) {
		try {
			bean.deleteGenre(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
