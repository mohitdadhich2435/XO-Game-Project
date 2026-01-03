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

function playerTap(event) {
    const tappedImage = parseInt(event.currentTarget.id);
    if (!gameactive ||  gamestate[tappedImage] !== 2) return;
    if(activeplayer === 0){
        event.currentTarget.innerText = "X";
        event.currentTarget.classList.add("x");
    }
    else{
        event.currentTarget.innerText = "O";
        event.currentTarget.classList.add("o");
    }

    gamestate[tappedImage] = activeplayer;

    if(checkwin()){
        gameactive = false;
        document.getElementById("result").innerHTML = (`Player ${activeplayer === 0 ? "x" :"0"} wins`);
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