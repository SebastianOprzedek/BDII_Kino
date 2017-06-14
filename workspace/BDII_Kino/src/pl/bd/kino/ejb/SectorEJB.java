package pl.bd.kino.ejb;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.Query;
import pl.bd.kino.entities.Sector;

@Stateless
public class SectorEJB extends AbstractEJB<Sector> {
	
	public SectorEJB() {
		super(Sector.class);
	}
	
	@Override
	public List<Sector> get() {
		Query q = manager.createQuery("select p from Sector p");
		 return q.getResultList();
	}

	@Override
    public void update(int id, Sector _sector) {
		Sector sector = manager.find(Sector.class, id);
		sector.setName(_sector.getName());
		sector.setPricelist(_sector.getPricelist());
    }
}
