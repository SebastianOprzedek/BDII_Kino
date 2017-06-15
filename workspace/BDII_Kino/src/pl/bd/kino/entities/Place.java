package pl.bd.kino.entities;

import java.io.Serializable;

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
@Table(name = "Miejsce")
public class Place implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="PLACE_SEQ", sequenceName="MIEJSCE_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="PLACE_SEQ")
	@Column(name="id")
	int id;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="SEKTOR_ID", foreignKey = @ForeignKey(name = "MIEJSCE_SEKTOR_FK"))
	Sector sector;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="SALA_ID", foreignKey = @ForeignKey(name = "MIEJSCE_SALA_FK"))
	Hall hall;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Sector getSector() {
		return sector;
	}
	public void setSector(Sector sector) {
		this.sector = sector;
	}
	public Hall getHall() {
		return hall;
	}
	public void setHall(Hall hall) {
		this.hall = hall;
	}
		
}
