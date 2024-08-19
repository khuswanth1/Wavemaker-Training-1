package services.impl;

import factory.AddressRepositoryFactory;
import models.Address;
import repository.AddressRepository;
import services.AddressService;

public class AddressServiceImpl implements AddressService{

    private static AddressRepository addressRepository;

    public AddressServiceImpl(int storageInput){
        addressRepository =  AddressRepositoryFactory.getAddressRepositoryInstance(storageInput);
    }
    @Override
    public boolean addAdress(Address address) {
        addressRepository.addAdress(address);
        return true;
    }

    @Override
    public boolean deleteAdressByEmpId(int empId) {
        addressRepository.deleteAdressByEmpId(empId);
        return true;
    }

    @Override
    public Address getAddressByEmpId(int empId) {
        return addressRepository.getAddressByEmpId(empId);
    }

    @Override
    public boolean updateAdress(Address address) {
        addressRepository.updateAdress(address);
        return true;
    }
    
}
