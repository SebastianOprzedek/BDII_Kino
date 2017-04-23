package pl.bd.kino;

import javax.ejb.Local;

@Local
public interface Cinema {

	public abstract String create(Film film);

	public abstract Film find(int id);

	public abstract Films get();

	public abstract String update(Film film);

	public abstract void delete(int id);

}