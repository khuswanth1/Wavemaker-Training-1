package repository.impl;

import java.util.*;

import models.Employee;
import repository.EmployeeRepository;
import exception.DuplicateEmployeeRecordException;
import exception.EmployeeNotFoundException;

public class InMemoryEmployeeRepositoryImpl implements EmployeeRepository{
    //Key = Emp ID value = Empobj
    private static Map<Integer,Employee> employeeMap = new HashMap<>(); 
    @Override
    public boolean addEmpId(Employee employee) {
        if(employeeMap.containsKey(employee.getEmpId())) throw new DuplicateEmployeeRecordException("With this id already Emp exists"+ employee.getEmpId());
        employeeMap.put(employee.getEmpId(),employee);
        return true;
    }

    @Override
    public boolean deleteEmp(int empId) {
        if(!employeeMap.containsKey(empId) )throw new EmployeeNotFoundException("Employee with Id not fount to delete "+empId);
        Employee deletedEmployee = employeeMap.remove(empId);
        return deletedEmployee!=null;
    }

    @Override
    public List<Employee> getAllEmp() {
        return new ArrayList<>(employeeMap.values());
    }

    @Override
    public Employee getEmpId(int id) {
        return employeeMap.get(id);
    }

    @Override
    public boolean updateEmp(Employee employee) {
        if(!employeeMap.containsKey(employee.getEmpId())) throw new EmployeeNotFoundException("Employee with Id not fount to delete "+employee.getEmpId());
        employeeMap.put(employee.getEmpId(),employee);
        return false;
    }

}
