//send length and name for add listener
let operatorBtnLength = document.querySelectorAll('.operator').length
let numberBtnLength = document.querySelectorAll('.number').length
clickListener('.operator', operatorBtnLength)
clickListener('.number', numberBtnLength)

//add listener for click
function clickListener(selectorName, length) {
  for (let index = 0; index < length; index++) {
    document.querySelectorAll(selectorName)[index].addEventListener('click', function () {
      if (selectorName === '.number') {
        numberClick(this.innerHTML)
      } else if (selectorName === '.operator') {
        operatorClick(this.innerHTML)
      }
    })
  }
}

//add number to last digit
function numberClick(number) {
  let mainScreen = document.querySelector('.main-screen')
  let mainScreenValue = document.querySelector('.main-screen').innerHTML

  //check multiple '.' usage
  if (!mainScreenValue.includes('.') || number !== '.') {
    if (mainScreenValue === '0' || mainScreenValue === '00') {
      mainScreen.innerHTML = number
    } else {
      mainScreen.innerHTML += number
    }
  }
}

//apply to incoming operator
let prevOperator
function operatorClick(operator) {
  let mainScreen = document.querySelector('.main-screen')
  let bufferScreen = document.querySelector('.buffer-screen')
  let mainScreenValue = document.querySelector('.main-screen').innerHTML
  let bufferScreenValue = document.querySelector('.buffer-screen').innerHTML
  let bufferValue = bufferScreenValue.slice(0, -2)

  //check if AC (All Clear) operators used
  if (operator === 'AC') {
    mainScreen.innerHTML = '0'
    bufferScreen.innerHTML = ''
  }
  //check if DEL (remove last) operators used
  else if (operator === 'DEL') {
    if (mainScreenValue.length === 1) {
      mainScreen.innerHTML = 0
    } else if (mainScreenValue.length > 1) {
      mainScreen.innerHTML = mainScreenValue.slice(0, -1)
    }
  }
  //check if CE (clear entry) operator used
  else if (operator === 'CE') {
    mainScreen.innerHTML = '0'
  }
  //check if '=' (equal) operators used
  else if (operator === '=') {
    if (bufferValue !== '' && mainScreenValue !== '') {
      let calculatedValue = mathCalculations(bufferValue, mainScreenValue, prevOperator)
      mainScreen.innerHTML = calculatedValue
      bufferScreen.innerHTML = ''
      prevOperator = ''
    }
  }
  //other operator must be math operators so we need check main and buffer screen empty or not
  else if (bufferValue !== '' && mainScreenValue !== '') {
    let calculatedValue = mathCalculations(bufferValue, mainScreenValue, prevOperator)
    bufferScreen.innerHTML = `${calculatedValue} ${operator}`
    mainScreen.innerHTML = ''
    prevOperator = operator
  } else if (bufferValue === '' && mainScreenValue !== '') {
    bufferScreen.innerHTML = `${mainScreenValue} ${operator}`
    mainScreen.innerHTML = ''
    prevOperator = operator
  } else if (bufferValue !== '' && mainScreenValue === '') {
    bufferScreen.innerHTML = `${bufferValue} ${operator}`
    prevOperator = operator
  }
}

//function for math operations
function mathCalculations(numberOne, numberTwo, operator) {
  numberOne = parseFloat(numberOne)
  numberTwo = parseFloat(numberTwo)
  switch (operator) {
    case '+':
      return Math.round((numberOne + numberTwo) * 100) / 100
    case '-':
      return Math.round((numberOne - numberTwo) * 100) / 100
    case '*':
      return Math.round(numberOne * numberTwo * 100) / 100
    case '/':
      return Math.round((numberOne / numberTwo) * 100) / 100
    case '%':
      return Math.round((numberOne % numberTwo) * 100) / 100
    default:
      console.log('Wrong Operator')
  }
}
