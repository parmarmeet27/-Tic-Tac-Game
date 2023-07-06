const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//LEts create function to intialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",];
    newGameBtn.classList.remove("active");
    boxes.forEach((box, index)=> {
       box.innerText ="";
       boxes[index].style.pointerEvents = "all";
       //intiation boxes with css again
       box.classList = `box box${index+1}`
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}

initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

function checkGameover(){
   let answer = "";

   winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]] )
         && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
     if(gameGrid[position[0]] === "X")
     answer = "X";
     else 
     answer = "O";
            
     //disable pointer events 
     boxes.forEach((box) =>{
          box.style.pointerEvents = "none";
     }
     );

     // now we x/o is a winner box
     boxes[position[0]].classList.add("win");
     boxes[position[1]].classList.add("win");
     boxes[position[2]].classList.add("win");
        }
})
     
// it mean we have winner
  if(answer !== ""){
    gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
  } 

// when there is no winner we dont know about winner

let fillCount = 0;
gameGrid.forEach((box) => {
    if(box !== "")
    fillCount++;
});

if(fillCount === 9){
    gameInfo.innerText = "Game tied!";
    newGameBtn.classList.add("active");
}

};
function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameover();

    }
}

function swapTurn() {
    if(currentPlayer ==="X"){
        currentPlayer = "O";
    }

    else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}

newGameBtn.addEventListener('click',initGame);




