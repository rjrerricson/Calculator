
$( document ).ready(function() {

    const romanCalculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function updateRomanDisplay() {
        // select the element with class of `calculator-screen`
        const display = document.querySelector('.romanian-calculator-screen');
        // update the value of the element with the contents of `displayValue`
        display.value = romanCalculator.displayValue;
    }

    updateRomanDisplay();

    const romanianKeys = document.querySelector('.romanian-calculator-keys');
    romanianKeys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;
        if (!target.matches('button')) {
            return;
        }
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
                handleOperator(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                inputDigitRoman(value);
        }

        updateRomanDisplay();
    });

    function inputDigitRoman(digit) {
        const { displayValue, waitingForSecondOperand } = romanCalculator;

        if (waitingForSecondOperand === true) {
            romanCalculator.displayValue = digit;
            romanCalculator.waitingForSecondOperand = false;
        } else {
            romanCalculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (romanCalculator.waitingForSecondOperand === true) {
            romanCalculator.displayValue = '0.'
            romanCalculator.waitingForSecondOperand = false;
            return
        }

        if (!romanCalculator.displayValue.includes(dot)) {
            romanCalculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = romanCalculator
        const inputValue = displayValue;

        if (operator && romanCalculator.waitingForSecondOperand)  {
            romanCalculator.operator = nextOperator;
            return;
        }
        $("#romanOperator").html(nextOperator);

        if (firstOperand == null) {
            romanCalculator.firstOperand = inputValue;
        } else if (operator) {
            const result = convertNumberToRoman(calculate(firstOperand, inputValue, operator));

            romanCalculator.displayValue = result;
            romanCalculator.firstOperand = result;
        }

        romanCalculator.waitingForSecondOperand = true;
        romanCalculator.operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        const {firstValueResult, secondValueResult} = convertRomanToNumber(firstOperand, secondOperand)
        if (operator === '+') {
            return firstValueResult + secondValueResult;
        } else if (operator === '-') {
            return firstValueResult - secondValueResult;
        } else if (operator === '*') {
            return firstValueResult * secondValueResult;
        } else if (operator === '/') {
            return firstValueResult / secondValueResult;
        }

        return secondOperand;
    }

    function convertNumberToRoman(num) {
        if (!+num)
            return false;
        var	digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        let val =  Array(+digits.join("") + 1).join("M") + roman;
        console.log(val)
        return val
    }

    function convertRomanToNumber(firstOperand, secondOperand) {
        const firstValues  = firstOperand.split('');
        const secondValues  = secondOperand.split('');
        const firstValueResult = calculatedValue(firstValues);
        const secondValueResult = calculatedValue(secondValues);

        return {firstValueResult, secondValueResult}
    }

    function calculatedValue(values) {
        let result = 0;
        values.forEach((item, index) => {
            if(item === 'I') {
                result += 1
            }else if(item === 'V') {
                result += 5
            }else if(item === 'X') {
                result += 10
            }else if(item === 'L') {
                result += 50
            }else if(item === 'C') {
                result += 100
            }else if(item === 'D') {
                result += 500
            }else if(item === 'M') {
                result += 1000
            }
        })
        return result;
    }

    function resetCalculator() {
        romanCalculator.displayValue = '0';
        romanCalculator.firstOperand = null;
        romanCalculator.waitingForSecondOperand = false;
        romanCalculator.operator = null;
    }

});