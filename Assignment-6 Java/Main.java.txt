

import java.util.Random;
import java.util.Scanner;

class Calculator {
    public int add(int a,int b){
        return a+b;
    }
    public int sub(int a, int b){
        return a-b;
    }
    public int multiply(int a,int b){
        return a*b;
    }
    public int divide(int a,int b){
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
//        guessNumber();
        calculator();
        allPrimitiveDataTypes();
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
        System.out.println("Enter 1st Number: ");
        int input1 = sc.nextInt();
        System.out.println("Enter 2nd Number: ");
        int input2 = sc.nextInt();
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