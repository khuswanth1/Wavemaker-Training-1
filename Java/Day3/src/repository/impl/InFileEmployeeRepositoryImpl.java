package repository.impl;

import java.util.List;

import models.Employee;
import repository.EmployeeRepository;

public class InFileEmployeeRepositoryImpl implements EmployeeRepository{

    @Override
    public boolean addEmpId(Employee employee) {
        
        return false;
    }

    @Override
    public boolean deleteEmp(int empId) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<Employee> getAllEmp() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Employee getEmpId(int id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean updateEmp(Employee employee) {
        // TODO Auto-generated method stub
        return false;
    }
    
}
