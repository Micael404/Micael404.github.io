let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }
  if (
    (playerSelection === "PEDRA" && computerSelection === "TESOURA") ||
    (playerSelection === "TESOURA" && computerSelection === "PAPEL") ||
    (playerSelection === "PAPEL" && computerSelection === "PEDRA")
  ) {
    playerScore++;
    roundWinner = "jogador";
  }
  if (
    (computerSelection === "PEDRA" && playerSelection === "TESOURA") ||
    (computerSelection === "TESOURA" && playerSelection === "PAPEL") ||
    (computerSelection === "PAPEL" && playerSelection === "PEDRA")
  ) {
    computerScore++;
    roundWinner = "computador";
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection);
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "PEDRA";
    case 1:
      return "PAPEL";
    case 2:
      return "TESOURA";
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

// UI

const scoreInfo = document.getElementById("scoreInfo");
const scoreMessage = document.getElementById("scoreMessage");
const playerScorePara = document.getElementById("playerScore");
const computerScorePara = document.getElementById("computerScore");
const playerSign = document.getElementById("playerSign");
const computerSign = document.getElementById("computerSign");
const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");
const endgameModal = document.getElementById("endgameModal");
const endgameMsg = document.getElementById("endgameMsg");
const overlay = document.getElementById("overlay");
const restartBtn = document.getElementById("restartBtn");

rockBtn.addEventListener("click", () => handleClick("PEDRA"));
paperBtn.addEventListener("click", () => handleClick("PAPEL"));
scissorsBtn.addEventListener("click", () => handleClick("TESOURA"));
restartBtn.addEventListener("click", restartGame);
overlay.addEventListener("click", closeEndgameModal);

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal();
    return;
  }

  const computerSelection = getRandomChoice();
  playRound(playerSelection, computerSelection);
  updateChoices(playerSelection, computerSelection);
  updateScore();

  if (isGameOver()) {
    openEndgameModal();
    setFinalMessage();
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "PEDRA":
      playerSign.textContent = "✊";
      break;
    case "PAPEL":
      playerSign.textContent = "✋";
      break;
    case "TESOURA":
      playerSign.textContent = "✌";
      break;
  }

  switch (computerSelection) {
    case "PEDRA":
      computerSign.textContent = "✊";
      break;
    case "PAPEL":
      computerSign.textContent = "✋";
      break;
    case "TESOURA":
      computerSign.textContent = "✌";
      break;
  }
}

function updateScore() {
  if (roundWinner === "empate") {
    scoreInfo.textContent = "é um empate!";
  } else if (roundWinner === "jogador") {
    scoreInfo.textContent = "você ganhou!";
  } else if (roundWinner === "computador") {
    scoreInfo.textContent = "você perdeu!";
  }

  playerScorePara.textContent = `Jogador: ${playerScore}`;
  computerScorePara.textContent = `Computador: ${computerScore}`;
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === "jogador") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} ganhou ${computerSelection.toLowerCase()}`;
    return;
  }
  if (winner === "computador") {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} perdeu para ${computerSelection.toLowerCase()}`;
    return;
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} empatou com ${computerSelection.toLowerCase()}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
  endgameModal.classList.add("active");
  overlay.classList.add("active");
}

function closeEndgameModal() {
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = "você ganhou!")
    : (endgameMsg.textContent = "você perdeu...");
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  scoreInfo.textContent = "Escolha seu elemento";
  scoreMessage.textContent = "Primeiro a marcar 5 pontos vence";
  playerScorePara.textContent = "Jgador: 0";
  computerScorePara.textContent = "Computador: 0";
  playerSign.textContent = "❔";
  computerSign.textContent = "❔";
  endgameModal.classList.remove("active");
  overlay.classList.remove("active");
}
