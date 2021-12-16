/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.escom.ipn.cv13id5idpf5;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.fileupload.FileItem;

/**
 *
 * @author DEZKS
 */
public class HandlerPOST {

    private List<FileItem> Items;
    private String User;
    private Map<String, String[]> parametro;
    private Map<String, FileItem> Uploads;
    private String UserPath;

    public HandlerPOST(List<FileItem> Items) {
        this.Items = Items;
    }

    public void setUserPath(String UserPath) {
        this.UserPath = UserPath;
    }

    public void setUser(String User) {
        this.User = User;
    }

    public Map<String, String[]> buildMap() {
        parametro = new HashMap<>();
        Uploads = new HashMap<>();
        Iterator<FileItem> iterador = Items.iterator();
        while (iterador.hasNext()) {
            String[] valor = new String[1];
            FileItem File = iterador.next();
            if (File.isFormField()) {
                try {
                    valor[0] = File.getString("UTF-8");
                } catch (UnsupportedEncodingException ex) {
                    System.err.print(ex.getMessage());
                }
                parametro.putIfAbsent(File.getFieldName(), valor);
            } else {
                if (File.getFieldName().equals("Radar")) {
                    String id = parametro.get("NombrePregunta")[0];
                    valor[0] = "/2CV13ID5IDP3/Preguntas/" + User + "/" + id + "/" + File.getName();
                    parametro.putIfAbsent("Radar", valor);
                    Uploads.putIfAbsent("radar", File);
                } else if (File.getFieldName().equals("Puntero")) {
                    String id = parametro.get("NombrePregunta")[0];
                    valor[0] = "/2CV13ID5IDP3/Preguntas/" + User + "/" + id + "/" + File.getName();
                    parametro.putIfAbsent("Puntero", valor);
                    Uploads.putIfAbsent("puntero", File);
                }
            }
        }
        return parametro;
    }

    private void save(String tipo, String id) {
        try {
            FileItem Item = Uploads.get(tipo);
            File file = new File(UserPath + id + "\\" + Item.getName());
            file.getParentFile().mkdirs();
            Item.write(file);
        } catch (Exception ex) {
            System.err.print(ex.getMessage());
        }
    }

    public void saveFiles() {
        String id = this.parametro.get("NombrePregunta")[0];
        if (Uploads.containsKey("radar")) {
            save("radar", id);
        }
        if (Uploads.containsKey("puntero")) {
            save("puntero", id);
        }
    }
}
