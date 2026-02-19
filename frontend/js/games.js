document.addEventListener("DOMContentLoaded", () => {

  const gameAction = document.getElementById("gameAction");
  const outputBox = document.getElementById("gameOutput");
  const API = "http://localhost:3000";

  if (!gameAction || !outputBox) {
    console.error("Game elements not found");
    return;
  }

  gameAction.addEventListener("change", async () => {

    outputBox.innerHTML = "";

  
    if (gameAction.value === "viewGroup") {

      const response = await fetch(`${API}/api/games/group`);
      const games = await response.json();

      if (!games.length) {
        outputBox.innerHTML = "No group stage games found.";
        return;
      }

      let html = "<ul style='list-style:none;padding-left:0;'>";

      games.forEach(game => {
        html += `
          <li style="margin-bottom:10px;">
            <strong>${game.homeTeam} vs ${game.awayTeam}</strong>
            <br>
            Round: ${game.round}
            <br>
            Date: ${game.date || "TBD"}
          </li>
        `;
      });

      html += "</ul>";
      outputBox.innerHTML = html;
    }

    // =====================
    // VIEW KNOCKOUT
    // =====================
    if (gameAction.value === "viewKnockout") {

      const response = await fetch(`${API}/api/games/knockout`);
      const games = await response.json();

      if (!games.length) {
        outputBox.innerHTML = "No knockout games found.";
        return;
      }

      let html = "<ul style='list-style:none;padding-left:0;'>";

      games.forEach(game => {
        html += `
          <li style="margin-bottom:10px;">
            <strong>${game.homeTeam} vs ${game.awayTeam}</strong>
            <br>
            Round: ${game.round}
            <br>
            Date: ${game.date || "TBD"}
          </li>
        `;
      });

      html += "</ul>";
      outputBox.innerHTML = html;
    }

    if (gameAction.value === "update") {

  outputBox.innerHTML = `
    <input type="number" id="matchInput" placeholder="Enter Match Number">
    <br><br>
    <button id="findBtn">Find Game</button>
    <div id="gameDetails"></div>
  `;

  document.getElementById("findBtn").addEventListener("click", async () => {

    const matchNo = document.getElementById("matchInput").value;

    const response = await fetch(`${API}/api/games/match/${matchNo}`);

    if (!response.ok) {
      outputBox.innerHTML = "Game not found.";
      return;
    }

    const game = await response.json();

    document.getElementById("gameDetails").innerHTML = `
      <p><strong>${game.homeTeam} vs ${game.awayTeam}</strong></p>
      <input type="text" id="winnerInput" placeholder="Enter Winner">
      <br><br>
      <button id="updateBtn">Update Winner</button>
    `;

    document.getElementById("updateBtn").addEventListener("click", async () => {

      const winner = document.getElementById("winnerInput").value;

      await fetch(`${API}/api/games/match/${matchNo}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winner })
      });

      outputBox.innerHTML = "Game updated successfully.";
    });

  });
}

  });

});
