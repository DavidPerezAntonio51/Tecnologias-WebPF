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
public class Pregunta {
    //Atributos
    private String Nombre = null;
    private Integer ValorI = null;
    private Integer ValorD = null;
    private Integer Tamaño = null;
    private String Puntero = null;
    private String Radar = null;
    //Constructor
    public Pregunta(){
        
    }
    //Setters y Getters
    public String getNombre() {
        return Nombre;
    }

    public String getPuntero() {
        return Puntero;
    }

    public String getRadar() {
        return Radar;
    }

    public Integer getTamaño() {
        return Tamaño;
    }

    public Integer getValorD() {
        return ValorD;
    }

    public Integer getValorI() {
        return ValorI;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public void setPuntero(String Puntero) {
        this.Puntero = Puntero;
    }

    public void setRadar(String Radar) {
        this.Radar = Radar;
    }

    public void setTamaño(String Tamaño) {
        this.Tamaño = Integer.valueOf(Tamaño);
    }

    public void setValorD(String ValorD) {
        this.ValorD = Integer.valueOf(ValorD);
    }

    public void setValorI(String ValorI) {
        this.ValorI = Integer.valueOf(ValorI);
    }
    
}
