package services;

import models.Address;

public interface AddressService {
     public boolean addAdress(Address address);
    public boolean updateAdress(Address address);
    public boolean deleteAdressByEmpId(int empId);
    public Address getAddressByEmpId(int empId);
}
