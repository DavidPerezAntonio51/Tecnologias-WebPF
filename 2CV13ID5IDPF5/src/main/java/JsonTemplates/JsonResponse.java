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
public class JsonResponse {
    private Boolean success;
    private Object data;
    private String error;
    
    public JsonResponse(){
        
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public void setError(String error) {
        this.error = error;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

   

    public String getError() {
        return error;
    }

    public Boolean getSuccess() {
        return success;
    }
     
}
