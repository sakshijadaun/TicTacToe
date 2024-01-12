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
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    
    //UI par empty karne ke liye
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
    })
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

//function of swap the turn of players
function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "0";
    }else{
        currentPlayer = "X";
    }

    //UI update 
    gameInfo.innerText = `current Player - ${currentPlayer}`;
}


//function of check that player is win 
function checkGameOver(){
    let answer = "";
    
    //winningPosition array Par check karna ki same x value h ya 0 (position contain all subarray inside winningPosition array)
    winningPositions.forEach((position) => {
        
        //all 3 boxes should be non-empty and exactly same in value either x or o
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
           
                //check if winner is x
                if(gameGrid[position[0]] === "X")
                    answer = "X";
                else
                    //winner is 0
                    answer = "0";

                //disable pointer event because winner found
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                }) 

                //now we know x/0 is a winner
                //so set green property to winning boxes
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
                
        }
            
    });

    //if we have  winner to answer non empty hoga
    if(answer !== ""){
        //winner ka name show kro x ya 0
        gameInfo.innerText = `Winner Player - ${answer}`;

        //new game button ko dikhao
        newGameBtn.classList.add("active");

        //and return if anyone winner no further calculate
        return;


    }
    
    //when there is tie
   
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
