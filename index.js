var level = 1;
var buttons = ["red", "green", "blue", "yellow"];
var buttonsToBeClicked = [];
var currIndex = 0;
startGame();

function startGame() {
  $("body").on("keypress", function () {
    $("body").off("keypress");
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      addNewButtonToSequence();
      clickEvents();
    }, 500);
  });
}

function addNewButtonToSequence() {
  currIndex = 0;
  var randomButtonIndex = Math.floor(Math.random() * buttons.length);
  var newColor = buttons[randomButtonIndex];
  buttonsToBeClicked.push(newColor);
  var newSelectedButton = $(`.${newColor}`);
  var audio = new Audio("sounds/" + newColor + ".mp3");
  audio.play();
  newSelectedButton.fadeOut(100).fadeIn(100);
}

function increaseLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

function reset() {
  $("#level-title").text("Game Over. Press A Key to Start again");
  $(".btn").off("click");
  level = 1;
  currIndex = 0;
  buttonsToBeClicked = [];
  startGame();
}

function clickEvents() {
  $(".btn").click(function (event) {
    var clickedColor = event.target.classList[1];
    $(`.${clickedColor}`).addClass("pressed");
    setTimeout(function () {
      $(`.${clickedColor}`).removeClass("pressed");
    }, 200);
    var audio = new Audio("sounds/" + clickedColor + ".mp3");
    audio.play();
    if (clickedColor === buttonsToBeClicked[currIndex]) {
      currIndex++;
    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 300);
      reset();
    }

    if (currIndex != 0 && currIndex === buttonsToBeClicked.length) {
      setTimeout(function () {
        increaseLevel();
        addNewButtonToSequence();
      }, 1000);
    }
  });
}
