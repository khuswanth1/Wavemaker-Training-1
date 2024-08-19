package exception;

public class EmployeeNotFoundException extends RuntimeException{
    private String error ;
    public  EmployeeNotFoundException(String error){
        super(error);
        this.error = error;
    }
    public String getError() {
        return error;
    }
    public void setError(String error) {
        this.error = error;
    }
}
