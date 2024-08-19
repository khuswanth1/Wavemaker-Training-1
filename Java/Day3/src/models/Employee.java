package models;

public class Employee{
    private int empId;
    private String empName;
    // private Department department; 
    private Address address;
    
    public int getEmpId() {
        return empId;
    }
    public void setEmpId(int empId) {
        this.empId = empId;
    }
    public String getEmpName() {
        return empName;
    }
    public void setEmpName(String empName) {
        this.empName = empName;
    }
    // public Department getDepartment() {
    //     return department;
    // }
    // public void setDepartment(Department department) {
    //     this.department = department;
    // }
    public Address getAddress() {
        return address;
    }
    public void setAddress(Address address) {
        this.address = address;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + empId;
        return result;
    }
    @Override
    public String toString() {
        return "Employee [empId=" + empId + ", empName=" + empName + ", address=" + address + "]";
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Employee other = (Employee) obj;
        if (empId != other.empId)
            return false;
        return true;
    }
    
}
