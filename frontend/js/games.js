document.addEventListener("DOMContentLoaded", () => {
  const gameAction = document.getElementById("gameAction");
  if (!gameAction) return;

  gameAction.addEventListener("change", () => {
    const outputBox = document.getElementById("gameOutput");
    outputBox.innerHTML = "";

    if (gameAction.value === "viewGroup") showGroupGames();
    if (gameAction.value === "viewKnockout") showKnockoutGames();
    if (gameAction.value === "totalGames") showTotalGames();
    if (gameAction.value === "totalGroup") showTotalGroupGames();
    if (gameAction.value === "totalKnockout") showTotalKnockoutGames();
    if (gameAction.value === "updateGame") showUpdateGame();
    if (gameAction.value === "deleteGame") showDeleteGame();
    if (gameAction.value === "createFriendly") showCreateFriendly();
  });
});

async function showGroupGames() {
  const res = await fetch("/api/games/group");
  const games = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  games.forEach(game => {
    html += `
      <li style="margin-bottom:15px;">
        <strong>Match #${game.matchNo}</strong><br>
        ${game.homeTeam} vs ${game.awayTeam}<br>
        Winner: ${game.winner || "Not decided"}
      </li>
    `;
  });

  html += "</ul>";
  document.getElementById("gameOutput").innerHTML = html;
}

async function showKnockoutGames() {
  const res = await fetch("/api/games/knockout");
  const games = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  games.forEach(game => {
    html += `
      <li style="margin-bottom:15px;">
        <strong>Match #${game.matchNo}</strong><br>
        ${game.homeTeam} vs ${game.awayTeam}<br>
        Round: ${game.round}<br>
        Winner: ${game.winner || "Not decided"}
      </li>
    `;
  });

  html += "</ul>";
  document.getElementById("gameOutput").innerHTML = html;
}

async function showTotalGames() {
  const res = await fetch("/api/games/stats");
  const data = await res.json();

  document.getElementById("gameOutput").innerHTML =
    `<p><strong>Total Games:</strong> ${data.totalGames}</p>`;
}

async function showTotalGroupGames() {
  const res = await fetch("/api/games/stats/group");
  const data = await res.json();

  document.getElementById("gameOutput").innerHTML =
    `<p><strong>Total Group Stage Games:</strong> ${data.totalGroupStage}</p>`;
}

async function showTotalKnockoutGames() {
  const res = await fetch("/api/games/stats/knockout");
  const data = await res.json();

  document.getElementById("gameOutput").innerHTML =
    `<p><strong>Total Knockout Games:</strong> ${data.totalKnockout}</p>`;
}

function showUpdateGame() {
  const outputBox = document.getElementById("gameOutput");

  outputBox.innerHTML = `
    <input type="number" id="matchInput" placeholder="Match Number" />
    <br><br>
    <input type="text" id="winnerInput" placeholder="Winner" />
    <br><br>
    <button id="updateBtn">Update Winner</button>
  `;

  document.getElementById("updateBtn").addEventListener("click", async () => {
    const matchNo = document.getElementById("matchInput").value;
    const winner = document.getElementById("winnerInput").value;

    if (!matchNo || !winner) {
      alert("Fill all fields.");
      return;
    }

    const response = await fetch(`/api/games/match/${matchNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ winner })
    });

    if (!response.ok) {
      outputBox.innerHTML = "Game not found.";
      return;
    }

    outputBox.innerHTML = "Winner updated successfully.";
  });
}

function showDeleteGame() {
  const outputBox = document.getElementById("gameOutput");

  outputBox.innerHTML = `
    <input type="number" id="deleteMatchInput" placeholder="Match Number" />
    <br><br>
    <button id="deleteBtn">Delete Game</button>
  `;

  document.getElementById("deleteBtn").addEventListener("click", async () => {
    const matchNo = document.getElementById("deleteMatchInput").value;

    await fetch(`/api/games/match/${matchNo}`, {
      method: "DELETE"
    });

    outputBox.innerHTML = "Game deleted successfully.";
  });
}

function showCreateFriendly() {
  const outputBox = document.getElementById("gameOutput");

  outputBox.innerHTML = `
    <input type="number" id="matchNoInput" placeholder="Match Number" />
    <br><br>
    <input type="text" id="homeInput" placeholder="Home Team" />
    <br><br>
    <input type="text" id="awayInput" placeholder="Away Team" />
    <br><br>
    <button id="createFriendlyBtn">Schedule Friendly</button>
  `;

  document.getElementById("createFriendlyBtn").addEventListener("click", async () => {
    const matchNo = document.getElementById("matchNoInput").value;
    const homeTeam = document.getElementById("homeInput").value;
    const awayTeam = document.getElementById("awayInput").value;

    await fetch("/api/games/friendly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matchNo, homeTeam, awayTeam })
    });

    outputBox.innerHTML = "Friendly match scheduled successfully.";
  });
}