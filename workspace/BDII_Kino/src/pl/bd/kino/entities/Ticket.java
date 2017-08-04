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
@Table(name = "Bilet")
public class Ticket implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@SequenceGenerator(name="TICKET_SEQ", sequenceName="BILET_SEQ")
	@GeneratedValue(strategy=GenerationType.TABLE, generator="TICKET_SEQ")
	@Column(name="id")
	int id;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="miejsce_id", foreignKey = @ForeignKey(name = "BILET_MIEJSCE_FK"))
	Place place;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="seans_id", foreignKey = @ForeignKey(name = "BILET_SEANS_FK"))
	Show show;
	@ManyToOne(cascade=CascadeType.MERGE)
	@JoinColumn(name="typ_biletu_id", foreignKey = @ForeignKey(name = "BILET_TYP_BILETU_FK"))
	TicketType ticketType;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Place getPlace() {
		return place;
	}
	public void setPlace(Place place) {
		this.place = place;
	}
	public Show getShow() {
		return show;
	}
	public void setShow(Show show) {
		this.show = show;
	}
	public TicketType getTicketType() {
		return ticketType;
	}
	public void setTicketType(TicketType ticketType) {
		this.ticketType = ticketType;
	}
}
