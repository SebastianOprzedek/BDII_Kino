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
@Table(name = "Ceny")
public class Price implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="PRICE_SEQ", sequenceName="CENY_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="PRICE_SEQ")
	@Column(name="id")
	int id;
	@Column(name="cena")
	Double price;
	@Column(name="od")
	Date start_date;
	@Column(name="do")
	Date end_date;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
		
}