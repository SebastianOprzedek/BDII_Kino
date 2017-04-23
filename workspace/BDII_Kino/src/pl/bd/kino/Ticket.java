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
@Table(name = "Bilet")
public class Ticket implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue
	
	@Column(name="id")
	int id;
	@Column(name="miejsce_id")
	int place_id;
	@Column(name="seans_id")
	int show_id;
	@Column(name="typ_biletu_id")
	int ticket_type_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPlace_id() {
		return place_id;
	}
	public void setPlace_id(int place_id) {
		this.place_id = place_id;
	}
	public int getShow_id() {
		return show_id;
	}
	public void setShow_id(int show_id) {
		this.show_id = show_id;
	}
	public int getTicket_type_id() {
		return ticket_type_id;
	}
	public void setTicket_type_id(int ticket_type_id) {
		this.ticket_type_id = ticket_type_id;
	}
	
		
	
}
