
$( document ).ready(function() {

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
                inputDigit(value);
        }

        updateRomanDisplay();
    });


    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator
        const inputValue = displayValue;

        if (operator && calculator.waitingForSecondOperand)  {
            calculator.operator = nextOperator;
            return;
        }
        $("#operator").html(nextOperator);

        if (firstOperand == null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const {firstValueResult, secondValueResult} = convertRomanToNumber(firstOperand, inputValue)
            const result = convertNumberToRoman(calculate(firstValueResult, secondValueResult, operator));

            calculator.displayValue = result;
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
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

});