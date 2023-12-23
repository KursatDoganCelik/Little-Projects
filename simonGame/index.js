let simonArray = []
let isStart = false
addListenerSimonBoxes()

//user press any key start to game
document.addEventListener('keydown', function () {
  if (!isStart) {
    createColorAndPush()
    levelChange(1)
    isStart = true
  }
})

//add listener for boxes
function addListenerSimonBoxes() {
  for (let index = 0; index < 4; index++) {
    document.querySelectorAll('button')[index].addEventListener('click', function () {
      if (simonArray.length !== 0) {
        let clickedColor = this.classList[0]
        pressAnimate(index)
        checkColor(clickedColor)
      }
    })
  }
}

//create new color and push simon array
function createColorAndPush() {
  let randomColorNumber = Math.floor(Math.random() * 4)
  let randomColor = convertNumberToColor(randomColorNumber)
  simonArray.push(randomColor)
  levelAnimate()
}

let counter = 0
function checkColor(color) {
  //true color pick
  if (color === simonArray[counter]) {
    counter++
    //pass the level
    if (counter === simonArray.length) {
      levelChange(counter + 1)
      setTimeout(() => {
        createColorAndPush()
      }, 500)
      counter = 0
    }
  }
  //wrong color pick
  else {
    simonArray = []
    counter = 0
    levelChange(counter)
    isStart = false
    playButton(4) //wrong sound
    gameOverBcg()
  }
}

//convert number to color
function convertNumberToColor(value) {
  switch (value) {
    case 0:
      return 'red'
    case 1:
      return 'green'
    case 2:
      return 'blue'
    case 3:
      return 'yellow'
    default:
      return 'wrong'
  }
}

//press animation
function pressAnimate(index) {
  playButton(index)
  let button = document.querySelectorAll('button')[index]
  button.classList.add('pressed')
  setTimeout(() => {
    button.classList.remove('pressed')
  }, 150)
}

//animate the simon array
function levelAnimate() {
  for (let index = 0; index < simonArray.length; index++) {
    for (let i = 0; i < 4; i++) {
      let buttonColor = document.querySelectorAll('button')[i].classList[0]
      if (simonArray[index] === buttonColor) {
        setTimeout(() => {
          pressAnimate(i)
        }, 400 * (index + 1))
      }
    }
  }
}

function levelChange(level) {
  let title = document.querySelector('h1')
  if (level !== 0) {
    title.textContent = 'Level ' + level
  } else {
    title.textContent = 'Game Over'
    setTimeout(() => {
      title.textContent = 'Press Any Key To Start'
    }, 750)
  }
}

function playButton(number) {
  let color = convertNumberToColor(number)
  let soundFile = `sounds/${color}.mp3`
  let sound = new Audio(soundFile)
  sound.play()
}

function gameOverBcg() {
  let bcg = document.querySelector('body')
  bcg.classList.add('wrong')
  setTimeout(() => {
    bcg.classList.remove('wrong')
  }, 350)
}
