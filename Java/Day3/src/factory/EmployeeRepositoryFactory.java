package factory;

import java.util.HashMap;
import java.util.Map;

import exception.FileCreationException;
import repository.EmployeeRepository;

public class EmployeeRepositoryFactory {
    private static EmployeeRepository employeeRepository;
    private static final Map<Integer, EmployeeRepository> repositoryMap = new HashMap<>();

    public static EmployeeRepository getEmployeeRepositoryInstance(int storageType)
            throws FileCreationException{
        if (repositoryMap.containsKey(storageType)) {
            return repositoryMap.get(storageType);
        }
        if (storageType == 1 ) {
            employeeRepository = SingletonEmployeeRepository.getInFileEmployeeRepositoryInstance();
            repositoryMap.put(storageType, employeeRepository);
        } else if (storageType == 2) {
            employeeRepository = SingletonEmployeeRepository.getInMemoryEmployeeRepositoryInstance();
            repositoryMap.put(storageType, employeeRepository);
           
        }
        return repositoryMap.get(storageType);
    }
}
