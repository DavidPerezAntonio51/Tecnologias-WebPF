/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JsonTemplates;

/**
 *
 * @author DEZKS
 */
public class Sound {
    private String Nombre  = null;
    private String Ruta = null;
    
    public Sound(){
        
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public void setRuta(String Ruta) {
        this.Ruta = Ruta;
    }

    public String getNombre() {
        return Nombre;
    }

    public String getRuta() {
        return Ruta;
    }
    
}
