public class Employee {
    private int empId ;
    private String empName;
    public int getEmpId() {
        return empId;
    }
    Employee(int empId,String empName){
        setEmpId(empId);
        setEmpName(empName);
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
    @Override
    public boolean equals(Object obj) {
        return this.empName == ((Employee)obj).empName;
    }

}
