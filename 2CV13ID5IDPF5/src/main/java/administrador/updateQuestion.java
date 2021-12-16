/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package administrador;

import com.escom.ipn.cv13id5idpf5.AdminXML;
import com.escom.ipn.cv13id5idpf5.HandlerPOST;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author DEZKS
 */
public class updateQuestion extends HttpServlet {
    private Map<String,String> Campos = null;
    private Map<String,FileItem> Archivos = null;
    private int maxFileSize = 50 * 1024 * 1024;
    private int maxMemSize = 4 * 1024;
    private File file = null;
    private DiskFileItemFactory factory = null;
    private ServletFileUpload upload = null;
    private AdminXML Admin = null;
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String Path = request.getServletContext().getRealPath("/");
        String Usuario = "admin";//pedir el usuario de la sesion del navegador
        String UserPath = Path + "Preguntas\\" + Usuario + "\\";
        String XMLpath = UserPath + "data\\preguntas.xml";
        AdminXML admin = new AdminXML(XMLpath);
        PrintWriter out = response.getWriter();
        if(ServletFileUpload.isMultipartContent(request)){
            factory = new DiskFileItemFactory();
            factory.setSizeThreshold(maxMemSize);
            factory.setRepository(new File(Path));
            upload = new ServletFileUpload(factory);
            upload.setFileSizeMax(maxFileSize);
            try {
                List<FileItem> parametros = upload.parseRequest(request);
                HandlerPOST clasificador = new HandlerPOST(parametros);
                clasificador.setUserPath(UserPath);
                clasificador.setUser(Usuario);
                String nombrePregunta = clasificador.buildMap().get("NombrePregunta")[0];
                admin.updateQuestion(nombrePregunta, UserPath+nombrePregunta, clasificador.buildMap());
                clasificador.saveFiles();
                
            } catch (FileUploadException ex) {
                System.err.println(ex.getMessage());
            }
            out.println("Multipart");
            response.sendRedirect("/2CV13ID5IDPF5/home");
        }else{
            Map<String, String[]> parametros = request.getParameterMap();
            String nombrePregunta = parametros.get("NombrePregunta")[0];
            admin.updateQuestion(nombrePregunta, UserPath+nombrePregunta, parametros);
            System.err.println(nombrePregunta);
            response.sendRedirect("/2CV13ID5IDPF5/home");
        }
        
        //Cambiar la linea de Abajo por un forward al terminar el desarrollo
        //response.sendRedirect("http://localhost:3000/2CV13ID5IDP3/");
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
