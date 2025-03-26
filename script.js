let money = 0;
let clerks = 0;
let adCampaigns = 0;
let comicConBooths = 0;
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

document.getElementById("buyAd").addEventListener("click", () => {
  if (money >= 200) {
    money -= 200;
    adCampaigns++;
    updateUI();
    saveGame();
  }
});

document.getElementById("buyBooth").addEventListener("click", () => {
  if (money >= 500) {
    money -= 500;
    comicConBooths++;
    updateUI();
    saveGame();
  }
});

function updateUI() {
  document.getElementById("money").textContent = money;
  document.getElementById("clerks").textContent = clerks;
  document.getElementById("ads").textContent = adCampaigns;
  document.getElementById("booths").textContent = comicConBooths;
}

function autoSell() {
  let baseIncome = clerks + (comicConBooths * 5);
  let income = baseIncome * (1 + 0.5 * adCampaigns);
  money += Math.floor(income);
  updateUI();
  saveGame();
}

function saveGame() {
  localStorage.setItem("money", money);
  localStorage.setItem("clerks", clerks);
  localStorage.setItem("adCampaigns", adCampaigns);
  localStorage.setItem("comicConBooths", comicConBooths);
}

function loadGame() {
  money = parseInt(localStorage.getItem("money")) || 0;
  clerks = parseInt(localStorage.getItem("clerks")) || 0;
  adCampaigns = parseInt(localStorage.getItem("adCampaigns")) || 0;
  comicConBooths = parseInt(localStorage.getItem("comicConBooths")) || 0;
  updateUI();
}

loadGame();
setInterval(autoSell, 1000);
