package pl.kurs;

import java.io.StringReader;
import java.io.StringWriter;
import java.util.List;

import javax.xml.bind.JAXB;

public class KomisRemote implements Komis {

	String url = "http://localhost:8180/cinema/komis";

	@Override
	public void create(Car car) {
		StringWriter sw = new StringWriter();
		JAXB.marshal(car, sw);
		HttpHelper.doPost(url+"/create",sw.toString(),"application/xml");
	}

	@Override
	public Car find(int idc) {
		String txt = HttpHelper.doGet(url+"/find/"+idc);
		Car c = JAXB.unmarshal(new StringReader(txt), Car.class);
		return c;
	}


	@Override
	public List<Car> get() {
		String txt = HttpHelper.doGet(url+"/get");
		Cars cars = JAXB.unmarshal(new StringReader(txt), Cars.class);
		return cars.getCars();
	}

	@Override
	public void update(Car car) {
		StringWriter sw = new StringWriter();
		JAXB.marshal(car, sw);
		HttpHelper.doPost(url+"/update",sw.toString(),"application/xml");
	}

	@Override
	public void delete(int idc) {
		HttpHelper.doGet(url+"/delete/"+idc);
	}


}
