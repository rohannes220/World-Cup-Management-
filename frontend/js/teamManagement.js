import { displayTeam, displayPlayer, createForm } from "./library.js";

const API_URL = "https://world-cup-management.onrender.com";
let selectedTeamId = null;
let selectedPlayerId = null;
let editingTeam = false;
let editingPlayer = false;
let filterActive = false;
let currentFilter = null;
let addingTeam = false;
let addingPlayer = false;
let viewingTeams = true;
let viewingPlayers = false;
let teams = [], players = [];

async function getTeams() {
    const response = await fetch(`${API_URL}/api/teams`, {
        method: "GET"
    });
    const teamsResponse = await response.json();
    const teamsTable = document.getElementById("teams-table");
    teamsResponse.forEach(team => {
        displayTeam(team, teamsTable);
    });
}

async function getPlayers() {
    const response = await fetch(`${API_URL}/api/players`, {
        method: "GET"
    });
    const playersResponse = await response.json();
    const playersTable = document.querySelector("#players-table");
    playersResponse.forEach(player => {
        players.push(player);
        displayPlayer(player, playersTable);
    });
}

function toggleTeams() {
    if (viewingTeams) {
        return;
    }
    viewingTeams = true;
    viewingPlayers = false;
    const teamsCard = document.querySelector(".teams-card");
    const playersCard = document.querySelector(".players-card");
    teamsCard.classList.toggle("hidden");
    playersCard.classList.toggle("hidden");
}

function togglePlayers() {
    if (viewingPlayers) {
        return;
    }
    viewingPlayers = true;
    viewingTeams = false;
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
    addingTeam = !addingTeam;
    if (!addingTeam) {
        const existingTeamForm = document.querySelector(".team-form");
        if (existingTeamForm) {
            existingTeamForm.remove();
        }
        return;
    }
    addingTeam = true;
    const submitFunction = async (e) => {
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
                "Content-Type": "application/json"            },
            body: JSON.stringify(newTeam)
        });
        teamForm.remove();
        getTeams();
    };
    const teamForm = createForm(document, "team-form", [
        { type: "text", placeholder: "Country Name" },
        { type: "text", placeholder: "Country Code (e.g. US)" }, 
        { type: "text", placeholder: "Group (e.g. A)" },
        { type: "text", placeholder: "Formation (e.g. 4-3-3)" }
    ], submitFunction);
    teamForm.classList.add("team-form");
    const options = document.querySelector(".teams-options");
    options.after(teamForm);
}

function addPlayer() {
    addingPlayer = !addingPlayer;
    if (!addingPlayer) {
        const existingPlayerForm = document.querySelector(".player-form");
        if (existingPlayerForm) {
            existingPlayerForm.remove();
        }
        return;
    }
    addingPlayer = true;
    const playerForm = document.createElement("form");
    playerForm.classList.add("player-form");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.placeholder = "Player Name";
    const positionInput = document.createElement("input");
    positionInput.type = "text";
    positionInput.placeholder = "Position";
    const countryInput = document.createElement("input");
    countryInput.type = "text";
    countryInput.placeholder = "Country";
    const countryCodeInput = document.createElement("input");
    countryCodeInput.type = "text";
    countryCodeInput.placeholder = "Country Code (e.g. US)";
    const winsInput = document.createElement("input");
    winsInput.type = "text";
    winsInput.placeholder = "Wins";
    const lossesInput = document.createElement("input");
    lossesInput.type = "text";
    lossesInput.placeholder = "Losses";
    const goalsInput = document.createElement("input");
    goalsInput.type = "text";
    goalsInput.placeholder = "Goals";
    const assistsInput = document.createElement("input");
    assistsInput.type = "text";
    assistsInput.placeholder = "Assists";
    const gamesPlayedInput = document.createElement("input");
    gamesPlayedInput.type = "text";
    gamesPlayedInput.placeholder = "Games Played";
    const yellowCardsInput = document.createElement("input");
    yellowCardsInput.type = "text";
    yellowCardsInput.placeholder = "Yellow Cards";
    const redCardsInput = document.createElement("input");
    redCardsInput.type = "text";
    redCardsInput.placeholder = "Red Cards";
    
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Submit";

    playerForm.appendChild(nameInput);
    playerForm.appendChild(positionInput);
    playerForm.appendChild(countryInput);
    playerForm.appendChild(countryCodeInput);
    playerForm.appendChild(winsInput);
    playerForm.appendChild(lossesInput);
    playerForm.appendChild(goalsInput);
    playerForm.appendChild(assistsInput);
    playerForm.appendChild(gamesPlayedInput);
    playerForm.appendChild(yellowCardsInput);
    playerForm.appendChild(redCardsInput);
    playerForm.appendChild(submitButton);

    playerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newPlayerData= {
            name: nameInput.value,
            position: positionInput.value,
            country: countryInput.value,
            countryCode: countryCodeInput.value,
            wins: winsInput.value,
            losses: lossesInput.value,
            goals: goalsInput.value,
            assists: assistsInput.value,
            gamesPlayed: gamesPlayedInput.value,
            yellowCards: yellowCardsInput.value,
            redCards: redCardsInput.value
        };
        await fetch(`${API_URL}/api/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPlayerData)
        });
        playerForm.remove();
        addingPlayer = false;
        getPlayers();
    });
    
    const options = document.querySelector(".players-options");
    options.after(playerForm);
}

function filterPlayers() {
    const filterForm = document.createElement("form");
    filterForm.className = "filter-form";
    const positionFilterInput = document.createElement("input");
    positionFilterInput.type = "text";
    positionFilterInput.placeholder = "Position";
    const countryFilterInput = document.createElement("input");
    countryFilterInput.type = "text";
    countryFilterInput.placeholder = "Country";
    const winsFilterInput = document.createElement("input");
    winsFilterInput.type = "text";
    winsFilterInput.placeholder = "Wins";
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Apply Filter";

    filterForm.appendChild(positionFilterInput);
    filterForm.appendChild(countryFilterInput);
    filterForm.appendChild(winsFilterInput);
    filterForm.appendChild(submitButton);

    const options = document.querySelector(".players-options");
    options.after(filterForm);

    filterForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        currentFilter = {
            position: positionFilterInput.value,
            country: countryFilterInput.value,
            wins: winsFilterInput.value
        };
        const response = await fetch(`${API_URL}/api/players?position=${currentFilter.position}&country=${currentFilter.country}&wins=${currentFilter.wins}`, {
            method: "GET"
        });
        filterForm.remove();
        filterActive = false;
        const playersResponse = await response.json();
        const playersTable = document.querySelector("#players-table");
        while (playersTable.rows.length > 1) {
            playersTable.deleteRow(1);
        }
        playersResponse.forEach(player => {
            displayPlayer(player, playersTable);
        });
    });
}

//
getTeams();
getPlayers();
const teamsButton = document.querySelector(".teams-button");
const playersButton = document.querySelector(".players-button");
const addTeamsButton = document.querySelector(".add-teams-button");
const addPlayersButton = document.querySelector(".add-players-button");
const filterTeamsButton = document.querySelector(".filter-teams-button");
const filterPlayersButton = document.querySelector(".filter-players-button");
addTeamsButton.addEventListener("click", addTeam);
addPlayersButton.addEventListener("click", addPlayer);
teamsButton.addEventListener("click", toggleTeams);
playersButton.addEventListener("click", togglePlayers);
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
filterPlayersButton.addEventListener("click", () => {
    filterActive = !filterActive;
    if (filterActive) {
        filterPlayers();
    } else {
        const filterForm = document.querySelector(".filter-form");
        if (filterForm) {
            filterForm.remove();
        }
    }
});