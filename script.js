var displayValue = '5 + 5';
var lastPressed = '';
const operators = ['+', '-', '*', '/'];

function displayOperator(text) {
  const display = document.querySelector('.display');
  displayValue += ` ${text} `;
  display.textContent = displayValue;
}

function displayNumeral(text) {
  const display = document.querySelector('.display');
  displayValue += `${text}`;
  display.textContent = displayValue;
}

function resetDisplay(num) {
  const display = document.querySelector('.display');
  num ? displayValue = num : displayValue = '';
  display.textContent = displayValue;
}

function pressNumeral(e) {
  num = e.target.textContent;
  displayNumeral(num);
  lastPressed = num;
}

function pressEquals(e) {
  if (isValid(displayValue)) {
    displayValue = compute(displayValue);
    const display = document.querySelector('.display');
    display.textContent = displayValue;
    lastPressed = '=';
  }
}

function pressClear() {
  lastPressed = 'C';
  resetDisplay();
}

document.querySelector('.clear').addEventListener('click', pressClear)

function pressOperator(e) {
  const operator = e.target.textContent;
  const display = document.querySelector('.display');
  if (operators.includes(lastPressed)) {
    displayValue = displayValue.slice(0, -2) + operator + ' ';
    display.textContent = displayValue;
  } else {
    displayOperator(operator);
  }
  lastPressed = operator;
}

const equals = document.querySelector('.equals');
equals.addEventListener('click', e => pressEquals(e))

const numerals = document.querySelectorAll('.number');
Array.from(numerals).forEach(ele => {
  ele.addEventListener('click', e => pressNumeral(e));
})

const operatorDivs = document.querySelectorAll('.operator');
Array.from(operatorDivs).forEach(ele => {
  if (operators.includes(ele.textContent)) {
    ele.addEventListener('click', e => pressOperator(e));
  }
})

function computeOperator(arr, op) {
  opIndex = arr.findIndex(elem => elem === op);
  while (opIndex !== -1) {
    const newValue = operate(arr[opIndex], arr[opIndex-1], arr[opIndex+1]);
    arr.splice(opIndex-1, 3, newValue);
    opIndex = arr.findIndex(elem => elem === op);
  }
  return arr
}

function compute(str) {
  if (!isValid(str)) {
    return false
  }
  let arr = str.split(' ');
  // find PEMDAS operator
  arr = computeOperator(arr, '*');
  arr = computeOperator(arr, '/');
  arr = computeOperator(arr, '+');
  arr = computeOperator(arr, '-')
  return arr[0]
}
  // reduce list size with operation done

function isValid(str) {
  const arr = str.split(' ');
  const ops = arr.reduce((acc, cur) => {
    if (operators.includes(cur)) {return acc + 1} else {return acc}
  }, 0)
  const nums = arr.reduce((acc, cur) => {
    if (Number(cur) == cur) {return acc + 1} else {return acc}
  }, 0)
  if (nums === ops + 1) {return true} else {return false}
}

function roundToOne(num) {
  return Math.round(num*10) / 10
}
function add(a, b) {
  return roundToOne(Number(a) + Number(b))
}

function subtract(a, b) {
  return roundToOne(Number(a) - Number(b))
}

function multiply(a, b) {
  return roundToOne(Number(a) * Number(b))
}

function divide(a, b) {
  return roundToOne(Number(a) / Number(b))
}

function operate(operator, a, b) {
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
  }
return 'NO VALID OPERATOR'
}
