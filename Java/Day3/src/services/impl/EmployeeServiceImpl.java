package services.impl;

import java.util.*;

import factory.AddressRepositoryFactory;
import factory.EmployeeRepositoryFactory;
import models.Employee;
import repository.AddressRepository;
import repository.EmployeeRepository;
import services.EmployeeService;

public class EmployeeServiceImpl implements EmployeeService {

    private static EmployeeRepository employeeRepository;
    private static AddressRepository addressRepository;

    public EmployeeServiceImpl(int storageInput) {
        employeeRepository = EmployeeRepositoryFactory.getEmployeeRepositoryInstance(storageInput);
        addressRepository = AddressRepositoryFactory.getAddressRepositoryInstance(storageInput);
    }

    @Override
    public boolean addEmpId(Employee employee) {
        if (employee.getAddress() != null) {
            addressRepository.addAdress(employee.getAddress());
        }
        return employeeRepository.addEmpId(employee);

    }

    @Override
    public boolean deleteEmp(int empId) {
        if (addressRepository.getAddressByEmpId(empId) != null)
            addressRepository.deleteAdressByEmpId(empId);
        return employeeRepository.deleteEmp(empId);
    }

    @Override
    public List<Employee> getAllEmp() {
        List<Employee> employeeList = employeeRepository.getAllEmp();
        for (Employee employee : employeeList) {
            employee.setAddress(addressRepository.getAddressByEmpId(employee.getEmpId()));
        }
        return employeeList;
    }

    @Override
    public Employee getEmpId(int id) {
        Employee emp = employeeRepository.getEmpId(id);
        emp.setAddress(addressRepository.getAddressByEmpId(emp.getEmpId()));
        return emp;
    }

    @Override
    public boolean updateEmp(Employee employee) {
        employeeRepository.updateEmp(employee);
        if (employee.getAddress() != null) {
            addressRepository.updateAdress(employee.getAddress());
        }
        return true;
    }

}
