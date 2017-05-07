package pl.bd.kino;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Stateless
public class CinemaEJB {
	
	@PersistenceContext(name="kino")
	EntityManager manager;

	
	public void createFilm(Film film) {
		System.out.println("Creating film!");
		manager.persist(film);
	}
	
	public void createGenre(Genre genre) {
		System.out.println("Creating genre!");
		manager.persist(genre);
	}
	
	public void createPhoto(Photo photo) {
		System.out.println("Creating photo!");
		manager.persist(photo);
	}
	
	public void createPrice(Price price) {
		System.out.println("Creating price!");
		manager.persist(price);
	}
	
	public void createTicketType(Ticket_type type) {
		System.out.println("Creating type!");
		manager.persist(type);
	}

	public void deleteFilm(int id) {
		Film film = manager.find(Film.class, id);
		manager.remove(film);
	}
	
	public void deleteGenre(int id) {
		Genre genre = manager.find(Genre.class, id);
		manager.remove(genre);
	}
	
	public void deletePhoto(int id) {
		Photo photo = manager.find(Photo.class, id);
		manager.remove(photo);
	}
	
	public void deletePrice(int id) {
		Price price = manager.find(Price.class, id);
		manager.remove(price);
	}
	
	public void deleteTicketType(int id) {
		Ticket_type type = manager.find(Ticket_type.class, id);
		manager.remove(type);
	}

//	public List<Film> findByMake(String make) {
//		Query q = manager.createQuery("select tytul from Filmy f where f.make like :make");
//		q.setParameter("make", make);
//		@SuppressWarnings("unchecked")
//		List<Film> lista =q.getResultList();
//		return lista;
//	}

	public Film findFilm(int id) {
		return manager.find(Film.class, id);
	}
	
	public Genre findGenre(int id) {
		return manager.find(Genre.class, id);
	}
	
	public Photo findPhoto(int id) {
		return manager.find(Photo.class, id);
	}
	
	public Price findPrice(int id) {
		return manager.find(Price.class, id);
	}
	
	public Ticket_type findTicketType(int id) {
		return manager.find(Ticket_type.class, id);
	}

	public List<Film> getFilms() {
		Query q = manager.createQuery("select f from Film f");
		@SuppressWarnings("unchecked")
		List<Film> list = q.getResultList();
		return list;
	}
	
	public List<Genre> getGenres() {
		Query q = manager.createQuery("select g from Genre g");
		@SuppressWarnings("unchecked")
		List<Genre> list = q.getResultList();
		return list;
	}
	
	public List<Photo> getPhotos() {
		Query q = manager.createQuery("select p from Photo p");
		@SuppressWarnings("unchecked")
		List<Photo> list = q.getResultList();
		return list;
	}
	
	public List<Price> getPrices() {
		Query q = manager.createQuery("select pr from Price pr");
		@SuppressWarnings("unchecked")
		List<Price> list = q.getResultList();
		return list;
	}
	
	public List<Ticket_type> getTicketTypes() {
		Query q = manager.createQuery("select t from Ticket_type t");
		@SuppressWarnings("unchecked")
		List<Ticket_type> list = q.getResultList();
		return list;
	}

	public void updateFilm(Film film) {
		film = manager.merge(film);
	}
	
	public void updateGenre(Genre genre) {
		genre = manager.merge(genre);
	}
	
	public void updatePhoto(Photo photo) {
		photo = manager.merge(photo);
	}
	
	public void updatePrice(Price price) {
		price = manager.merge(price);
	}

	public void updateTicketType(Ticket_type type) {
		type = manager.merge(type);
	}
	
}
