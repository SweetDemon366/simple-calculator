const display = document.getElementById('display')
const mainText = document.getElementById('mainText');
const subText = document.getElementById('subText')
const buttons = document.querySelectorAll('.btn');

const operators = ['+', '-', '÷', 'x']

let isCompactDisplay = false;

function updateDisplay() {
    if (isCompactDisplay) {
        display.classList.add('compact')
        mainText.textContent = inputArray.join('');
    } else {
        display.classList.remove('compact')
        mainText.textContent = inputArray.join('');
    }
}

let inputArray = [0];

updateDisplay()

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch (value) {
            case "C":
                clearDisplay();
                break;
            
            case "⌫":
                backspace();
                break;
            
            case "÷":
            case "x":
            case "-":
            case "+":
                addOperator(value);
                break;

            case "=":
                calculate();
                break;

            case ".":
                addDot();
                break;

            default: addDigit(value);
        }
    })
})

function clearDisplay() {
    inputArray.length = 0;
    inputArray.push(0)
    isCompactDisplay = false;
    updateDisplay();
}

function backspace() {
    if (inputArray.length == 1) {
        inputArray[0] = 0;
    } else {
        inputArray.splice(-1, 1)
    }
    updateDisplay();
}

function addOperator(operator) {
    const lastIndex = inputArray.findLastIndex(item => operators.includes(item));

    if (inputArray.length == (lastIndex + 1)) {
        inputArray.splice(-1, 1)
    }
        inputArray.push(operator);
        updateDisplay();
}

function addDigit(digit) {
    if (inputArray == '0') {
        inputArray.splice(0,1);
    }
    inputArray.push(digit);
    console.log(inputArray)
    updateDisplay()
}

function addDot() {
    const lastIndex = inputArray.findLastIndex(item => operators.includes(item));

    const number = inputArray.slice(lastIndex + 1);

    if (!number.includes('.')) {
        if (number.length = 0) {
            inputArray.push('0')
        }
        inputArray.push('.');
        updateDisplay();
    }
}

function divide (first, second) {
    return first / second;
}

function muiltiple (first, second) {
    return first * second;
}

function subtract (first, second) {
    return first - second;
}

function add (first, second) {
    return first + second;
}

