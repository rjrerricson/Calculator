document.getElementById('standardCalculator').style.display = 'block'
document.getElementById('romanianCalculator').style.display = 'none'

$(function() {
    $('#calculatorMode').change(function() {
        resetCalculator()
        if(!$(this).prop('checked')) {
            document.getElementById('standardCalculator').style.display = 'none'
            document.getElementById('romanianCalculator').style.display = 'block'
        }else {
            document.getElementById('standardCalculator').style.display = 'block'
            document.getElementById('romanianCalculator').style.display = 'none'
        }
    })
})

const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    updateDisplay()
    updateRomanDisplay()
    $("#operator").html('');
}

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}


function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function updateRomanDisplay() {
    const display = document.querySelector('.romanian-calculator-screen');
    display.value = calculator.displayValue;
}