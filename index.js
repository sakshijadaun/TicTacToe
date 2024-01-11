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

//function to initialize the game
function initGame(){
    currentPlayer = "x";
    gameGrid = ["","","","","","","","",""];
    
    //UI par empty karne ke liye
    boxes.forEach
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

//function of swap the turn of players
function swapTurn(){
    if(currentPlayer == "x"){
        currentPlayer = "0";
    }else{
        currentPlayer = "x";
    }

    //UI update 
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}


//function to mapping of values according to current user
function handleClick(index){

    //agar gameGrid array empty h tabhi processing hogi
    if(gameGrid[index] === ""){

        //ye line UI ke boxes m currentPlayer ko put kregi
        boxes[index].innerHTML = currentPlayer;

        //ye line gameGrid array main currentPlayer ko put kregi
        gameGrid[index] = currentPlayer;  

        //cursor pointer ko arrow kr do jha value already hai
        boxes[index].style.pointerEvents = "none";+
        
        //swap karo turn ko
        swapTurn();

        //check kro koi jeeta to nhi
        checkGameOver();
    }
}

//event listener on boxes 
boxes.forEach((box,index) => {    //forEach loop, and it automatically receives both the element and the index of the array elements.
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

//new game button call krega initGame ko jo sab kuch intially start krega
newGameBtn.addEventListener("click",initGame)
