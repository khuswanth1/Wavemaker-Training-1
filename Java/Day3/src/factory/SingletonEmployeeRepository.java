package factory;

import repository.EmployeeRepository;
import repository.impl.InFileEmployeeRepositoryImpl;
import repository.impl.InMemoryEmployeeRepositoryImpl;

public class SingletonEmployeeRepository {
    
    private static  EmployeeRepository inMemoryRepository = null;
    private static  EmployeeRepository inFileRepository = null;

    public static EmployeeRepository getInMemoryEmployeeRepositoryInstance() {
        if (inMemoryRepository == null) {
            synchronized (SingletonEmployeeRepository.class) {
                if (inMemoryRepository == null) {
                    inMemoryRepository = new InMemoryEmployeeRepositoryImpl();
                }
            }
        }
        return inMemoryRepository;
    }

    public static EmployeeRepository getInFileEmployeeRepositoryInstance(){
        if (inFileRepository == null) {
            synchronized (SingletonEmployeeRepository.class) {
                if (inFileRepository == null) {
                    inFileRepository = new InFileEmployeeRepositoryImpl();
                }
            }
        }
        return inFileRepository;
    }
}


// How many time also u called it will give single object 