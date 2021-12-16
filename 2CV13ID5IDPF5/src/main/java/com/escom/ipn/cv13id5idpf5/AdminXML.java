/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.escom.ipn.cv13id5idpf5;

import JsonTemplates.Pointer;
import JsonTemplates.Pregunta;
import JsonTemplates.Sound;
import JsonTemplates.Usuario;
import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FileUtils;
import org.jdom2.Element;
import org.jdom2.Document;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

/**
 *
 * @author DEZKS
 */
public class AdminXML {
    private Element Raiz = null;
    private Document oldDocXml = null;
    private Document newDocXml = null;
    private String RUTA = null;
    private File XmlFile = null;
    private FileOutputStream FOStream = null;
    private FileWriter fw = null;
    
    public AdminXML(String Ruta){
        XmlFile = new File(Ruta);
        if(XmlFile.exists()){
            try {
                SAXBuilder builder =  new SAXBuilder();
                oldDocXml = builder.build(XmlFile);
                Raiz = oldDocXml.detachRootElement();
            } catch (JDOMException ex) {
                throw new RuntimeException(ex.getMessage());
            } catch (IOException ex) {
                throw new RuntimeException(ex.getMessage());
            }
        }else{
            this.Raiz = new Element("preguntas");
            this.RUTA = Ruta;
        }
    }
    private void creaRuta(){
        XmlFile.getParentFile().mkdirs();
    }
    private void escribir(){
        this.newDocXml = new Document(Raiz);
        creaRuta();
        XMLOutputter outputter = new XMLOutputter();
        outputter.setFormat(Format.getPrettyFormat());
        //FOStream = new FileOutputStream(XmlFile);
        try{
            outputter.output(newDocXml, new FileOutputStream(XmlFile));
        }catch(IOException e){
            throw new RuntimeException(e.getMessage());
        }
    }
    public String getPointersToJson(){
        Collection Pointers = new ArrayList();
        Iterator<Element> Punteros = getChildrenIterator();
        while(Punteros.hasNext()){
            Element puntero = Punteros.next();
            Pointer pointer = new Pointer();
            pointer.setNombre(puntero.getAttributeValue("name"));
            pointer.setRuta(puntero.getAttributeValue("Ruta"));
            Pointers.add(pointer);
        }
        escribir();
        return new Gson().toJson(Pointers);
    }
    private Element addContent(Element pregunta, Map<String,String[]> data){
        Element relacion = new Element("relacion");
        Element tamaño = new Element("tamaño");
        Element puntero = new Element("puntero");
        Element radar = new Element("radar");
        pregunta.setAttribute("nombrePregunta", data.get("NombrePregunta")[0]);
        relacion.setAttribute("izquierda",data.get("ValorI")[0]);
        relacion.setAttribute("derecha",data.get("ValorD")[0]);
        tamaño.setText(data.get("Lienzo")[0]);
        puntero.setAttribute("ruta",data.get("Puntero")[0]);
        radar.setAttribute("ruta", data.get("Radar")[0]);
        pregunta.addContent(relacion);
        pregunta.addContent(tamaño);
        pregunta.addContent(puntero);
        pregunta.addContent(radar);
        return pregunta;
    }
    public void saveQuestion(Map<String,String[]> data){
        Element pregunta = new Element("pregunta");
        Raiz.addContent(this.addContent(pregunta, data));
        escribir();
    }
    private Element searchQuestion(String Pregunta){
        Iterator<Element> iterador = getChildrenIterator();
        while(iterador.hasNext()){
            Element pregunta = iterador.next();
            if(pregunta.getAttributeValue("nombrePregunta").equals(Pregunta)){
                return pregunta;
            }
        }
        return null;
    }
    public String getQuestionToJson(String Pregunta){
        Element pregunta = searchQuestion(Pregunta);
        Pregunta preguntaJson = new Pregunta();
        preguntaJson.setNombre(pregunta.getAttributeValue("nombrePregunta"));
        preguntaJson.setValorI(pregunta.getChild("relacion").getAttributeValue("izquierda"));
        preguntaJson.setValorD(pregunta.getChild("relacion").getAttributeValue("derecha"));
        preguntaJson.setTamaño(pregunta.getChild("tamaño").getText());
        preguntaJson.setPuntero(pregunta.getChild("puntero").getAttributeValue("ruta"));
        preguntaJson.setRadar(pregunta.getChild("radar").getAttributeValue("ruta"));
        return new Gson().toJson(preguntaJson);
    }
    private void deleteFiles(String RutaArchivos){
        try {
            FileUtils.deleteDirectory(new File(RutaArchivos));
        } catch (IOException ex) {
            System.err.println(ex.getMessage());
        }
    }
    public void deleteQuestion(String Pregunta,String Archivos){
        Element pregunta = searchQuestion(Pregunta);
        deleteFiles(Archivos);
        pregunta.detach();
        escribir();
    }
    public void updateQuestion(String Pregunta,String Archivos,Map<String,String[]> data){
        Element pregunta = searchQuestion(Pregunta);
        deleteFiles(Archivos);
        pregunta.removeContent();
        this.addContent(pregunta, data);
        escribir();
    }
    private Iterator<Element> getChildrenIterator(){
        return Raiz.getChildren().iterator();
    }
    public String getQuestionsToJson(){
        Collection Preguntas = new ArrayList();
        Iterator<Element> preguntas = getChildrenIterator();
        while(preguntas.hasNext()){
            Element Pregunta = preguntas.next();
            Pregunta pregunta = new Pregunta();
            pregunta.setNombre(Pregunta.getAttributeValue("nombrePregunta"));
            Preguntas.add(pregunta);
        }
        escribir();
        return new Gson().toJson(Preguntas);
    }
    
    public String getSoundsToJson() {
        Collection Sounds = new ArrayList();
        Iterator<Element> Sonidos = getChildrenIterator();
        while(Sonidos.hasNext()){
            Element Sonido = Sonidos.next();
            Sound sound = new Sound();
            sound.setNombre(Sonido.getAttributeValue("name"));
            sound.setRuta(Sonido.getAttributeValue("Ruta"));
            Sounds.add(sound);
        }
        escribir();
        return new Gson().toJson(Sounds);
    }
    public Boolean userEsist(Usuario user){
        Iterator<Element> usuarios = getChildrenIterator();
        while(usuarios.hasNext()){
            Element usuario = usuarios.next();
            if(user.getName().equals(usuario.getAttributeValue("name"))){
                return true;
            }
        }
        return false;
    }
    public Boolean loginUser(Usuario user){
        Iterator<Element> usuarios = getChildrenIterator();
        while(usuarios.hasNext()){
            Element usuario = usuarios.next();
            if(user.getName().equals(usuario.getAttributeValue("name")) && user.getPassword().equals(usuario.getAttributeValue("password"))){
                return true;
            }
        }
        return false;
    }
}
