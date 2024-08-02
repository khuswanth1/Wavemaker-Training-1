let display = document.getElementById('shw');
let currentValue = '';
let currentOperator = '';
let storedValue = '';
let result;
let memstr;
function memoryDec(){
    currentValue= result;
    setOperator('-');
    updateDisplay();
    
}
function memoryInc(){
    memstr=result;
    setOperator('+');
    updateDisplay();
}
function memoryClear(){
    memstr=0;
    clearDisplay();
    updateDisplay();
}
function memoryRecal(){
    currentValue = ''+memstr;
    updateDisplay();
}
function memoryStore(){
    if(result==null){
        memstr = currentValue;
    }
    else{
        memstr = result;
        clearDisplay();
    }
    updateDisplay();
}
function appendNumber(number) {
    currentValue += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}
function clearDisplay() {
    currentValue = '';
    storedValue = '';
    currentOperator = '';
    updateDisplay();
}
function clearEntry() {
    currentValue = '';
    updateDisplay();
}
function backspace() {
    currentValue = currentValue.slice(0, -1);
    updateDisplay();
}
function setOperator(operator) {
    if (currentValue !== '') {
        calculateResult();
        storedValue = currentValue;
        currentOperator = operator;
        currentValue = '';
        updateDisplay();
    }
}
function calculateResult() {
    if (storedValue !== '' && currentValue !== '' && currentOperator !== '') {
        let num1 = parseFloat(storedValue);
        let num2 = parseFloat(currentValue);
        switch (currentOperator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }
        currentValue = ''+result;
        currentOperator = '';
        storedValue = '';
        updateDisplay();
    }
}
function calculateSqrt() {
    if (currentValue !== '') {
        currentValue = Math.sqrt(parseFloat(currentValue)).toString();
        updateDisplay();
    }
}

function calculateReciprocal() {
    if (currentValue !== '') {
        currentValue = (1 / parseFloat(currentValue)).toString();
        updateDisplay();
    }
}

function calculatePercentage() {
    if (currentValue !== '') {
        currentValue = (parseFloat(currentValue) / 100).toString();
        updateDisplay();
    }
}

function updateDisplay() {
    if(storedValue!== ''){
        display.value = storedValue+ currentOperator+ currentValue;
    }
    else{
        display.value= currentValue;
    }
}