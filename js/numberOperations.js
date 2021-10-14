
$( document ).ready(function() {
    document.getElementById('standardCalculator').style.display = 'block'
    document.getElementById('romanianCalculator').style.display = 'none'
    updateDisplay();

    const keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', event => {
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
            case '.':
                inputDecimal(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                // check if the key is an integer
                if (Number.isInteger(parseFloat(value))) {
                    inputDigit(value);
                }
        }

        updateDisplay();
    });

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) {
            calculator.displayValue = '0.'
            calculator.waitingForSecondOperand = false;
            return
        }

        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator } = calculator
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand)  {
            calculator.operator = nextOperator;
            return;
        }
        $("#operator").html(nextOperator);

        if (firstOperand == null && !isNaN(inputValue)) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

});