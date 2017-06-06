package pl.bd.kino;

import java.sql.Blob;
import java.util.List;

import javax.ejb.EJB;
import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.commons.codec.binary.Base64;


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
	@POST
	@Path("/price/create")
	public String createPrice(Price price) {
		bean.createPrice(price);
		return "price created!";
	}
	
	@Override
	@POST
	@Path("/ticket_type/create")
	public String createTicketType(Ticket_type type) {
		bean.createTicketType(type);
		return "ticket type created!";
	}

	@Override
	@POST
	@Path("/photo/create/{id}")
	public String createPhoto(@PathParam("id") int id, String img64) {
		try{
		byte[] img64bytes = img64.getBytes(); 
		byte[] img = Base64.decodeBase64(img64bytes);
		Blob blob = new SerialBlob(img);
		Photo photo = new Photo();
		photo.setPhoto(blob);
		photo.setFilm(bean.findFilm(id));		
		bean.createPhoto(photo);
		return "";
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return "error";
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
	@Path("/photo/find/{id}")
	public String findPhoto(@PathParam("id") int id) {
		String photo64 = "";
		try{
		Blob blob = bean.findPhoto(id).getPhoto();
		int blobLength = (int) blob.length();  
		byte[] blobAsBytes = blob.getBytes(1, blobLength);
		byte[] img64 = Base64.encodeBase64(blobAsBytes);
		photo64 = new String(img64);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return photo64;
	}
	
	@Override
	@GET
	@Path("/price/find/{id}")
	public Price findPrice(@PathParam("id") int id) {
		Price price = bean.findPrice(id);
		return price;
	}
	
	@Override
	@GET
	@Path("/ticket_type/find/{id}")
	public Ticket_type findTicketType(@PathParam("id") int id) {
		Ticket_type type = bean.findTicketType(id);
		return type;
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

	@GET	
	@Path("/photo/get")
	public Photos getPhotos() {	
		List<Photo> lphotos = bean.getPhotos();
		Photos genres = new Photos(lphotos);
		return genres;
	}
	
	@GET
	@Path("/price/get")
	public Prices getPrices() {
		List<Price> lprices = bean.getPrices();
		Prices prices = new Prices(lprices);
		return prices;
	}
	
	@GET
	@Path("/ticket_type/get")
	public Ticket_types getTicketTypes() {
		List<Ticket_type> ltypes = bean.getTicketTypes();
		Ticket_types types = new Ticket_types(ltypes);
		return types;
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
	@POST
	@Path("/photo/update")
	public String updatePhoto(Photo photo) {
		try {
			bean.updatePhoto(photo);
			return "photo added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "photo not added/updated :(";
		}
	}
	
	@Override
	@POST
	@Path("/price/update")
	public String updatePrice(Price price) {
		try {
			bean.updatePrice(price);
			return "price added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "price not added/updated :(";
		}
	}
	
	@Override
	@POST
	@Path("/ticket_type/update")
	public String updateTicketType(Ticket_type type) {
		try {
			bean.updateTicketType(type);
			return "type added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "type not added/updated :(";
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
	
	@Override
	@GET
	@Path("/photo/delete/{id}")
	public void deletePhoto(@PathParam("id") int id) {
		try {
			bean.deletePhoto(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	@GET
	@Path("/price/delete/{id}")
	public void deletePrice(@PathParam("id") int id) {
		try {
			bean.deletePrice(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	@GET
	@Path("/ticket_type/delete/{id}")
	public void deleteTicketType(@PathParam("id") int id) {
		try {
			bean.deleteTicketType(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
