// //1 Page load pe score load
let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let compScore = parseInt(localStorage.getItem("compScore")) || 0;

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// UI pe show
userScorePara.innerText = userScore;
compScorePara.innerText = compScore;

// yhape konse choises ko select kiya ja rha hai vo
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg"); //then apne choices ko acces kiya

// win sound
const winSound = document.getElementById("win-sound");
//com choice generate krne ke liye ye fun used kiya
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  //hme 0 se 2 tak randam no chahiye to *3 randam no genarate krke deta hai
  return options[randIdx]; //randam choice generate krai
};

const drawGame = () => {
  // console.log("game was draw");
  console.log("game was draw");
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

// Local storage
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    console.log("you win!");

    userScore++;
    userScorePara.innerText = userScore;

    // SAVE
    localStorage.setItem("userScore", userScore);

    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";

    // 🔊 SOUND
    // winSound.currentTime = 0;
    // winSound.play();
    if (winSound) {
      winSound.currentTime = 0;
      winSound.play();
    }

    // 🎉 CONFETTI
    if (typeof confetti === "function") {
      const duration = 2 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });

        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  } else {
    console.log("you lose");

    compScore++;
    compScorePara.innerText = compScore;

    // SAVE
    localStorage.setItem("compScore", compScore);
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// choices
const playGame = (userChoice) => {
  //  console.log("user choice = ",userChoice);

  //  generate computer choice
  const compChoice = genCompChoice();
  if (userChoice === compChoice) {
    // Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //   scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //   rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //   rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice); //show winner
  }
};

// event listner add kiya select ke bad id aajaye
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// reset btn
function resetGame() {
  userScore = 0;
  compScore = 0;

  userScorePara.innerText = 0;
  compScorePara.innerText = 0;

  // msg.innerText = "Play your move";
  msg.innerText = "Game reset! Play your move";
  msg.style.backgroundColor = "#081b31";

  // CLEAR STORAGE
  localStorage.removeItem("userScore");
  localStorage.removeItem("compScore");
}

// name save
 const playerLabel = document.getElementById("player-label");
 function saveName() {
  const nameInput = document.getElementById("player-name").value;

  if (nameInput.trim() !== "") {
    playerLabel.innerText = nameInput;

    // save in localStorage
    localStorage.setItem("playerName", nameInput);
  }
}

// Page load pe naam show
const savedName = localStorage.getItem("playerName");
if (savedName) {
  playerLabel.innerText = savedName;
}
