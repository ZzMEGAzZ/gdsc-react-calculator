import { useEffect, useState } from 'react';
import Button from '../components/Button';
import './App.css';

const CalculatorComponent = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [operator, setOperator] = useState('');
    const [previousInput, setPreviousInput] = useState('');

    const updateDisplay = () => {
        document.getElementById('display').value = currentInput;
    };

    const clearDisplay = () => {
        setCurrentInput('');
        setOperator('');
        setPreviousInput('');
        updateDisplay();
    };

    const appendNumber = (number) => {
        setCurrentInput(currentInput + number);
        updateDisplay();
    };

    const appendDecimal = () => {
        if (!currentInput.includes('.')) {
            setCurrentInput(currentInput + '.');
            updateDisplay();
        }
    };

    const setOperatorHandler = (op) => {
        if (currentInput !== '') {
            setOperator(op);
            setPreviousInput(currentInput);
            setCurrentInput('');
            updateDisplay();
        }
    };

    const calculate = () => {
        if (operator !== '' && currentInput !== '') {
            let result;
            const num1 = parseFloat(previousInput);
            const num2 = parseFloat(currentInput);

            switch (operator) {
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
                    if (num2 !== 0) {
                        result = num1 / num2;
                    } else {
                        alert('Cannot divide by zero!');
                        clearDisplay();
                        return;
                    }
                    break;
                default:
                    return;
            }

            setCurrentInput(result.toString());
            setOperator('');
            setPreviousInput('');
            updateDisplay();
        }
    };

    // Button labels and corresponding click handlers
    const buttonsData = [
      { label: 'C', onClick: clearDisplay },
      { label: '7', onClick: () => appendNumber('7') },
      { label: '8', onClick: () => appendNumber('8') },
      { label: '9', onClick: () => appendNumber('9') },
      { label: '/', onClick: () => setOperatorHandler('/') },
      { label: '4', onClick: () => appendNumber('4') },
      { label: '5', onClick: () => appendNumber('5') },
      { label: '6', onClick: () => appendNumber('6') },
      { label: '*', onClick: () => setOperatorHandler('*') },
      { label: '1', onClick: () => appendNumber('1') },
      { label: '2', onClick: () => appendNumber('2') },
      { label: '3', onClick: () => appendNumber('3') },
      { label: '-', onClick: () => setOperatorHandler('-') },
      { label: '0', onClick: () => appendNumber('0') },
      { label: '.', onClick: appendDecimal },
      { label: '=', onClick: calculate },
      { label: '+', onClick: () => setOperatorHandler('+') },
  ];

    useEffect(() => {
        updateDisplay();
    } , [updateDisplay]);

    return (
      <div className="calculator">
          <input type="text" id="display" readOnly />
          <div className="buttons">
              {buttonsData.map((button, index) => (
                  <Button key={index} label={button.label} onClick={button.onClick} />
              ))}
          </div>
      </div>
  );
};

export default CalculatorComponent;
