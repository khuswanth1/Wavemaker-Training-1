package controller;

import java.io.IOException;
import java.util.*;

import exception.DuplicateEmployeeRecordException;
import exception.EmployeeNotFoundException;
import models.Address;
import models.Employee;
import services.AddressService;
import services.EmployeeService;
import services.impl.AddressServiceImpl;
import services.impl.EmployeeServiceImpl;

public class EmployeeController {
    private static EmployeeService employeeService;
    private static AddressService addressService;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int storageInput=1;
        try{
            storageInput = fetchStorageInput(sc);
        }catch(IOException e){
            System.out.println("Please Enter the Corrct Input");
        }
        
        employeeService = new EmployeeServiceImpl(storageInput);
        addressService = new AddressServiceImpl(storageInput);
        boolean check = true;
        while (check) {
            System.out.println("1. Add Employee");
            System.out.println("2. Get Employee by ID");
            System.out.println("3. Get All Employee");
            System.out.println("4. Update Employee");
            System.out.println("5. Delete Employee");
            System.out.println("6. Update Employee Address");
            System.out.println("6. Exit");
            int menuList = sc.nextInt();
            switch (menuList) {
                case 1:
                    Employee employee = new Employee();
                    System.out.println("Enter employee Id");
                    employee.setEmpId(sc.nextInt());
                    System.out.println("Enter employee Name");
                    employee.setEmpName(sc.next());
                    System.out.println("If you like to enter address press 1");
                    if (sc.nextInt() == 1) {
                        employee.setAddress(new Address());
                        System.out.println("Enter location");
                        employee.getAddress().setLocation(sc.next());
                        System.out.println("Enter pincode");
                        employee.getAddress().setPin(sc.nextInt());
                    }
                    try{
                        employeeService.addEmpId(employee);
                    }catch(DuplicateEmployeeRecordException e){
                        System.out.println(e.getMessage());
                    }
                    break;
                case 2:
                    System.out.println("Enter employee Id");
                    int empId = sc.nextInt();
                    Employee currEmployeeGet = employeeService.getEmpId(empId);
                    System.out.println("Print in order");
                    System.out.println(currEmployeeGet.toString());
                    break;
                case 3:
                    System.out.println("Here are the all the employee details");
                    List<Employee> employeeList = employeeService.getAllEmp();
                    for (Employee i : employeeList) {
                        System.out.println("Print in order");
                        System.out.println(i.toString());
                    }
                    break;
                case 4:
                    System.out.println("Enter updated required employee id");
                    Employee currEmployeeUp = employeeService.getEmpId(sc.nextInt());
                    System.out.println("1. Update Id");
                    System.out.println("2. Update Name");
                    if (sc.nextInt() == 1) {
                        System.out.println("Enter updated Id");
                        currEmployeeUp.setEmpId(sc.nextInt());
                    } else {
                        System.out.println("Enter update Name");
                        currEmployeeUp.setEmpName(sc.next());
                    }
                    employeeService.updateEmp(currEmployeeUp);
                    break;
                case 5:
                    System.out.println("Enter delete required employee id");
                    try{
                        employeeService.deleteEmp(sc.nextInt());
                    }catch(EmployeeNotFoundException e){
                        System.out.println(e.getMessage());
                    }
                    break;
                case 6:
                    System.out.println("Enter employee ID for update Address");
                    int currEmpId = sc.nextInt();
                    System.out.println("Enter 1 for location update");
                    System.out.println("Enter 2 for pincode update");
                    if(sc.nextInt()==1){
                        Address currI = addressService.getAddressByEmpId(currEmpId);
                        currI.setLocation(sc.next());
                        addressService.updateAdress(currI);
                    }
                    else{
                        Address currE =addressService.getAddressByEmpId(currEmpId);
                        addressService.updateAdress(currE);
                    }
                default:
                    break;
            }
        }
    }
    private static int fetchStorageInput(Scanner sc) throws IOException {
        System.out.println("Where do you want to store");
        System.out.println("Enter 1 to store in File");
        System.out.println("Enter 2 to store in Memory");

        int storageInput = sc.nextInt();
        if(storageInput!=1 || storageInput!=2) throw new IOException("In Valid User Input");
        return storageInput;
    }
}
