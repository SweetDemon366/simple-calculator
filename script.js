const display = document.getElementById('display')
const mainText = document.getElementById('mainText');
const subText = document.getElementById('subText')
const buttons = document.querySelectorAll('.btn');

const operators = {
    "+": (a, b) => a + b,
    "−": (a, b) => a - b,
    "×": (a, b) => a * b,
    "÷": (a, b) => a / b
}

let isCompactDisplay = false;
let isResultShown = false;

function updateDisplay() {
    if (isCompactDisplay) {
        display.classList.add('compact')
    } else {
        display.classList.remove('compact')
    }
    mainText.textContent = inputArray.join('');
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
            case "×":
            case "−":
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
    const lastIndex = inputArray.findLastIndex(item => Object.keys(operators).includes(item));
    isResultShown = false;

    if (inputArray.length == (lastIndex + 1)) {
        inputArray.splice(-1, 1)
    }
    inputArray.push(operator);
    updateDisplay();
}

function addDigit(digit) {
    if (inputArray == '0') {
        inputArray.splice(0,1);
    } else if (isResultShown) {
        inputArray = [];
        isResultShown = false;
        isCompactDisplay = false;
    }
    inputArray.push(digit);
    updateDisplay()
}

function addDot() {
    const lastIndex = inputArray.findLastIndex(item => Object.keys(operators).includes(item));
    const number = inputArray.slice(lastIndex + 1);

    if (!number.includes('.')) {
        if (number.length == 0) {
            inputArray.push('0')
        }
        isResultShown = false;
        inputArray.push('.');
        updateDisplay();
    }
}

function calculate () {
    isCompactDisplay = true;
    isResultShown = true;
    const arr = mergeDigits();
    subText.textContent = inputArray.join('');

    for (let i = 1; i < arr.length; i+= 2) {
        if (arr[i] == '×' || arr[i] == '÷') {
            let result = operators[arr[i]](
                arr[i-1],
                arr[i+1]
            );
            arr.splice(i - 1, 3, result);
            i -= 2
        };
    };
    let result = arr[0];

    for (let i = 1; i < arr.length; i += 2) {
        result = operators[arr[i]](
            result,
            arr[i + 1]
        );
    }
    inputArray = [round(result)];
    updateDisplay();
}

function mergeDigits() {
    const result = [];
    let current = '';

    for (let item of inputArray) {
        if (item in operators) {
            if (current) {
                result.push(Number(current));
                current = '';
            };
            result.push(item);
        } else {
            current += item;
        }
    }
    if (current) {
        result.push(Number(current));
    }
    return result;
}

function round (result) {
    let str = String(result);

    if (str.length <= 10) {
        return str;
    };
    return Number(result).toExponential(4);
}