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

	
	public void create(Film film) {
		System.out.println("Creating film!");
		manager.persist(film);
	}
	
	public void createGenre(Genre genre) {
		System.out.println("Creating genre!");
		manager.persist(genre);
	}

	public void delete(int id) {
		Film film = manager.find(Film.class, id);
		manager.remove(film);
	}
	
	public void deleteGenre(int id) {
		Genre genre = manager.findGenre(Genre.class, id);
		manager.remove(genre);
	}

	public List<Film> findByMake(String make) {
		Query q = manager.createQuery("select tytul from Filmy f where f.make like :make");
		q.setParameter("make", make);
		@SuppressWarnings("unchecked")
		List<Film> lista =q.getResultList();
		return lista;
	}
	
	public List<Genre> findByMake(String make) {
		Query q = manager.createQuery("select nazwa from Gatunek g where g.make like :make");
		q.setParameter("make", make);
		@SuppressWarnings("unchecked")
		List<Genre> lista =q.getResultList();
		return lista;
	}

	public Film find(int id) {
		return manager.find(Film.class, id);
	}
	
	public Genre findGenre(int id) {
		return manager.find(Genre.class, id);
	}

	public List<Film> get() {
		Query q = manager.createQuery("select f from Film f");
		@SuppressWarnings("unchecked")
		List<Film> list = q.getResultList();
		return list;
	}
	
	public List<Genre> getGenre() {
		Query q = manager.createQuery("select g from Genre g");
		@SuppressWarnings("unchecked")
		List<Genre> list = q.getResultList();
		return list;
	}

	public void update(Film film) {
		film = manager.merge(film);
	}
	
	public void updateGenre(Genre genre) {
		genre = manager.merge(genre);
	}

	
}
