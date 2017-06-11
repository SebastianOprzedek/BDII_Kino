package pl.bd.kino.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "Seans")
public class Show implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="SHOW_SEQ", sequenceName="SEANS_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="SHOW_SEQ")
	@Column(name="id")
	int id;
	@Column(name="data")
	Date data;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="SALA_ID", foreignKey = @ForeignKey(name = "SEANS_SALA_FK"))
	Hall hall;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="FILM_ID", foreignKey = @ForeignKey(name = "SEANS_FILM_FK"))
	Film film;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getData() {
		return data;
	}
	public void setData(Date data) {
		this.data = data;
	}
	public Hall getHall() {
		return this.hall;
	}
	public void setHall_id(Hall hall) {
		this.hall = hall;
	}
	public Film getFilm() {
		return this.film;
	}
	public void setFilm(Film film) {
		this.film = film;
	}	
}
