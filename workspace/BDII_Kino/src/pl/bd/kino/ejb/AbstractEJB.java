package pl.bd.kino.ejb;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public abstract class AbstractEJB<T> {

    private final Class<T> classType;
    
	@PersistenceContext(name="kino")
	protected EntityManager manager;
	
	protected AbstractEJB (Class<T> classType) {
		this.classType = classType;
	}

    public void create(T t) {
		manager.persist(t);
    }

    public void update(int id, T _t) {
		T t = manager.find(classType, id);
		t = _t;
		manager.merge(t);
    }

    public void delete(int id) {
		T t = manager.find(classType, id);
		manager.remove(t);
    }

    public T find(int id) {
		return manager.find(classType, id);
    }

    public abstract List<T> get();

}