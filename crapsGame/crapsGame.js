// HTML ELEMENT IDs
const crapsuserinput = "craps-user-input";
const crapsregistrationpane = "craps-registration-pane";
const crapsmainsection = "craps-main-section";

// 1. Added 'event' here to stop page reloads
function registercrapsgame(event) {
  if (event) event.preventDefault();

  let crapsusername = document.getElementById(crapsuserinput).value;

  // validation check
  let usernameRegex = /^[a-zA-Z_]\w{4,}$/;

  // 2. FIXED LINE: Added ! and .test() to actually run the check
  let usernameIsNotValid = !usernameRegex.test(crapsusername);

  if (usernameIsNotValid) {
    alert(
      "username must be at least five characters long, alphanumeric and underscores only, no spaces, and cannot start with a digit",
    );
  } else {
    removeregistrationpane();
    showmaingamesection();
  }
}

function removeregistrationpane() {
  document.getElementById(crapsregistrationpane).style.display = "none";
}

function showmaingamesection() {
  document.getElementById(crapsmainsection).style.display = "block";
}
