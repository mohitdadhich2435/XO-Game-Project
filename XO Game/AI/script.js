// 0 - x
// 1 - x
let activeplayer = 0;
var gameactive = true;
let gamestate = [2, 2, 2, 2, 2, 2, 2, 2, 2];
let winposition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

//add event istener

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", playerTap);
});

function aimove() {
  if(!gameactive) return;
  // let emptyCells = [];
  // AI can win
  for(let combo of winposition){
    let values = combo.map(i => gamestate[i]);
    if(values.filter(v => v === 1).length === 2 && values.includes(2)){
      let index = combo[values.indexOf(2)];
      placeAiMove(index);
      return;
    }
  }

  // player can not win

  for(let combo of winposition){
    let values = combo.map(i => gamestate[i]);
    if(values.filter(v =>v === 0 ).length === 2 && values.includes(2)){
      let index = combo[values.indexOf(2)];
      placeAiMove(index)
      return
    }
  }


  // for(let i = 0; i < gamestate.length; i++){
  //   if(gamestate[i] === 2){
  //     emptyCells.push(i);
  //   }
  // }

  // random move
  let emptyCells = gamestate.map((v,i)=> v===2 ? i :null).filter(v => v !== null);

  if(emptyCells.length === 0) return;
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  // document.getElementById(randomIndex).click();
  placeAiMove(randomIndex);
}

function placeAiMove(index){
  let btn = document.getElementById(index);
  btn.innerText = "O";
  btn.classList.add("O");
  gamestate[index] = 1;
  activeplayer = 0
}

function playerTap(event) {
  if(activeplayer === 1) return;
    const tappedImage = parseInt(event.currentTarget.id);
    if (!gameactive ||  gamestate[tappedImage] !== 2) return;
    if(activeplayer === 0){
        event.currentTarget.innerText = "X";
        event.currentTarget.classList.add("x");
    }
    gamestate[tappedImage] = activeplayer;

    if(checkwin()){
        gameactive = false;
        document.getElementById("result").innerHTML = (`User ${activeplayer === 0 ? "x" :"0"} wins`);
        setTimeout(resetGame,1500) ;
        return ;
    }
    if(!gamestate.includes(2)){
        gameactive = false;
        document.getElementById("result").innerHTML = "Draw";
        setTimeout(resetGame,1500) ;
        return ;
    }
    activeplayer = 1-activeplayer;
    if (activeplayer === 1) {
      setTimeout(aimove, 500);
      setTimeout(()=>{
        if(checkwin()){
          gameactive = false;
          document.getElementById("result").innerHTML = "Computer wins";
          setTimeout(resetGame, 1500);
          return;
        }
        if(!gamestate.includes(2)){
          gameactive = false;
          document.getElementById("result").innerHTML = "Draw";
          setTimeout(resetGame,1500);
          return;
        }
      },600)
    }
}   
function checkwin(){
    for(let pos of winposition){
        const[a,b,c] = pos;
        if(gamestate[a] !==2 && gamestate[a] === gamestate[b] && gamestate[b] === gamestate[c]){
            // gameactive = false;
            // document.getElementById("result").innerHTML =`player  ${gamestate[a] ===0 ? 'X': '0'} win `;
            // return true;
            return true;
        }
    }
    return false;
}
function resetGame() {
    for(let i = 0 ; i < gamestate.length; i++){
        gamestate[i] = 2;
    }
    document.querySelectorAll(".btn").forEach(btn => {
        // const img = btn.querySelector('img');
        // img.backgroundcolor = "white";
        // img.src = 'start.jpg';
        btn.innerText = "";
        btn.classList.remove("x", "o", "win")
    });
    activeplayer = 0;
    gameactive = true;
    document.getElementById("result").innerHTML = "";
    console.log("Game reset");
}