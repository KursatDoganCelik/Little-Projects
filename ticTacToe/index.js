let symbolArray = ['', '', '', '', '', '', '', '', '']
let currentTurnX = true
let isWin = false

document.addEventListener('DOMContentLoaded', function () {
  //firstly show who's turn
  let turnX = document.querySelector('.turn-x')
  turnX.classList.add('turn-reverse')
  // add listener for boxes
  document.querySelector('.symbol-box').addEventListener('click', function (e) {
    let clickedButton = e.target
    let clickedButtonSymbol = e.target.textContent

    if (clickedButtonSymbol === '' && !isWin) {
      // X turn
      if (currentTurnX) {
        clickedButton.textContent = 'X'
        currentTurnX = false
        changeTurns()
      } // O turn
      else {
        clickedButton.textContent = 'O'
        currentTurnX = true
        changeTurns()
      }
      addSymbolArray()
    }
  })
})

function changeTurns() {
  let turnX = document.querySelector('.turn-x')
  let turnO = document.querySelector('.turn-o')
  turnO.classList.toggle('turn-reverse')
  turnX.classList.toggle('turn-reverse')
}

function addSymbolArray() {
  let isFull = true
  for (let index = 0; index < 9; index++) {
    symbolArray[index] = document.querySelectorAll('button')[index].textContent
    //check all buttons is full
    if (symbolArray[index] === '') {
      isFull = false
    }
  }
  checkWin()
  //essentially is draw
  if (isFull && !isWin) {
    draw()
  }
}

function checkWin() {
  plusOneSequence()
  plusTwoSequence()
  plusThreeSequence()
  plusFourSequence()
}

// Win calculations start
function plusOneSequence() {
  for (let i = 0; i < 9; i += 3) {
    if (symbolArray[i] === symbolArray[i + 1] && symbolArray[i + 1] !== '') {
      if (symbolArray[i + 1] === symbolArray[i + 2]) {
        addWinLine(i / 3, symbolArray[i])
      }
    }
  }
}
function plusTwoSequence() {
  if (symbolArray[2] === symbolArray[4] && symbolArray[4] !== '') {
    if (symbolArray[4] === symbolArray[6]) {
      addWinLine(7, symbolArray[2])
    }
  }
}
function plusThreeSequence() {
  for (let i = 0; i < 3; i++) {
    if (symbolArray[i] === symbolArray[i + 3] && symbolArray[i + 3] !== '') {
      if (symbolArray[i + 3] === symbolArray[i + 6]) {
        addWinLine(i + 3, symbolArray[i])
      }
    }
  }
}
function plusFourSequence() {
  if (symbolArray[0] === symbolArray[4] && symbolArray[4] !== '') {
    if (symbolArray[4] === symbolArray[8]) {
      addWinLine(6, symbolArray[0])
    }
  }
}
// Win calculations end

function addWinLine(key, winner) {
  isWin = true // We have winner!

  let turnX = document.querySelector('.turn-x')
  let turnO = document.querySelector('.turn-o')
  let lineElement = document.querySelector('.symbol-box').lastElementChild
  //add line according to case
  switch (key) {
    case 0:
      lineElement.classList.add('line-horizontal-first')
      break
    case 1:
      lineElement.classList.add('line-horizontal-second')
      break
    case 2:
      lineElement.classList.add('line-horizontal-third')
      break
    case 3:
      lineElement.classList.add('line-vertical-first')
      break
    case 4:
      lineElement.classList.add('line-vertical-second')
      break
    case 5:
      lineElement.classList.add('line-vertical-third')
      break
    case 6:
      lineElement.classList.add('line-cross-positive')
      break
    case 7:
      lineElement.classList.add('line-cross-negative')
      break
    default:
  }
  if (winner === 'X') {
    turnX.textContent = 'X Wins'
    turnO.textContent = 'Again?'
  } else if (winner === 'O') {
    turnO.textContent = 'O Wins'
    turnX.textContent = 'Again?'
  }
  listenAgainAndDefault()
}

function draw() {
  isWin = true // Just a draw :c

  let turnX = document.querySelector('.turn-x')
  let turnO = document.querySelector('.turn-o')

  turnX.textContent = 'Draw'
  turnO.textContent = 'Again?'
  listenAgainAndDefault()
}

function listenAgainAndDefault() {
  let turnX = document.querySelector('.turn-x')
  let turnO = document.querySelector('.turn-o')
  let lineElement = document.querySelector('.symbol-box').lastElementChild
  removeHover()

  let turnBox = document.querySelector('.turn-box')
  turnBox.addEventListener('click', function (e) {
    let isAgain = e.target.textContent
    //all goes default if clicked
    if (isAgain === 'Again?') {
      symbolArray = ['', '', '', '', '', '', '', '', '']
      currentTurnX = true
      isWin = false
      lineElement.classList = ''

      turnX.classList.remove('turn-reverse')
      turnX.classList.add('turn-reverse')
      turnO.classList.remove('turn-reverse')

      turnX.textContent = "X's Turn"
      turnO.textContent = "O's Turn"

      addHover()
      //empty the boxes
      for (let index = 0; index < 9; index++) {
        document.querySelectorAll('button')[index].textContent = ''
      }
    }
  })
}

function removeHover() {
  for (let index = 0; index < 9; index++) {
    document.querySelectorAll('button')[index].classList.add('reverse-btn-hover')
  }
}

function addHover() {
  for (let index = 0; index < 9; index++) {
    document.querySelectorAll('button')[index].classList.remove('reverse-btn-hover')
  }
}
