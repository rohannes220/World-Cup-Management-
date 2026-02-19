const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const gameAction = document.getElementById("gameAction");

  gameAction.addEventListener("change", () => {
    const outputBox = document.getElementById("gameOutput");
    outputBox.innerHTML = "";

    if (gameAction.value === "viewGroup") {
      renderViewGroup();
    }

    if (gameAction.value === "viewKnockout") {
      renderViewKnockout();
    }

    if (gameAction.value === "updateGame") {
      renderUpdateGame();
    }

    if (gameAction.value === "deleteGame") {
      renderDeleteGame();
    }

    if (gameAction.value === "createFriendly") {
      renderCreateFriendly();
    }
  });
});

async function renderViewGroup() {
  const outputBox = document.getElementById("gameOutput");

  const res = await fetch(`${API}/api/games/group`);
  const games = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  games.forEach(game => {
    html += `
      <li style="margin-bottom:15px;">
        <strong>Match #${game.matchNo}</strong>
        <br>
        ${game.homeTeam} vs ${game.awayTeam}
        <br>
        Winner: ${game.winner || "Not decided"}
      </li>
    `;
  });

  html += "</ul>";
  outputBox.innerHTML = html;
}

async function renderViewKnockout() {
  const outputBox = document.getElementById("gameOutput");

  const res = await fetch(`${API}/api/games/knockout`);
  const games = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  games.forEach(game => {
    html += `
      <li style="margin-bottom:15px;">
        <strong>Match #${game.matchNo || "Friendly"}</strong>
        <br>
        ${game.homeTeam} vs ${game.awayTeam}
        <br>
        Round: ${game.round}
        <br>
        Winner: ${game.winner || "Not decided"}
      </li>
    `;
  });

  html += "</ul>";
  outputBox.innerHTML = html;
}

function renderUpdateGame() {
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

    const response = await fetch(`${API}/api/games/match/${matchNo}`, {
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

function renderDeleteGame() {
  const outputBox = document.getElementById("gameOutput");

  outputBox.innerHTML = `
    <input type="number" id="deleteMatchInput" placeholder="Match Number" />
    <br><br>
    <button id="deleteBtn">Delete Game</button>
  `;

  document.getElementById("deleteBtn").addEventListener("click", async () => {
    const matchNo = document.getElementById("deleteMatchInput").value;

    if (!matchNo) {
      alert("Enter match number.");
      return;
    }

    const response = await fetch(`${API}/api/games/match/${matchNo}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      outputBox.innerHTML = "Game not found.";
      return;
    }

    outputBox.innerHTML = "Game deleted successfully.";
  });
}

function renderCreateFriendly() {
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

    if (!matchNo || !homeTeam || !awayTeam) {
      alert("Fill all fields.");
      return;
    }

    await fetch(`${API}/api/games/friendly`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        matchNo,
        homeTeam,
        awayTeam
      })
    });

    outputBox.innerHTML = "Friendly match scheduled successfully.";
  });
}
