package pl.bd.kino.lists;

import java.util.ArrayList;
import java.util.List;
import pl.bd.kino.entities.Price;

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
