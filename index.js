/* red blue green yellow*/
function playSingle(color){
    document.getElementById(color).classList.add("pressed");
    let audio = new Audio("./sounds/"+color+".mp3");
    audio.play();
    setTimeout(function() {
        document.getElementById(color).classList.remove("pressed");
    }, 200);
}
function disableBtns(){
    $("button").addClass("playing");
    $("button").prop("disabled", true);
}
function enableBtns(){
    $("button").removeClass("playing");
    $("button").prop("disabled", false);
}

function playSeq() {
    playing = true;
    disableBtns();
    let delayTime = Math.max(300, 1000-sequence.length*50);
    sequence.forEach((num, index) => {
        setTimeout(() => {
            switch (num) {
                case 0:
                    playSingle("red");
                    break;
                case 1:
                    playSingle("blue");
                    break;
                case 2:
                    playSingle("green");
                    break;
                case 3:
                    playSingle("yellow");
                    break;
            }
            if (index === sequence.length - 1) {
                setTimeout(enableBtns, delayTime);
                playing = false;
                getSeq();
            }
        }, index * delayTime); // Play each color with a delay of 1 second
    });
} 

function endGame(){
    endedGame = true;
    if(sequence.length > bestScore){
         $("h1").text("Best high score of: "+sequence.length+"! Well Done! Press 'n' for new game.");
        bestScore = sequence.length;
    }
    else{

        $("h1").text("your score is " + sequence.length + ".Best Score:"+bestScore+". Press 'n' for new game.");
    }
    document.addEventListener("keydown", function(event){
        if(event.key == "n"){
            $("h1").text("Press any key to start");
            sequence = [];
            endedGame = false;
            started = true;
            newColor();
        }
    }, {once:true});
    

}
function newColor(){
    if(!endedGame && !playing){ // game hasnt ended but sequence didnt start
        let newNum = Math.floor(Math.random()*4);
        sequence.push(newNum);
        $("h1").text("Level "+ sequence.length);
        playSeq();
        alert(seq);
        getSeq();
    }
}
function getSeq(){
    if(playing || endedGame) return;
    let colors = {"red": 0, "blue": 1, "green": 2, "yellow": 3};
    let counter = 0;
    $("button").off("click").on("click", function(){
        let color = $(this).attr("id");
        playSingle(color);
        if(colors[color] !== sequence[counter]){
            endGame();
            return false;
        }
        counter++;
        if(counter === sequence.length) setTimeout(newColor, 1000);
    });
}
function startGameOnKeyPress(){
    if(!started){
        started = true;
        newColor();
        $(document).off("keypress",startGameOnKeyPress);

    }
}
var sequence = [];
var playing = false; // true meaning the new sequence is being played
var endedGame = false; 
var started = false;  // true meaning game started
var bestScore = 0;
$(document).on("keypress",startGameOnKeyPress);
