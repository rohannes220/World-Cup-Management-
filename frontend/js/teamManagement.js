const API_URL = "http://localhost:3000";
let selectedTeamId = null;
let selectedPlayerId = null;
let editingTeam = false;
let editingPlayer = false;
let teams = [], players = [];

async function getData() {
    const response = await fetch(`${API_URL}/api/teams`, {
        method: "GET"
    });
    const teamsResponse = await response.json();
    const teamsList = document.getElementById("teams-table");
    teamsResponse.forEach(team => {
        teams.push(team);
        const teamRow = document.createElement("tr");
        teamRow.classList.add("team-row");

        const country = document.createElement("td");
        const countryName = document.createElement("td");
        countryName.classList.add("country-name");
        countryName.textContent = team.country;
        
        const flagImg = document.createElement("img");
        flagImg.src = `https://flagcdn.com/w320/${team.countryCode.toLowerCase()}.png`;
        flagImg.alt = `${team.country} Flag`;
        flagImg.classList.add("flag-img");
        country.appendChild(countryName);
        teamRow.appendChild(flagImg);
        teamRow.appendChild(country);

        const group = document.createElement("td");
        group.textContent = `${team.group}`;
        teamRow.appendChild(group);

        const formation = document.createElement("td");
        formation.textContent = `${team.formation}`;
        teamRow.appendChild(formation);
        
        const blankCell2 = document.createElement("td");
        blankCell2.classList.add("blank-cell");
        const playersHolder = document.createElement("div");
        playersHolder.classList.add("players-holder");
        blankCell2.appendChild(playersHolder);
        teamRow.appendChild(blankCell2);

        const showPlayersButton = document.createElement("button");
        showPlayersButton.textContent = "Show Starters";
        showPlayersButton.addEventListener("click", () => showStarters(team._id));
        teamRow.appendChild(showPlayersButton);

        teamRow.setAttribute("data-team-id", team._id);
        teamsList.appendChild(teamRow);

        team.starting11.forEach(player => {
            players.push(player);
            const playerRow = document.createElement("tr");
            playersHolder.classList.add("hidden");
            const playerName = document.createElement("td");
            playerName.textContent = `${player.name}`;
            const playerPosition = document.createElement("td");
            playerPosition.textContent = `${player.position}`;
            playerRow.appendChild(playerName);
            playerRow.appendChild(playerPosition);
            playersHolder.appendChild(playerRow);

            const playersTable = document.querySelector("#players-table");
            const playerRow2 = document.createElement("tr");
            playerRow2.classList.add("players-row");
            const playerName2 = document.createElement("td");
            playerName2.textContent = `${player.name}`;
            const playerPosition2 = document.createElement("td");
            playerPosition2.textContent = `${player.position}`;
            

            const country = document.createElement("td");
            const countryName = document.createElement("span");
            countryName.classList.add("country-name");
            countryName.textContent = team.country;
            
            const flagImg = document.createElement("img");
            flagImg.src = `https://flagcdn.com/w320/${team.countryCode.toLowerCase()}.png`;
            flagImg.alt = `${team.country} Flag`;
            flagImg.classList.add("flag-img");
            country.appendChild(flagImg);
            country.appendChild(countryName);
            
            playerRow2.appendChild(country);
            playerRow2.appendChild(playerName2);
            playerRow2.appendChild(playerPosition2);
            
            playersTable.appendChild(playerRow2);
        });
    });
}

function toggleTeams() {
    const teamsCard = document.querySelector(".teams-card");
    const playersCard = document.querySelector(".players-card");
    teamsCard.classList.toggle("hidden");
    playersCard.classList.toggle("hidden");
}

function showStarters(teamId) {
    const teamRow = document.querySelector(`tr[data-team-id="${teamId}"]`);
    const playersHolder = teamRow.querySelector(".players-holder");
    playersHolder.classList.toggle("hidden");
}

function editRow() {

}

function editTeams() {
    const teamRows = document.querySelectorAll(".team-row");
    teamRows.forEach(row => {
        const editButton = document.createElement("button");
        editButton.classList.add("edit-team-button");
        const editIcon = document.createElement("img");
        editIcon.src = "./assets/edit.png";
        editIcon.alt = "Edit";
        editButton.appendChild(editIcon);
        editButton.addEventListener("click", () => {
            const teamId = row.getAttribute("data-team-id");
            // Implement edit functionality here
        });
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-team-button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./assets/delete.png";
        deleteIcon.alt = "Delete";
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", async () => {
            const teamId = row.getAttribute("data-team-id");
            await fetch(`${API_URL}/api/teams/${teamId}`, {
                method: "DELETE"
            });
            row.remove();
        });
        row.appendChild(editButton);
        row.appendChild(deleteButton);
    });
}

function editPlayers() {
    const playerRows = document.querySelectorAll(".players-row");
    playerRows.forEach(row => {
        const editButton = document.createElement("button");
        editButton.classList.add("edit-player-button");
        const editIcon = document.createElement("img");
        editIcon.src = "./assets/edit.png";
        editIcon.alt = "Edit";
        editButton.appendChild(editIcon);
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-player-button");
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "./assets/delete.png";
        deleteIcon.alt = "Delete";
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener("click", async () => {
            const playerName = row.querySelector("td:nth-child(2)").textContent;
            await fetch(`${API_URL}/api/players/${playerName}`, {
                method: "DELETE"            });
            row.remove();
        });   
        editButton.addEventListener("click", () => {
            const playerName = row.querySelector("td:nth-child(4)").textContent;
            // Implement edit functionality here
        });
        row.appendChild(editButton);
        row.appendChild(deleteButton);
    });
}

function addTeam() {
    const teamForm = document.createElement("form");
    teamForm.classList.add("team-form");
    const countryInput = document.createElement("input");
    countryInput.type = "text";
    countryInput.placeholder = "Country Name";
    const countryCodeInput = document.createElement("input");
    countryCodeInput.type = "text";
    countryCodeInput.placeholder = "Country Code (e.g. US)";
    const groupInput = document.createElement("input");
    groupInput.type = "text";
    groupInput.placeholder = "Group (e.g. A)";
    const formationInput = document.createElement("input");
    formationInput.type = "text";
    formationInput.placeholder = "Formation (e.g. 4-3-3)";
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Team";
    teamForm.appendChild(countryInput);
    teamForm.appendChild(countryCodeInput);
    teamForm.appendChild(groupInput);
    teamForm.appendChild(formationInput);
    teamForm.appendChild(submitButton);
    teamForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newTeam = {
            country: countryInput.value,
            countryCode: countryCodeInput.value,
            group: groupInput.value,    
            formation: formationInput.value,
            starting11: []
        };
        await fetch(`${API_URL}/api/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTeam)
        });
        teamForm.remove();
        getData();
    });
    const options = document.querySelector(".options");
    options.after(teamForm);
}

function addPlayer() {
}

//
getData();
const teamsButton = document.querySelector(".teams-button");
const playersButton = document.querySelector(".players-button");
const addTeamsButton = document.querySelector(".add-teams-button");
const addPlayersButton = document.querySelector(".add-player-button");
addTeamsButton.addEventListener("click", addTeam);
addPlayersButton.addEventListener("click", addPlayer);
teamsButton.addEventListener("click", toggleTeams);
playersButton.addEventListener("click", toggleTeams);
const editTeamsButton = document.querySelector(".edit-teams-button");
const editPlayersButton = document.querySelector(".edit-players-button");
editTeamsButton.addEventListener("click", () => {
    editingTeam = !editingTeam;
    if (editingTeam) {
        editTeams();
    } else {
        const editButtons = document.querySelectorAll(".edit-team-button");
        const deleteButtons = document.querySelectorAll(".delete-team-button");
        editButtons.forEach(button => button.remove());
        deleteButtons.forEach(button => button.remove());
    }
});
editPlayersButton.addEventListener("click", () => {
    editingPlayer = !editingPlayer;
    if (editingPlayer) {
        editPlayers();
    } else {
        const editButtons = document.querySelectorAll(".edit-player-button");
        const deleteButtons = document.querySelectorAll(".delete-player-button");
        editButtons.forEach(button => button.remove());
        deleteButtons.forEach(button => button.remove());
    }
});