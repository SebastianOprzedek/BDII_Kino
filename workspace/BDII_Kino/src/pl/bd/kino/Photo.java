package pl.bd.kino;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.sun.prism.Image;


@Entity
@XmlRootElement
@Table(name = "Zdjecia")
public class Photo implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue
	@Column(name="id")
	int idc;
	@Column(name="zdjecie")
	Image photo;
	@Column(name="film_id")
	int film_id;
	
	
	public int getIdc() {
		return idc;
	}
	public void setIdc(int idc) {
		this.idc = idc;
	}
	public Image getPhoto() {
		return photo;
	}
	public void setphoto(Image photo) {
		this.photo = photo;
	}
	public int getFilm_id() {
		return film_id;
	}
	public void setFilm_id(int film_id) {
		this.film_id = film_id;
	}
	
	
	
}
