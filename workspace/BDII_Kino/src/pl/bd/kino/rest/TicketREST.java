package pl.bd.kino.rest;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

import pl.bd.kino.ejb.TicketEJB;
import pl.bd.kino.lists.Tickets;
import pl.bd.kino.entities.Ticket;


@Path("/ticket")
@Consumes({ "application/json" })
@Produces({ "application/json" })

public class TicketREST {

	@EJB
	TicketEJB bean;

	@POST
	public byte[] createTicket(Ticket ticket) {
		bean.create(ticket);
		
	    String sourceFileName;
        String outputFile;
        sourceFileName = "C:/BDII_Kino/workspace/BDII_Kino/doc/test.jrxml";
        outputFile = "C:/BDII_Kino/workspace/BDII_Kino/doc/test.pdf";
      
        File pdfFile = new File(outputFile);
        byte[] blobToFrontend = null;

        Map parametersMap = new HashMap();
        parametersMap.put("ticket", ticket);
        blobToFrontend = createPdf(parametersMap, sourceFileName, pdfFile, ticket);

        return blobToFrontend;
	
	}
	
	@GET
	@Path("/{id}")
	public Ticket findTicket(@PathParam("id") int id) {
		Ticket ticket = bean.find(id);
		return ticket;
	}
	
	@GET
	public Tickets getTickets() {
		List<Ticket> lptickets = bean.get();
		Tickets tickets = new Tickets(lptickets);
		return tickets;
	}

	@PUT
	@Path("/{id}")
	public String updateTicket(@PathParam("id") int id, Ticket ticket) {
		try {
			bean.update(id, ticket);
			return "ticket added/updated!";
		} catch (Exception e) {
			e.printStackTrace();
			return "ticket not added/updated :(";
		}
	}
	
	@DELETE
	@Path("/{id}")
	public void deleteTicket(@PathParam("id") int id) {
		try {
			bean.delete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public byte[] createPdf(Map parametersMap, String sourceFileName, File pdfFile, Ticket ticket) {

        try {

            List<Ticket> ticketList = new ArrayList<Ticket>();
            ticketList.add(ticket);
            JRDataSource dataSource = new JRBeanCollectionDataSource(ticketList);
            JasperCompileManager.compileReportToFile(sourceFileName); 
            JasperReport jasperReport = JasperCompileManager.compileReport(sourceFileName);
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parametersMap, dataSource);
            JRPdfExporter exporter = new JRPdfExporter();
            exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
            exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(pdfFile));
            exporter.exportReport();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return this.createBlob(pdfFile);
    }

    private byte[] createBlob(File pdfFile){
        ByteArrayOutputStream blobResult = null;

        try {
            FileInputStream fis = new FileInputStream(pdfFile);
            byte[] buffer = new byte[1024];
            blobResult = new ByteArrayOutputStream();
            for (int len; (len = fis.read(buffer)) != -1;) {
                blobResult.write(buffer, 0, len);
            }
        } catch (FileNotFoundException e) {
            System.err.println(e.getMessage());
        } catch (IOException e2) {
            System.err.println(e2.getMessage());
        }
        return blobResult != null ? blobResult.toByteArray() : null;
    }
}
