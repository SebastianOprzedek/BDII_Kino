package pl.bd.kino;

import javax.ejb.Local;

@Local
public interface Cinema {

	public abstract String create(Film film);

	public abstract Film find(int id);

	public abstract Films get();

	public abstract String update(Film film);

	public abstract void delete(int id);
	
	public abstract String createGenre(Genre genre);
	
	public abstract Genre findGenre(int id);
	
	public abstract Genres getGenre();
	
	public abstract String update(Genre genre);
	
	public abstract void deleteGenre(int id);

}