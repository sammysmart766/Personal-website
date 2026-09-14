// =========================================================
// GAME STATE
// =========================================================

const crapsuserinput = "craps-user-input";
const crapsregistrationpane = "craps-registration-pane";
const crapsmainsection = "craps-main-section";

let currentUsername = "";
let userWalletBalance = 1000;
let currentBetAmount = 100;
let executionLock = false;

function registercrapsgame(event) {
  if (event) event.preventDefault();

  const inputField = document.getElementById(crapsuserinput);

  if (!inputField) return;

  const crapsusername = inputField.value.trim();

  // Username must:
  // - Start with a letter or underscore
  // - Contain only letters, numbers, and underscores
  // - Be at least 5 characters long
  const usernameRegex = /^[a-zA-Z_]\w{4,}$/;

  if (!usernameRegex.test(crapsusername)) {
    alert(
      "Username must be at least 5 characters, alphanumeric/underscores only, and cannot start with a number.",
    );
    return;
  }

  // Save the username
  currentUsername = crapsusername;

  // Display the username in the game dashboard
  document.getElementById("display-username").innerText = currentUsername;

  // Remove the registration screen
  removeregistrationpane();

  // Display the main game dashboard
  showmaingamesection();
}

function removeregistrationpane() {
  const registrationPane = document.getElementById(crapsregistrationpane);

  if (registrationPane) {
    registrationPane.style.display = "none";
  }
}

function showmaingamesection() {
  document.getElementById(crapsmainsection).style.display = "flex";

  // Add a class so small-screen CSS can give the active game more vertical space.
  document.querySelector(".craps-game-container").classList.add("game-active");
}

// Transaction Adjustment Handler Limits Betting to Wallet Resource Maximums
function adjustBet(increment) {
  if (executionLock) return;

  let targetedNextBet = currentBetAmount + increment;

  if (targetedNextBet < 100) {
    alert("Minimum baseline wagering restriction is $100.");
    return;
  }
  if (targetedNextBet > userWalletBalance) {
    alert("Insufficient funds to increase stake size.");
    return;
  }

  currentBetAmount = targetedNextBet;
  document.getElementById("display-bet-amount").innerText =
    "Current Bet: $" + currentBetAmount;
}

// Main Engine Routine interfacing with external roll-a-die system mechanics
function executeGameRound() {
  if (executionLock) return;

  // Validation Phase
  if (userWalletBalance <= 0) {
    handleGameOver("You have run out of money. Game over!");
    return;
  }
  if (currentBetAmount > userWalletBalance) {
    alert("Wager exceeds cash reserve balances. Scaling down.");
    currentBetAmount = Math.max(100, Math.floor(userWalletBalance / 100) * 100);
    document.getElementById("display-bet-amount").innerText =
      "Current Bet: $" + currentBetAmount;
    if (currentBetAmount === 0) {
      handleGameOver("Broke!");
      return;
    }
    return;
  }

  executionLock = true; // Lock down screen interactions
  document.getElementById("round-outcome-message").innerText =
    "The dice are in the air...";

  // Read User Option State Selection
  let betTypeElements = document.getElementsByName("bet-type");
  let selectedBetType = "EVEN";
  for (let i = 0; i < betTypeElements.length; i++) {
    if (betTypeElements[i].checked) {
      selectedBetType = betTypeElements[i].value;
      break;
    }
  }

  // Interface Callback Hook for Roll-A-Die Library Canvas Engine
  rollADie({
    element: document.getElementById("dice-animation-area"),
    numberOfDice: 2,
    callback: function (resultsArray) {
      let die1 = resultsArray[0];
      let die2 = resultsArray[1];
      let combinedSum = die1 + die2;
      let numericParity = combinedSum % 2 === 0 ? "EVEN" : "ODD";

      let outcomeMessage =
        "Rolled " +
        die1 +
        " + " +
        die2 +
        " = " +
        combinedSum +
        " (" +
        numericParity +
        "). ";

      // Transaction Settlement Engine Step Logic
      if (selectedBetType === numericParity) {
        userWalletBalance += currentBetAmount;
        outcomeMessage += "You won $" + currentBetAmount + "! 🎉";
      } else {
        userWalletBalance -= currentBetAmount;
        outcomeMessage += "You lost $" + currentBetAmount + ". 💸";
      }

      // View Update Binding Sync Steps
      document.getElementById("display-wallet").innerText =
        "$" + userWalletBalance;
      document.getElementById("round-outcome-message").innerText =
        outcomeMessage;

      executionLock = false; // Re-enable click systems

      // Boundary Resolution Evaluation
      if (userWalletBalance <= 0) {
        setTimeout(function () {
          handleGameOver("Bankrupted! You are out of resources.");
        }, 800);
      }
    },
    delay: 1200,
  });
}

function handleGameOver(terminationReasonText) {
  alert(terminationReasonText);
  location.reload(); // Hard refresh engine back to clean registration states safely
}

function exitCasinoSession() {
  if (
    confirm(
      "Are you sure you want to exit the game session? Your current winnings will be cashed out.",
    )
  ) {
    alert(
      "Thanks for playing, " +
        currentUsername +
        "! You are leaving with $" +
        userWalletBalance,
    );
    location.reload();
  }
}

// 🎹 KEYBOARD SHORTCUT: Listen for the "Enter" key inside the registration field
document
  .getElementById("craps-user-input")
  .addEventListener("keydown", function (event) {
    // Check if the physical key pressed was the "Enter" key
    if (event.key === "Enter") {
      // Stop any default browser form actions
      event.preventDefault();

      // Fire your existing registration function instantly!
      registercrapsgame(event);
    }
  });
