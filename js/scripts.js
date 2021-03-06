var computer = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};

var user = {
  score: 0,
  percent2: 0.5,
  percent3: 0.33
};

var game = {
  isComputerTurn: true,
  shotsLeft: 15
};

function showText(s) {
  var $textElement = $("#text");
  $textElement.fadeOut(400, function() {
    $textElement.html(s);
    $textElement.fadeIn(100);
  });
}

function updateComputerScore(score) {
  computer.score += score;
  var $computerScoreElem = $("#computer-score");
  $computerScoreElem.animateNumber({
    number: computer.score
  });
}

function updateUserScore(score) {
  user.score += score;
  var $userScoreElem = $("#user-score");
  $userScoreElem.animateNumber({
    number: user.score
  });
}

function disableComputerButtons(flag) {
  $(".btn-computer").prop("disabled", flag);
}

function disableUserButtons(flag) {
  $(".btn-user").prop("disabled", flag);
}

function updateAI() {
  var difference = user.score - computer.score;

  if (difference >= 10) {
    computer.percent2 = 0.7;
    computer.percent3 = 0.43;
  } else if (difference >= 6) {
    computer.percent2 = 0.6;
    computer.percent3 = 0.38;
  } else if (difference <= 10) {
    computer.percent2 = 0.3;
    computer.percent3 = 0.23;
  } else if (difference <= 6) {
    computer.percent2 = 0.4;
    computer.percent3 = 0.28;
  }
}

function onComputerShoot() {
  if (!game.isComputerTurn) {
    return;
  }

  updateAI();

  var shootType = Math.random() < 0.5 ? 2 : 3;

  if (Math.random() < computer["percent" + shootType]) {
    showText("Computer has succeeded the " + shootType + "-point shot!");
    updateComputerScore(shootType);
  } else {
    showText("Computer has failed the " + shootType + "-point shot.");
  }
  game.isComputerTurn = false;

  disableComputerButtons(true);
  disableUserButtons(false);
}

function onUserShoot(shootType) {
  if (game.isComputerTurn) {
    return;
  }
  if (Math.random() < user["percent" + shootType]) {
    showText("You have succeeded the " + shootType + "-point shot!");
    updateUserScore(shootType);
  } else {
    showText("You have failed the " + shootType + "-point shot.");
  }
  game.isComputerTurn = true;

  disableComputerButtons(false);
  disableUserButtons(true);
  game.shotsLeft--;

  var $shotsLeftElem = $("#span-shots-left");
  $shotsLeftElem.html(game.shotsLeft);

  if (game.shotsLeft === 0) {
    if (user.score > computer.score) {
      showText("You won!!!!");
    } else if (user.score < computer.score) {
      showText("Aww you lost this time.");
    } else {
      showText("It was a draw.");
    }

    disableComputerButtons(true);
    disableUserButtons(true);
  }
}

$(function() {
  showText(3);

  setTimeout(function() {
    showText(2);

    setTimeout(function() {
      showText(1);

      setTimeout(function() {
        showText("Computer will start first!");
        disableComputerButtons(false);
      }, 1000);
    }, 1000);
  }, 1000);
});
