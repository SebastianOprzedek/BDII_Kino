package pl.bd.kino;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@XmlRootElement
@Table(name = "Typ_biletu")
public class Ticket_type implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue
	@Column(name="id")
	int id;
	@Column(name="nazwa")
	String name;
	@Column(name="cennik_id")
	int pricelist_id;
	
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
	public int getPricelist_id() {
		return pricelist_id;
	}
	public void setPricelist_id(int pricelist_id) {
		this.pricelist_id = pricelist_id;
	}
	
	
	
	
	
	
}
