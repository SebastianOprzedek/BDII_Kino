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
@Table(name = "Typ_biletu")
public class TicketType implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="TICKET_TYPE_SEQ", sequenceName="TYP_BILETU_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="TICKET_TYPE_SEQ")
	@Column(name="id")
	int id;
	@Column(name="nazwa")
	String name;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="CENNIK_ID", foreignKey = @ForeignKey(name = "TYP_BILETU_CENNIK_FK"))
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
