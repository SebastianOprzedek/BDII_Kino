package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Photo;

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
