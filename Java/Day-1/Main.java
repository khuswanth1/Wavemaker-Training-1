

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

class Calculator {
    public Integer add(Integer a,Integer b){
        return a+b;
    }
    public Integer sub(Integer a, Integer b){
        return a-b;
    }
    public Integer multiply(Integer a,Integer b){
        return a*b;
    }
    public Integer divide(Integer a,Integer b){
        return a/b;
    }
}

class GuessNumber {
    Random r = new Random();
    int low = 10;
    int high = 100;
    public int result = r.nextInt(high-low) + low;
}
public class Main {
    public static void main(String[] args) {
        // Employee e1 = new Employee(1,"Mahesh");
        // Employee e2 = new Employee(2,"Chakri");
        
        // ArrayList<Employee> al = new ArrayList<>();
        // al.add(e1);
        // al.add(e2);

        HashMap<Integer,String> hm = new HashMap<>();
        hm.put(1,"e1");
        hm.put(2,"e2");
        System.out.println(hm.size());
        // guessNumber();
        // calculator();
        // allPrimitiveDataTypes();
    }
    public static void allPrimitiveDataTypes(){
        byte b=10;
        int id=1;
        long number=4793492343432342334L;
        boolean isTrue=true;
        double salary=45000.25;
        float val= 4.5F;
        char ch='A';
        System.out.println("byte value:"+b);
        System.out.println("int value:"+id);
        System.out.println("number value:"+number);
        System.out.println("boolean value:"+isTrue);
        System.out.println("double value:"+salary);
        System.out.println("float value:"+val);
        System.out.println("char value:"+ch);
    }
    public static void calculator(){
        Scanner sc = new Scanner(System.in);
        try{

            System.out.println("Enter 1st Number: ");
            Integer input1 = sc.nextInt();
            if(input1==0) throw new ManualExc("Enter The Valid Number");
            System.out.println("Enter 2nd Number: ");
            Integer input2 = sc.nextInt();
            if(input2==0) throw new ManualExc("Enter The Valid Number");
            Calculator obj = new Calculator();
            System.out.println("What operation you want to perform ");
            System.out.println("Enter 1 for Add");
            System.out.println("Enter 2 for Sub");
            System.out.println("Enter 3 for Mul");
            System.out.println("Enter 4 for Div");
            int operation = sc.nextInt();
            switch (operation){
                case 1:
                System.out.println("Sum : "+obj.add(input1,input2));
                break;
                case 2:
                System.out.println("Diff : "+obj.sub(input1,input2));
                break;
                case 3:
                System.out.println("Multiply : "+obj.multiply(input1,input2));
                break;
                case 4:
                System.out.println("Divide : "+obj.divide(input1,input2));
                break;
            }
        }
        catch(Exception e){
            System.out.println(e);
        }
            
        }
    public static void guessNumber(){
        Scanner sc = new Scanner(System.in);
        GuessNumber obj = new GuessNumber();
        int randomNumber = obj.result;
        boolean check = true;
        while(check){
            int currNum = sc.nextInt();
            if(currNum == randomNumber){
                check = false;
                System.out.println("Your Guess Is correct");
                break;
            }
            if(Math.abs(randomNumber-currNum)<10){
                if(randomNumber-currNum>0){
                    System.out.println("Your are low but too close");
                }
                else {
                    System.out.println("Your are high but too close");
                }
            }
            else{
                if(randomNumber-currNum>0){
                    System.out.println("Your are low but too far");
                }
                else {
                    System.out.println("Your are high but too far");
                }
            }
        }
    }
}