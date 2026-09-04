// HTML ELEMENT IDs
const crapsuserinput = "craps-user-input";
const crapsregistrationpane = "craps-registration-pane";
const crapsmainsection = "craps-main-section";

function registercrapsgame() {
  let crapsusername = document.getElementById(crapsuserinput).value;
  alert("got" + crapsusername);
  removeregistrationpane();
  showmaingamesection();
}

function removeregistrationpane() {
  document.getElementById(crapsregistrationpane).style.display = "none";
}

function showmaingamesection() {
  document.getElementById(crapsmainsection).style.display = "block";
}
