"use strict";
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

const playSound = function (name) {
  const currentClickSound = new Audio(`sounds/${name}.mp3`);
  currentClickSound.play();
};

const starter = function () {
  $("#level-title").text(`level ${level}`);
  nextSequence();
  started = true;
};

const animatePress = function (currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const nextSequence = function () {
  userClickedPattern = [];

  level++;
  $("#level-title").text(`level ${level}`);

  const randomNumber = Math.trunc(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColor);
  animatePress(userChosenColor);
});

$(document).keypress(function () {
  if (!started) {
    starter();
  }
});

$(".start-btn").click(function () {
  starter();
});

const checkAnswer = function (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press any key to restart");
    startOver();
  }
};

const startOver = function () {
  level = 0;
  gamePattern = [];
  started = false;
};
