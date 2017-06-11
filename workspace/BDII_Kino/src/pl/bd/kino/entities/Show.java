package pl.bd.kino.entities;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	@Column(name="sala_id")
	int sala_id;
	@Column(name="film_id")
	int film_id;	
	
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
	public int getSala_id() {
		return sala_id;
	}
	public void setSala_id(int sala_id) {
		this.sala_id = sala_id;
	}
	public int getFilm_id() {
		return film_id;
	}
	public void setFilm_id(int film_id) {
		this.film_id = film_id;
	}	
}
