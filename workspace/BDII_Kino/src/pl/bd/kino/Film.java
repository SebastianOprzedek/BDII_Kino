package pl.bd.kino;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@XmlRootElement
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
	@Column(name="gatunek_id")
	int genre_id;
	
	
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
	public int getGenre_id() {
		return genre_id;
	}
	public void setGenre_id(int genre_id) {
		this.genre_id = genre_id;
	}
	
	
		
}
