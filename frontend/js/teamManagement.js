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

function editRow(document, row) {

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
            const existingEditForm = document.querySelector(".edit-form");
            if (existingEditForm) {
                existingEditForm.remove();
            }
            // const teamId = row.getAttribute("data-team-id");
            const submitFunction = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedTeamData = {};
                formData.forEach((value, key) => {
                    updatedTeamData[key] = value;
                });
                await fetch(`${API_URL}/api/teams/${teamId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"                    },
                    body: JSON.stringify(updatedTeamData)
                });
                editForm.remove();
                editingTeam = false;
                getTeams();
            };
            const editForm = createForm(document, [
                { type: "text", placeholder: "Country Name", name: "country" },
                { type: "text", placeholder: "Country Code (e.g. US)", name: "countryCode" }, 
                { type: "text", placeholder: "Group (e.g. A)", name: "group" },
                { type: "text", placeholder: "Formation (e.g. 4-3-3)", name: "formation" }
                ], 
                "Submit", submitFunction);
            editForm.classList.add("edit-form");
            const options = document.querySelector(".teams-options");
            options.after(editForm);


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
            // const playerName = row.querySelector("td:nth-child(4)").textContent;
            const existingEditForm = document.querySelector(".edit-form");
            if (existingEditForm) {
                existingEditForm.remove();
            }
            const playerName = row.querySelector("td:nth-child(1)").textContent;
            // Implement edit functionality here
            const submitFunction = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedPlayerData = {};
                formData.forEach((value, key) => {
                    updatedPlayerData[key] = value;
                });
                await fetch(`${API_URL}/api/players/${playerName}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"                    },
                    body: JSON.stringify(updatedPlayerData)
                });
                editForm.remove();
                editingPlayer = false;
                getPlayers();
            };
            const editForm = createForm(document, [ 
                { type: "text", placeholder: "Position", name: "position" },
                { type: "text", placeholder: "Country", name: "country" },
                { type: "text", placeholder: "Country Code (e.g. US)", name: "countryCode" },
                { type: "number", placeholder: "Wins", name: "wins" },
                { type: "number", placeholder: "Losses", name: "losses" },
                { type: "number", placeholder: "Goals", name: "goals" },
                { type: "number", placeholder: "Assists", name: "assists" },
                { type: "number", placeholder: "Games Played", name: "gamesPlayed" },
                { type: "number", placeholder: "Yellow Cards", name: "yellowCards" },
                { type: "number", placeholder: "Red Cards", name: "redCards" }
                ], "Submit", submitFunction);
            editForm.classList.add("edit-form");
            const options = document.querySelector(".players-options");
            options.after(editForm);
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
    const teamForm = createForm(document, [
        { type: "text", placeholder: "Country Name", name: "country" },
        { type: "text", placeholder: "Country Code (e.g. US)", name: "countryCode" }, 
        { type: "text", placeholder: "Group (e.g. A)", name: "group" },
        { type: "text", placeholder: "Formation (e.g. 4-3-3)", name: "formation" }
        ], 
        "Submit", submitFunction);
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
    const submitFunction = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPlayerData = {};
        formData.forEach((value, key) => {
            newPlayerData[key] = value;
        });
        await fetch(`${API_URL}/api/players`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"            },
            body: JSON.stringify(newPlayerData)
        });
        playerForm.remove();
        getPlayers();
    }
    const playerForm = createForm(document, [ 
        { type: "text", placeholder: "Player Name", name: "name" },
        { type: "text", placeholder: "Position", name: "position" },
        { type: "text", placeholder: "Country", name: "country" },
        { type: "text", placeholder: "Country Code (e.g. US)", name: "countryCode" },
        { type: "number", placeholder: "Wins", name: "wins" },
        { type: "number", placeholder: "Losses", name: "losses" },
        { type: "number", placeholder: "Goals", name: "goals" },
        { type: "number", placeholder: "Assists", name: "assists" },
        { type: "number", placeholder: "Games Played", name: "gamesPlayed" },
        { type: "number", placeholder: "Yellow Cards", name: "yellowCards" },
        { type: "number", placeholder: "Red Cards", name: "redCards" }
        ], 
        "Submit", submitFunction);
    playerForm.classList.add("player-form");
    const options = document.querySelector(".players-options");
    options.after(playerForm);
}

function filterTeams() {
    const submitFunction = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        currentFilter = {};
        formData.forEach((value, key) => {
            currentFilter[key] = value;
        });
        const response = await fetch(`${API_URL}/api/teams?group=${currentFilter.group}&country=${currentFilter.country}`, {
            method: "GET"
        });
        filterForm.remove();
        filterActive = false;
        const teamsResponse = await response.json();
        const teamsTable = document.querySelector("#teams-table");
        while (teamsTable.rows.length > 1) {
            teamsTable.deleteRow(1);
        }
        teamsResponse.forEach(team => {
            displayTeam(team, teamsTable);
        });
    };
    const filterForm = createForm(document, [
        { type: "text", placeholder: "Group", name: "group" },
        { type: "text", placeholder: "Country", name: "country" }
        ], 
        "Apply Filter", submitFunction);
    filterForm.classList.add("filter-form");
    const options = document.querySelector(".teams-options");
    options.after(filterForm);
}

function filterPlayers() {
    const submitFunction = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        currentFilter = {};
        formData.forEach((value, key) => {
            currentFilter[key] = value;
        });
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
    };
    const filterForm = createForm(document, [
        { type: "text", placeholder: "Position", name: "position" },
        { type: "text", placeholder: "Country", name: "country" },
        { type: "number", placeholder: "Wins", name: "wins" }
        ], 
        "Apply Filter", submitFunction);
    filterForm.classList.add("filter-form");
    const options = document.querySelector(".players-options");
    options.after(filterForm);
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
filterTeamsButton.addEventListener("click", () => {
    filterActive = !filterActive;
    if (filterActive) {
        filterTeams();
    } else {
        const filterForm = document.querySelector(".filter-form");
        if (filterForm) {
            filterForm.remove();
        }
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