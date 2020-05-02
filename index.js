var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level=0;
var f=0;


// key is pressed on keyboard to start he game

$(document).keydown(function()
{
  if (f==0) {

  $("h1").html("Level "+level);
  nextSequence();
  f=1;
}
});

// creating random variable and computer selcet a color at random to start the game


function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").html("Level "+level);

  var r = Math.random();
  r = r * 4;
  r = Math.floor(r);

  var randomChosenColour = buttonColours[r];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// user select button

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// giving animation to button clicked by the user


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// giving sound to button clicked


function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    }
    else {

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over")

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      $("h1").html("Game Over, Press Any Key to Restart");

      startOver();

    }

}

function startOver()
{
  f=0;
  gamePattern = [];
  level=0;
}
