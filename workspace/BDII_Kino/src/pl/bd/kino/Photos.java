package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Photos {
	private List<Photo> photos = new ArrayList<Photo>();

	public Photos(List<Photo> photos) {
		super();
		this.photos = photos;
	}

	public Photos() {	}

	public List<Photo> getPhotos() {
		return photos;
	}

	public void setPhotos(List<Photo> photos) {
		this.photos = photos;
	}
	
	
}
