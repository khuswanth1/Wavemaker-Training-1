package repository.impl;

import java.util.*;

import models.Address;
import repository.AddressRepository;

public class InMemoryAddressEmployeeImpl implements AddressRepository{
    
    private static Map<Integer,Address> addressMap = new HashMap<>();

    @Override
    public boolean addAdress(Address address) {
        if(!addressMap.containsKey(address.getEmpId())){
            addressMap.put(address.getEmpId(),address);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteAdressByEmpId(int empId) {
        if(addressMap.containsKey(empId)){
            addressMap.remove(empId);
            return true;
        }
        return false;
    }

    @Override
    public Address getAddressByEmpId(int empId) {
        return addressMap.get(empId);
    }

    @Override
    public boolean updateAdress(Address address) {
        if(addressMap.containsKey(address.getEmpId())){
            addressMap.put(address.getEmpId(),address);
            return true;
        }
        return true;
    }
    
}
