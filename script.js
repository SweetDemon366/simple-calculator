const display = document.getElementById('display')
const mainText = document.getElementById('mainText');
const subText = document.getElementById('subText')
const buttons = document.querySelectorAll('.btn');

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

let inputArray = [];

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
                break;

            default: addDigit(value);
        }
    })
})

function clearDisplay() {
    inputArray.length = 0;
    isCompactDisplay = false;
    updateDisplay();
}

function backspace() {
}

function addDigit(digit) {
    inputArray.push(digit);
    updateDisplay()
}