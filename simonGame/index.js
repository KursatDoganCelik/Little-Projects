let simonArray = ['red', 'green', 'blue', 'red']
let isStart = false

//user press any key start to game
document.addEventListener('keydown', function () {
  if (!isStart) {
    addListenerSimonBoxes()
    createColorAndPush()

    isStart = true
  }
})

//create new color and push simon array
function createColorAndPush() {
  let randomColorNumber = Math.floor(Math.random() * 4)
  let randomColor = convertNumberToColor(randomColorNumber)
  simonArray.push(randomColor)
  levelAnimate()
}

//add listener for boxes
function addListenerSimonBoxes() {
  for (let index = 0; index < 4; index++) {
    document.querySelectorAll('button')[index].addEventListener('click', function () {
      pressAnimate(index)
    })
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
  }
}

//press animation
function pressAnimate(index) {
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
      let buttonColor = document.querySelectorAll('button')[i].classList.value
      if (simonArray[index] === buttonColor) {
        setTimeout(() => {
          pressAnimate(i)
        }, 500 * index)
      }
    }
  }
}
