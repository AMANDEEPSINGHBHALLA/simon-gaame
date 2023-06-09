var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var x = 0;
var level = 0;
var score = 0;
var highestScore = 0;

$(document).keypress(function() {
    if (x == 0) {
        $("#level-title").text("Level " + level);
        $(".score").removeClass("score-hide");
        $(".score").text("Score 0");
        nextSequence();
        x++;
    }
})

document.addEventListener("touchstart", function() {
      if (x == 0) {
        $("#level-title").text("Level " + level);
        $(".score").removeClass("score-hide");
        $(".score").text("Score 0");
        nextSequence();
        x++;
      }
})

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(()=>{
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            score = score + 10;
            $(".score").text("Score " + score);
            setTimeout(()=> {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(()=> {
            $("body").removeClass("game-over");
        }, 200);
        if (score > highestScore) {
            highestScore = score;
            $(".highest-score").text("Highest Score " + highestScore);
        }
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver();
    }

}

function startOver() {
    score = 0;
    level = 0;
    gamePattern = [];
    x = 0;
};



