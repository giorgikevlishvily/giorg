// Initial list of brawlers by rarity
const brawlers = {
    common: ["Shelly", "Nita", "Colt", "Bull"],
    rare: ["Jessie", "Brock"],
    epic: ["Dynamike", "Bo"],
    legendary: ["Spike", "Leon"]
};

// User's inventory of collected brawlers and coins
let userInventory = {
    brawlers: [],
    skins: [],
    coins: 0
};

// Box probabilities
const boxes = {
    brawlBox: { cost: 10, chances: { common: 0.8, rare: 0.2 } },
    bigBox: { cost: 20, chances: { common: 0.6, rare: 0.3, epic: 0.1 } },
    megaBox: { cost: 40, chances: { common: 0.5, rare: 0.3, epic: 0.2 } },
    omegaBox: { cost: 60, chances: { rare: 0.5, epic: 0.4, legendary: 0.1 } },
    deadBox: { cost: 5, chances: { common: 0.9, rare: 0.1 } },
    legendaryBox: { cost: 100, chances: { legendary: 1.0 } }
};

// Utility to display coins and brawler list
function updateDisplay() {
    document.getElementById("coin-count").textContent = userInventory.coins;
    const brawlerList = document.getElementById("brawlers-list");
    brawlerList.innerHTML = userInventory.brawlers.map(brawler => `<div class="brawler">${brawler}</div>`).join("");
}

// Add coins to start with
userInventory.coins = 200;
updateDisplay();

// Open a box
function openBox(boxType) {
    const box = boxes[boxType];
    if (userInventory.coins < box.cost) {
        alert("Not enough coins!");
        return;
    }

    userInventory.coins -= box.cost;
    const newBrawler = getBrawlerFromBox(box);
    const resultDiv = document.getElementById("result");

    if (newBrawler) {
        resultDiv.textContent = `You got a new brawler: ${newBrawler}!`;
        userInventory.brawlers.push(newBrawler);
    } else {
        resultDiv.textContent = "You already have this brawler!";
    }

    updateDisplay();
}

// Determine brawler based on box probabilities
function getBrawlerFromBox(box) {
    let random = Math.random();
    let selectedRarity = null;

    // Determine rarity
    for (const rarity in box.chances) {
        if (random < box.chances[rarity]) {
            selectedRarity = rarity;
            break;
        }
        random -= box.chances[rarity];
    }

    // If rarity is determined, pick a brawler from that category
    if (selectedRarity) {
        const possibleBrawlers = brawlers[selectedRarity].filter(b => !userInventory.brawlers.includes(b));
        if (possibleBrawlers.length > 0) {
            return possibleBrawlers[Math.floor(Math.random() * possibleBrawlers.length)];
        }
    }
    return null;
}
// Show result with a short animation effect
function showResult(message, isSuccess) {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = message;
    resultDiv.style.opacity = 1;

    if (isSuccess) {
        resultDiv.style.color = "#50fa7b"; // Success color
    } else {
        resultDiv.style.color = "#ff5555"; // Error color
    }

    // Fade out result after 2 seconds
    setTimeout(() => {
        resultDiv.style.opacity = 0;
    }, 2000);
}

// Open a box and display result
function openBox(boxType) {
    const box = boxes[boxType];
    if (userInventory.coins < box.cost) {
        showResult("Not enough coins!", false);
        return;
    }

    userInventory.coins -= box.cost;
    const newBrawler = getBrawlerFromBox(box);

    if (newBrawler) {
        showResult(`You got a new brawler: ${newBrawler}!`, true);
        userInventory.brawlers.push(newBrawler);
    } else {
        showResult("You already have this brawler!", false);
    }

    updateDisplay();
}
