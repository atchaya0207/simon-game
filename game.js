var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;
/*$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});*/
$("#start-btn").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $("#start-btn").hide(); // Optional: hide button after game starts
  }
});
 $(".btn").click(function(){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    });

function startOver(){
    level=0;
    gamePattern=[];
    started=true;
}
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      //var audio=new Audio("sounds/wrong.mp3");
      //audio.play();
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over");
      setTimeout(function(){
        $("body").removeClass("game-over");
        startOver();
        nextSequence(); 

      },200);
      
      /*startOver();*/

    }

}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level"+ level);

   var randomNumber=Math.floor(Math.random()*4);
   var randomChosenColor=buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);

   $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);

}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();  
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
  

}

