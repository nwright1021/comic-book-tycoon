document.addEventListener("DOMContentLoaded", () => {
  let money = 0;
  let clerks = 0;
  let adCampaigns = 0;
  let comicConBooths = 0;
  let influencers = 0;
  let franchises = 0;
  let universeDeals = 0;
  let crossovers = 0;
  let fame = 0;
  let soundEnabled = true;
  let clicks = 0;

  const clickSound = document.getElementById("clickSound");
  const cashSound = document.getElementById("cashSound");
  const toggleSoundBtn = document.getElementById("toggleSound");

  const achievements = [
    { id: "click100", name: "Click 100 Comics", unlocked: false, check: () => clicks >= 100, reward: () => { money += 5000; } },
    { id: "earn10k", name: "Earn $10,000", unlocked: false, check: () => money >= 10000, reward: () => { fame += 1; } },
    { id: "hire10Clerks", name: "Hire 10 Clerks", unlocked: false, check: () => clerks >= 10, reward: () => { money += 10000; } },
    { id: "fame5", name: "Reach 5 Fame", unlocked: false, check: () => fame >= 5, reward: () => { money += 25000; } }
  ];

  function checkAchievements() {
    achievements.forEach(a => {
      if (!a.unlocked && a.check()) {
        a.unlocked = true;
        const item = document.createElement("li");
        item.textContent = `Unlocked: ${a.name}`;
        document.getElementById("achievementList").appendChild(item);
        a.reward();
        alert(`Achievement Unlocked: ${a.name}!`);
      }
    });
  }

  document.getElementById("comic").addEventListener("click", () => {
    money++;
    clicks++;
    if (soundEnabled) {
      clickSound.play();
      cashSound.play();
    }
    animateMoney();
    updateUI();
    saveGame();
    checkAchievements();
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

  document.getElementById("buyInfluencer").addEventListener("click", () => {
    if (money >= 2000) {
      money -= 2000;
      influencers++;
      updateUI();
      saveGame();
    }
  });

  document.getElementById("buyFranchise").addEventListener("click", () => {
    if (money >= 10000) {
      money -= 10000;
      franchises++;
      updateUI();
      saveGame();
    }
  });

  document.getElementById("buyUniverse").addEventListener("click", () => {
    if (money >= 50000) {
      money -= 50000;
      universeDeals++;
      updateUI();
      saveGame();
    }
  });

  document.getElementById("buyCrossover").addEventListener("click", () => {
    if (money >= 100000) {
      money -= 100000;
      crossovers++;
      updateUI();
      saveGame();
    }
  });

  document.getElementById("prestige").addEventListener("click", () => {
    if (money >= 1000) {
      let fameEarned;
      if (money <= 5000) {
        fameEarned = money / 1000;
      } else {
        fameEarned = 5 + ((money - 5000) / 2000);
      }
      fame += fameEarned;
      money = 0;
      clerks = 0;
      adCampaigns = 0;
      comicConBooths = 0;
      influencers = 0;
      franchises = 0;
      universeDeals = 0;
      crossovers = 0;
      clicks = 0;
      saveGame();
      updateUI();
      alert(`You've gained ${fameEarned.toFixed(2)} Fame! All progress reset.`);
    } else {
      alert("You need at least $1000 to Prestige!");
    }
  });

  toggleSoundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    toggleSoundBtn.textContent = soundEnabled ? "Sound: ON" : "Sound: OFF";
  });

  function animateMoney() {
    const moneyDisplay = document.getElementById("money");
    moneyDisplay.classList.add("flash");
    setTimeout(() => {
      moneyDisplay.classList.remove("flash");
    }, 200);
  }

  function updateUI() {
    document.getElementById("money").textContent = money.toFixed(0);
    document.getElementById("clerks").textContent = clerks;
    document.getElementById("ads").textContent = adCampaigns;
    document.getElementById("booths").textContent = comicConBooths;
    document.getElementById("influencers").textContent = influencers;
    document.getElementById("franchises").textContent = franchises;
    document.getElementById("universe").textContent = universeDeals;
    document.getElementById("crossover").textContent = crossovers;
    document.getElementById("fame").textContent = fame.toFixed(2);
  }

  function autoSell() {
    let baseIncome = clerks +
                     (comicConBooths * 5) +
                     (influencers * 20) +
                     (crossovers * 500);

    let multiplier = (1 + 0.5 * adCampaigns) * (1 + 0.1 * fame);
    if (franchises > 0) multiplier *= 2;
    if (universeDeals > 0) multiplier *= 3;

    let income = baseIncome * multiplier;
    money += income;
    updateUI();
    saveGame();
    checkAchievements();
  }

  function saveGame() {
    localStorage.setItem("money", money);
    localStorage.setItem("clerks", clerks);
    localStorage.setItem("adCampaigns", adCampaigns);
    localStorage.setItem("comicConBooths", comicConBooths);
    localStorage.setItem("influencers", influencers);
    localStorage.setItem("franchises", franchises);
    localStorage.setItem("universeDeals", universeDeals);
    localStorage.setItem("crossovers", crossovers);
    localStorage.setItem("fame", fame);
    localStorage.setItem("clicks", clicks);
  }

  function loadGame() {
    money = parseFloat(localStorage.getItem("money")) || 0;
    clerks = parseInt(localStorage.getItem("clerks")) || 0;
    adCampaigns = parseInt(localStorage.getItem("adCampaigns")) || 0;
    comicConBooths = parseInt(localStorage.getItem("comicConBooths")) || 0;
    influencers = parseInt(localStorage.getItem("influencers")) || 0;
    franchises = parseInt(localStorage.getItem("franchises")) || 0;
    universeDeals = parseInt(localStorage.getItem("universeDeals")) || 0;
    crossovers = parseInt(localStorage.getItem("crossovers")) || 0;
    fame = parseFloat(localStorage.getItem("fame")) || 0;
    clicks = parseInt(localStorage.getItem("clicks")) || 0;
    updateUI();
    checkAchievements();
  }

  loadGame();
  setInterval(autoSell, 1000);
});
