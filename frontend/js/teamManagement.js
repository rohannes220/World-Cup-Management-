const API_URL = "http://localhost:3000";
let selectedTeamId = null;
let selectedPlayerId = null;
let editingTeam = false;
let editingPlayer = false;

async function getTeams() {
    const response = await fetch(`${API_URL}/api/teams`, {
        method: "GET"
    });
    const teams = await response.json();
    const teamsList = document.getElementById("teams-table");
    teams.forEach(team => {
        const teamRow = document.createElement("tr");
        teamRow.classList.add("team-row");

        const country = document.createElement("td");
        const countryName = document.createElement("td");
        countryName.classList.add("country-name");
        countryName.textContent = team.country;
        
        const flagCell = document.createElement("td");
        const flagImg = document.createElement("img");
        flagImg.src = `https://flagcdn.com/w320/${team.countryCode.toLowerCase()}.png`;
        flagImg.alt = `${team.country} Flag`;
        flagImg.classList.add("flag-img");
        flagCell.appendChild(flagImg);
        country.appendChild(countryName);
        teamRow.appendChild(flagCell);
        teamRow.appendChild(country);

        const group = document.createElement("td");
        group.textContent = `Group ${team.group}`;
        teamRow.appendChild(group);

        const formation = document.createElement("td");
        formation.textContent = `Formation: ${team.formation}`;
        teamRow.appendChild(formation);
        
        const blankCell2 = document.createElement("td");
        blankCell2.classList.add("blank-cell");
        const playersHolder = document.createElement("div");
        playersHolder.classList.add("players-holder");
        blankCell2.appendChild(playersHolder);
        teamRow.appendChild(blankCell2);

        const showPlayersButton = document.createElement("button");
        showPlayersButton.textContent = "Show Players";
        showPlayersButton.addEventListener("click", () => showPlayers(team._id));
        teamRow.appendChild(showPlayersButton);

        teamRow.setAttribute("data-team-id", team._id);
        teamsList.appendChild(teamRow);

        team.starting11.forEach(player => {
            const playerRow = document.createElement("tr");
            playerRow.classList.add("players-row");
            playersHolder.classList.add("hidden");
            const playerName = document.createElement("td");
            playerName.textContent = `${player.name}`;
            const playerPosition = document.createElement("td");
            playerPosition.textContent = `${player.position}`;
            playerRow.appendChild(playerName);
            playerRow.appendChild(playerPosition);
            playersHolder.appendChild(playerRow);
        });
    });
}

function showPlayers(teamId) {
    const teamRow = document.querySelector(`tr[data-team-id="${teamId}"]`);
    const playersHolder = teamRow.querySelector(".players-holder");
    playersHolder.classList.toggle("hidden");
}

function editTeams() {
    const teamRows = document.querySelectorAll(".team-row");
    teamRows.forEach(row => {
        const editButton = document.createElement("button");
        editButton.classList.add("edit-team-button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const teamId = row.getAttribute("data-team-id");
            // Implement edit functionality here
        });
        row.appendChild(editButton);
    });
}

function editPlayers() {
    const playerRows = document.querySelectorAll(".players-row");
    playerRows.forEach(row => {
        const editButton = document.createElement("button");
        editButton.classList.add("edit-player-button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const playerName = row.querySelector("td:nth-child(4)").textContent;
            // Implement edit functionality here
        });
        row.appendChild(editButton);
    });
}

getTeams();
const editTeamsButton = document.querySelector(".options button:nth-child(1)");
const editPlayersButton = document.querySelector(".options button:nth-child(2)");
editTeamsButton.addEventListener("click", () => {
    editingTeam = !editingTeam;
    if (editingTeam) {
        editTeams();
    } else {
        const editButtons = document.querySelectorAll(".edit-team-button");
        editButtons.forEach(button => button.remove());
    }
});
editPlayersButton.addEventListener("click", () => {
    editingPlayer = !editingPlayer;
    if (editingPlayer) {
        editPlayers();
    } else {
        const editButtons = document.querySelectorAll(".edit-player-button");
        editButtons.forEach(button => button.remove());
    }
});