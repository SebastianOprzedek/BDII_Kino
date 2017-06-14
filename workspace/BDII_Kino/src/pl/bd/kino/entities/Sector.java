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
@Table(name = "Sektor")
public class Sector implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="SECTOR_SEQ", sequenceName="SEKTOR_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="SECTOR_SEQ")
	@Column(name="id")
	int id;
	@Column(name="nazwa")
	String name;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="CENNIK_ID", foreignKey = @ForeignKey(name = "SEKTOR_CENNIK_FK"))
	Pricelist pricelist;	
	
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
	public Pricelist getPricelist() {
		return pricelist;
	}
	public void setPricelist(Pricelist pricelist) {
		this.pricelist = pricelist;
	}
		
}
