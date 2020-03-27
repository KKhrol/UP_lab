import java.io.IOException;
import java.io.PrintWriter;

public class StatusServlet extends javax.servlet.http.HttpServlet {


    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        PrintWriter pw = response.getWriter();

        pw.println("<html>");

        pw.println("<h1 style=\"color: red\">Application Is Running</h1>");

        pw.println("</html>");
    }
}
