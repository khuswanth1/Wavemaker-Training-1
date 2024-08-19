package factory;

import java.util.HashMap;
import java.util.Map;

import exception.FileCreationException;
import repository.AddressRepository;

public class AddressRepositoryFactory {
    private static AddressRepository addressRepository;
    private static final Map<Integer, AddressRepository> repositoryMap = new HashMap<>();

    public static AddressRepository getAddressRepositoryInstance(int storageType)
            throws FileCreationException{
        if (repositoryMap.containsKey(storageType)) {
            return repositoryMap.get(storageType);
        }
        if (storageType == 1 ) {
            addressRepository = SingletonAddressRepository.getInFileAddressRepositoryInstance();
            repositoryMap.put(storageType, addressRepository);
        } else if (storageType == 2) {
            addressRepository = SingletonAddressRepository.getInMemoryAddressRepositoryInstance();
            repositoryMap.put(storageType, addressRepository);
           
        }
        return repositoryMap.get(storageType);
    }
}
