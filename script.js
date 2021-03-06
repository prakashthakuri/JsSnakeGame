const grid = document.querySelector(".grid"); //QuerySelector vs getElementbyClassName and ID
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10; // its not gonna change
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerID= 0

function createGrid() {
  //create 100s of these elements cause we need 100s of divs for snake
  for (let i = 0; i < 100; i++) {
    //create elements
    const square = document.createElement("div");

    //add styling
    square.classList.add("square");

    //put elements into our grid
    grid.appendChild(square);
    //push it into neew squares array

    //create arrays of square

    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

//Start/ Restart Function

function startGame(){

    //restart game
    //make all the variables to its original value
    //remove the snake form the grid
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerID)
    currentSnake = [2,1,0]
    score=0

    //readd new score to the browser
    scoreDisplay.textContent = score // same as below from getting the score

    direction =1
    intervalTime = 1000
    generateApples()
    //re-add the class of sanke to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))

    timerID = setInterval(move, intervalTime)

    //start game value
     timerID = setInterval(move, intervalTime); // 1000 the value should be in decreasing manner to increase the speed of snake


}

function move() {


    if(
        (currentSnake[0] + width >= width*width  && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction ===1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <0 && direction === -width) ||// if the snake hit the top
        squares[currentSnake[0] + direction].classList.contains('snake') // if the snake hits itself
    )
    return clearInterval(timerID)


  //remove last elements from a currentSnake array
  const tail = currentSnake.pop();

  //remove styling from last element
  squares[tail].classList.remove("snake");

  //add square in direction we are heading
  const head = currentSnake.unshift(currentSnake[0] + direction);

  //add styling so we can see it


  //snake head getting the apple

  if(squares[currentSnake[0]].classList.contains('apple')) {
      //remove the apple

      squares[currentSnake[0]].classList.remove('apple') 

      //grow our snake by aadding class of snake to it
      squares[tail].classList.add('snake') // tail is added but its not joining the tail of our snake
      console.log(tail)

      //grow our sanke array
      currentSnake.push(tail)

      //generate new apple
      generateApples()

      //add one  to the score
      score++
      //display our score on browser
      scoreDisplay.textContent = score

      //speed up out snake
      clearInterval(timerID)
      intervalTime = intervalTime * speed // decreasing the value of intervalTime
      timerID = setInterval(move, intervalTime)

  }

  squares[currentSnake[0]].classList.add("snake");
}
// move()



//generating random apples for snake

function generateApples() {
    do{
        appleIndex =Math.floor( Math.random()  *squares.length)

        //generate random number
    }while(squares[appleIndex].classList.contains('snake')) // if this is true we generate random numbers in do
    squares[appleIndex].classList.add('apple')
}
generateApples()


// clearInterval(timerID)

//39 is right arrow
//38 is for up arrow
//37 is for left arrow
//40 is fordown arrow

function control(e) {
  if (e.keyCode == 68) {
    console.log("right pressed");
    direction = 1;
  } else if (e.keyCode == 87) {
    console.log("up pressed");
    direction = -width;
  } else if (e.keyCode == 65) {
    console.log("left arrow");
    direction = -1;
  } else if (e.keyCode == 83) {
    console.log("down arrow");
    direction = +width;
  }
}
document.addEventListener('keydown', control)

startButton.addEventListener('click', startGame)