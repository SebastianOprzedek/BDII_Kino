package pl.bd.kino;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Film")
public class Film implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="FILM_SEQ", sequenceName="FILM_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="FILM_SEQ")
	@Column(name="id")
	int id;
	@Column(name="opis")
	String description;
	@Column(name="tytul")
	String title;
	@Column(name="rok_produkcji")
	int production_year;
	@Column(name="dlugosc")
	int length;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="GATUNEK_ID", foreignKey = @ForeignKey(name = "FILM_GATUNEK_FK"))
	Genre genre;

	@OneToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER, orphanRemoval = true)
	@JoinColumn(name="FILM_ID", foreignKey = @ForeignKey(name = "ZDJECIA_FILM_FK"))	
	private List<Photo> photos = new ArrayList<Photo>();
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getProduction_year() {
		return production_year;
	}
	public void setProduction_year(int production_year) {
		this.production_year = production_year;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	public Genre getGenre() {		
		return this.genre;
	}
	public void setGenre(Genre genre) {
		this.genre = genre;
	}
	public List<Photo> getPhotos() {
		return photos;
	}
	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}
}