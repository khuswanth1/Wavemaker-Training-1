package factory;

import repository.AddressRepository;
import repository.impl.InFileAddressRepositoryImpl;
import repository.impl.InMemoryAddressEmployeeImpl;

public class SingletonAddressRepository {
    private static  AddressRepository inMemoryRepository = null;
    private static  AddressRepository inFileRepository = null;

    public static AddressRepository getInMemoryAddressRepositoryInstance() {
        if (inMemoryRepository == null) {
            synchronized (SingletonAddressRepository.class) {
                if (inMemoryRepository == null) {
                    inMemoryRepository = new InMemoryAddressEmployeeImpl();
                }
            }
        }
        return inMemoryRepository;
    }

    public static AddressRepository getInFileAddressRepositoryInstance(){
        if (inFileRepository == null) {
            synchronized (SingletonAddressRepository.class) {
                if (inFileRepository == null) {
                    inFileRepository = new InFileAddressRepositoryImpl();
                }
            }
        }
        return inFileRepository;
    }
}
