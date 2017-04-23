package pl.bd.kino;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Prices {
	private List<Price> prices = new ArrayList<Price>();

	public Prices(List<Price> prices) {
		super();
		this.prices = prices;
	}

	public Prices() {	}

	public List<Price> getPrices() {
		return prices;
	}

	public void setPrices(List<Price> prices) {
		this.prices = prices;
	}
	
	
}
