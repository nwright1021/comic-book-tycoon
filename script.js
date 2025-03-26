let money = 0;
let clerks = 0;
let clickSound = document.getElementById("clickSound");
let cashSound = document.getElementById("cashSound");

document.getElementById("comic").addEventListener("click", () => {
  money++;
  clickSound.play();
  updateUI();
  cashSound.play();
  saveGame();
});

document.getElementById("buyClerk").addEventListener("click", () => {
  if (money >= 50) {
    money -= 50;
    clerks++;
    updateUI();
    saveGame();
  }
});

function updateUI() {
  document.getElementById("money").textContent = money;
  document.getElementById("clerks").textContent = clerks;
}

function autoSell() {
  money += clerks;
  updateUI();
  saveGame();
}

function saveGame() {
  localStorage.setItem("money", money);
  localStorage.setItem("clerks", clerks);
}

function loadGame() {
  money = parseInt(localStorage.getItem("money")) || 0;
  clerks = parseInt(localStorage.getItem("clerks")) || 0;
  updateUI();
}

loadGame();
setInterval(autoSell, 1000);
