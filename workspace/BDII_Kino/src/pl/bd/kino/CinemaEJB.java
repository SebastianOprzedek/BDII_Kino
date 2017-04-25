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

	public void delete(int id) {
		Film film = manager.find(Film.class, id);
		manager.remove(film);
	}

	public List<Film> findByMake(String make) {
		Query q = manager.createQuery("select tytul from Filmy f where f.make like :make");
		q.setParameter("make", make);
		@SuppressWarnings("unchecked")
		List<Film> lista =q.getResultList();
		return lista;
	}

	public Film find(int id) {
		return manager.find(Film.class, id);
	}

	public List<Film> get() {
		Query q = manager.createQuery("select f from Film f");
		@SuppressWarnings("unchecked")
		List<Film> list = q.getResultList();
		return list;
	}

	public void update(Film film) {
		film = manager.merge(film);
	}

	
}
