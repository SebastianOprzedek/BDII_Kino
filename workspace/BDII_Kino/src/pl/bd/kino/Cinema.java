package pl.bd.kino;

import javax.ejb.Local;

@Local
public interface Cinema {

	public abstract String createFilm(Film film);

	public abstract Film findFilm(int id);

	public abstract Films getFilms();

	public abstract String updateFilm(Film film);

	public abstract void deleteFilm(int id);
	
	public abstract String createGenre(Genre genre);
	
	public abstract Genre findGenre(int id);
	
	public abstract Genres getGenres();
	
	public abstract String updateGenre(Genre genre);
	
	public abstract void deleteGenre(int id);
	
	public abstract String createPhoto(Photo photo);
	
	public abstract Photo findPhoto(int id);
	
	public abstract Photos getPhotos();
	
	public abstract String updatePhoto(Photo photo);
	
	public abstract void deletePhoto(int id);
	
	public abstract String createPrice(Price price);
	
	public abstract Price findPrice(int id);
	
	public abstract Prices getPrices();
	
	public abstract String updatePrice(Price price);
	
	public abstract void deletePrice(int id);

}