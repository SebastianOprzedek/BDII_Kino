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
@Table(name = "Gatunek")
public class Genre implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="GENRE_SEQ", sequenceName="GATUNEK_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="GENRE_SEQ")
	@Column(name="id")
	int id;
	@Column(name="nazwa")
	String name;
	@Column(name="opis")
	String description;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}	
}
