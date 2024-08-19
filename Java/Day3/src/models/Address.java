package models;

public class Address {
    private int empId; // Asuming it as FK
    private String location;
    private int pin;
    public String getLocation() {
        return location;
    }
    public int getEmpId() {
        return empId;
    }
    public void setEmpId(int empId) {
        this.empId = empId;
    }
    public void setLocation(String location) {
        this.location = location;
    }
    public int getPin() {
        return pin;
    }
    public void setPin(int pin) {
        this.pin = pin;
    }
}
