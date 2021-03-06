var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;    //boolean to keep track whether the game started or not

var level = 0;

var userCanPlay = false;

function playSound(color){    
    switch(String(color)){
    case "green":
        var displaySound = new Audio("sounds/green.mp3").play();
        break;
    case "red":
        var displaySound = new Audio("sounds/red.mp3").play();
        break;
    case "yellow":
        var displaySound = new Audio("sounds/yellow.mp3").play();
        break;
    case "blue":
        var displaySound = new Audio("sounds/blue.mp3").play();
        break;
    default:
        break;
    }
}

function animatePress(color){

    $("#" + color).addClass("pressed");

    setTimeout(function(){
        $("#" + color).removeClass("pressed");
    }, 100);
}

function displayAllSequence(from,to,sequence)
{
     //recursive function to display all the sequence
    if(from < to) //from < sequence.length
    {

        $("#" + sequence[from]).fadeOut(100).fadeIn(100);
        playSound(sequence[from]);

        from++;
        setTimeout(function(){
            displayAllSequence(from,to,sequence);
        }, 600);
        
    }
    else{
        setTimeout(function(){
            userCanPlay = true;
        },100);
    }  
}

function nextSequence(){

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  
  displayAllSequence(0,gamePattern.length,gamePattern);

  level++;

  $("h1").text("Level " + level);
  
  $("#level").text (level);
}

function startOver(){

    level = 0;

    started = false;

    gamePattern = [];

    userClickedPattern = [];

    userCanPlay = false;
}

function checkAnswer(level){
    
    if(gamePattern[level] === (userClickedPattern[level])){
        
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                userClickedPattern = [];
                userCanPlay = false;   
                nextSequence();
            }, 1000);
        }
    } else {
        var gameoverSound = new Audio("sounds/wrong.mp3").play(); //game over effect
        
        $("body").addClass("game-over");    
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 400);
    
        $("h1").text("Game Over, Press Any Key to Restart");
    
        startOver();
    }
}

$("#green, #red, #yellow, #blue").click(function(){

console.log(userCanPlay);
    if(userCanPlay) {

        var userChosenColor = this.id;

        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
})

$(document).keypress(function(){

    if (!started){  //check whether game already started
        
        nextSequence();

        $("h1").text("Level " + level);
        started = true;
    } 
})
   
