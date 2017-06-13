package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Pricelist;

public class Pricelists {
	private List<Pricelist> pricelists = new ArrayList<Pricelist>();

	public Pricelists(List<Pricelist> pricelists) {
		super();
		this.pricelists = pricelists;
	}

	public Pricelists() {	}

	public List<Pricelist> getPricelists() {
		return pricelists;
	}

	public void setPricelists(List<Pricelist> pricelists) {
		this.pricelists = pricelists;
	}	
}
