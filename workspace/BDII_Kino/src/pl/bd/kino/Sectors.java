package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Sectors {
	private List<Sector> sectors = new ArrayList<Sector>();

	public Sectors(List<Sector> sectors) {
		super();
		this.sectors = sectors;
	}

	public Sectors() {	}

	public List<Sector> getSectors() {
		return sectors;
	}

	public void setSectors(List<Sector> sectors) {
		this.sectors = sectors;
	}
	
	
}
