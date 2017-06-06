package pl.bd.kino;

import java.io.Serializable;
import java.sql.Blob;

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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Zdjecia")
public class Photo implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="PHOTO_SEQ", sequenceName="ZDJECIA_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="PHOTO_SEQ")
	@Column(name="id")
	int idc;
	@JsonIgnore
	@Column(name="zdjecie")
	Blob photo;
	@JsonIgnore
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="FILM_ID", foreignKey = @ForeignKey(name = "ZDJECIA_FILM_FK"), nullable=false, insertable = true)
	Film film;
		
	public int getIdc() {
		return idc;
	}
	public void setIdc(int idc) {
		this.idc = idc;
	}
	public Blob getPhoto() {
		return photo;
	}
	public void setPhoto(Blob photo) {
		this.photo = photo;
	}
	public Film getFilm() {
		return film;
	}
	public void setFilm(Film photo) {
		this.film = photo;
	}
}
