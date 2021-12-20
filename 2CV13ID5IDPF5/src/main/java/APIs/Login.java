/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package APIs;

import JsonTemplates.JsonResponse;
import JsonTemplates.Usuario;
import com.escom.ipn.cv13id5idpf5.AdminXML;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author DEZKS
 */
public class Login extends HttpServlet {
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
        //Se definen las cabeceras
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        //Se obtiene el writer
        PrintWriter out = response.getWriter();
        //El cuerpo de la Peticion se guarda en un objeto de tipo Ususario
        Usuario cliente = new Gson().fromJson(request.getReader(), Usuario.class);
        //Se crea una plantilla de respuesta
        JsonResponse res = new JsonResponse();
        //Se generan rutas escenciales
        String path = request.getServletContext().getRealPath("/");
        String XMLPath = path + "data\\Usuarios.xml";
        //Se instancia un objeto administrador de XML
        AdminXML admin = new AdminXML(XMLPath);
        //Se comprueba si el usuario existe en el archivo de usuarios
        if(admin.userExist(cliente)){
            /*Si el usuario Existe verifica que la contraseña sea correcta
            y se llena la plantilla de respuesta*/
            if(admin.loginUser(cliente)){
                res.setSuccess(Boolean.TRUE);
                cliente.setPassword("");
                res.setData(cliente);
            }else{
                res.setSuccess(Boolean.FALSE);
                res.setError("Contraseña Incorrecta");
            }
        }else{
            res.setSuccess(Boolean.FALSE);
            res.setError("Usuario no existente");
        }
        //Se envia la respuesta convertida en Json
        out.print(new Gson().toJson(res));
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
