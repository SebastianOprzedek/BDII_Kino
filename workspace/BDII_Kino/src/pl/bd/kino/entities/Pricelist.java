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
@Table(name = "Cennik")
public class Pricelist implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="PRICELIST_SEQ", sequenceName="CENNIK_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="PRICELIST_SEQ")
	@Column(name="id")
	int id;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="CENY_ID", foreignKey = @ForeignKey(name = "CENNIK_CENY_FK"))
	Price price;
		
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Price getPrice() {
		return price;
	}
	public void setPrice(Price price) {
		this.price = price;
	}	
}