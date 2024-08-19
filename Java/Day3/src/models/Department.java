package models;

public class Department {
    private int depId;
    public int getDepId() {
        return depId;
    }
    public void setDepId(int depId) {
        this.depId = depId;
    }
    public String getDepName() {
        return depName;
    }
    public void setDepName(String depName) {
        this.depName = depName;
    }
    private String depName;
}
