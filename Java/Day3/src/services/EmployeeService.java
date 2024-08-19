package services;

import java.util.*;
import models.Employee;

public interface EmployeeService {

    public Employee getEmpId(int id);
    public boolean addEmpId(Employee employee);
    public List<Employee> getAllEmp();
    public boolean updateEmp(Employee employee);
    public boolean deleteEmp(int empId);

}
