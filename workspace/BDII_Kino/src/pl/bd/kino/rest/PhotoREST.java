package pl.bd.kino.rest;

import java.sql.Blob;
import java.util.List;
import javax.ejb.EJB;
import javax.sql.rowset.serial.SerialBlob;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.apache.commons.codec.binary.Base64;
import pl.bd.kino.ejb.FilmEJB;
import pl.bd.kino.ejb.PhotoEJB;
import pl.bd.kino.lists.Photos;
import pl.bd.kino.entities.Photo;


@Path("/photo")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class PhotoREST {

	@EJB
	PhotoEJB photoBean;
	
	@EJB
	FilmEJB filmBean;

	@POST
	@Path("/create/{id}")
	public String createPhoto(@PathParam("id") int id, String img64) {
		try{
		byte[] img64bytes = img64.getBytes(); 
		byte[] img = Base64.decodeBase64(img64bytes);
		Blob blob = new SerialBlob(img);
		Photo photo = new Photo();
		photo.setPhoto(blob);
		photo.setFilm(filmBean.find(id));		
		photoBean.create(photo);
		return "";
		}
		catch(Exception e){
			e.printStackTrace();
		}
		return "error";
	}	
	
	@GET
	@Path("/find/{id}")
	public String findPhoto(@PathParam("id") int id) {
		String photo64 = "";
		try{
		Blob blob = photoBean.find(id).getPhoto();
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
	
	@GET	
	@Path("/get")
	public Photos getPhotos() {	
		List<Photo> lphotos = photoBean.get();
		Photos genres = new Photos(lphotos);
		return genres;
	}

	@PUT
	@Path("/update/{id}")
	public String updatePhoto(@PathParam("id") int id, Photo photo) {
		try {
			photoBean.update(id, photo);
			return "photo added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "photo not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/delete/{id}")
	public void deletePhoto(@PathParam("id") int id) {
		try {
			photoBean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
}
