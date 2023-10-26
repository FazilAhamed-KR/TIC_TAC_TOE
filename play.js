const boxs = document.querySelectorAll('.box')
const play = document.querySelector('#player')
const button = document.getElementById('restart')
let x =  "X"
let o = "O"

const win =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let game = ["","","","","","","","",""]
let currentplayer = x;
let player = "X";
let running = false;
init()

function init() {
    boxs.forEach(box => box.addEventListener("click",boxClick))
    button.addEventListener("click", btnRestart);
    play.textContent = `${player} Your Turn`;
    running=true;
}

function boxClick() {
    const index = this.dataset.index;
    if (game[index]!="" || !running) {
        return;
    }
    updatebox(this,index);
    checkwinner();
}

function updatebox(box,index) {
    game[index]=player
    box.innerHTML = currentplayer;
}

function changeplayer() {
    player = (player == 'X') ? "O" : "X";
    currentplayer=(currentplayer == x) ? o : x;
    play.textContent = `${player} your turn`;
}

function checkwinner() {
    let isWon = false; 
    for(let i=0; i<win.length;i++){
        const condition = win[i];
        const box1 = game[condition[0]];
        const box2 = game[condition[1]];
        const box3 = game[condition[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue;
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true
        }
    }
    if(isWon){
        play.textContent=`${player}is Won play a new game `; 
        running = false
    }else if(!game.includes("")){
        play.textContent = `Game Draw..!,play again`;
        running = false;
    }else{
        changeplayer()
    }
}

function btnRestart() {
  game = ["","","","","","","","",""]
  currentplayer = x;
  player = "X";
  running = true;
  play.textContent = `${player} Your Turn`

  boxs.forEach(box => {
    box.innerHTML = "";
    box.classList.remove()
  })
}

