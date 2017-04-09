package pl.kurs;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.URL;
import java.net.URLConnection;

public class HttpHelper {


	public static String doPost(String url,String message,String contentType) {
		try{
			URLConnection connection = new URL(url).openConnection();
			connection.setDoOutput(true); // Triggers POST.
			String charset = "UTF-8";
			connection.setRequestProperty("Accept-Charset", charset);
			connection.setRequestProperty("Content-Type", contentType);
			OutputStream output = null;
			try {
				output = connection.getOutputStream();
				output.write(message.getBytes(charset));
			} finally {
				if (output != null) try { output.close(); } catch (IOException ex) {ex.printStackTrace();}
			}
			return getResponse(connection);
		}catch(Exception ex) {ex.printStackTrace();}
		return null;
	}

	public static String doGet(String url) {
		try{
			URLConnection connection = new URL(url).openConnection();
			String charset = "UTF-8";
			connection.setRequestProperty("Accept-Charset", charset);
			return getResponse(connection);
		}catch(Exception ex) {ex.printStackTrace();}
		return null; 
	}


	private static String getResponse(URLConnection connection) throws IOException{
		InputStream response = connection.getInputStream();
		final char[] buffer = new char[0x10000];
		StringBuilder out = new StringBuilder();
		Reader in = new InputStreamReader(response, "UTF-8");
		int read;
		do {
			read = in.read(buffer, 0, buffer.length);
			if (read>0) {
				out.append(buffer, 0, read);
			}
		} while (read>=0);

		return out.toString();
	}


}
