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
@Table(name = "Miejsce")
public class Place implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue
	@Column(name="id")
	int id;
	@Column(name="sektor_id")
	int sector_id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSector_id() {
		return sector_id;
	}
	public void setSector_id(int sector_id) {
		this.sector_id = sector_id;
	}
	
	
	
}
