package exception;

public class DuplicateEmployeeRecordException extends RuntimeException{
    private String error ;
    public  DuplicateEmployeeRecordException(String error){
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
