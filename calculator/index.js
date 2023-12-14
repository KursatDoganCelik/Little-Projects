//send length and name for add listener
let operatorBtnLength = document.querySelectorAll('.operator').length
let numberBtnLength = document.querySelectorAll('.number').length
clickListener('.operator', operatorBtnLength)
clickListener('.number', numberBtnLength)

//add listener for click
function clickListener(selectorName, length) {
  for (let index = 0; index < length; index++) {
    document.querySelectorAll(selectorName)[index].addEventListener('click', function () {
      console.log(this.className)
      if (this.className === 'number') {
        totalNumber(this.innerHTML)
      }
    })
  }
}

//add clicked number the last position
let printedScreen = ''
function totalNumber(clickedNumber) {
  let currentScreenValue = document.querySelector('.screen')
  printedScreen += clickedNumber
  currentScreenValue.innerHTML = printedScreen
}
