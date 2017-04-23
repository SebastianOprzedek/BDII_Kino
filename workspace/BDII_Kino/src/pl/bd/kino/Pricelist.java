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
@Table(name = "Cennik")
public class Pricelist implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue
	@Column(name="id")
	int id;
	@Column(name="ceny_id")
	int price_id;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPrice_id() {
		return price_id;
	}
	public void setCeny_id(int price_id) {
		this.price_id = price_id;
	}
	
	
	
	
}
