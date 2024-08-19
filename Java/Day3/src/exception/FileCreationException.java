package exception;

public class FileCreationException extends RuntimeException {
    private String errorMessage;

    public FileCreationException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;
    }
    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
