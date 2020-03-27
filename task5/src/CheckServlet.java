import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import com.google.gson.*;

@WebServlet(name = "CheckServlet")

public class CheckServlet extends HttpServlet {
    class JsonResponse {
        public boolean success;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        JsonResponse r = new JsonResponse();
        r.success = true;

        Gson gson = new Gson();

        response.getWriter().print(gson.toJson(r));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html;charset=utf-8");

        PrintWriter pw = response.getWriter();
        pw.println("error");
    }
}
