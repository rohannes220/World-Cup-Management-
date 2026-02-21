export function displayTeam(team, parent) {
    const teamRow = document.createElement("tr");
    teamRow.classList.add("team-row");

    const country = document.createElement("td");
    country.classList.add("country-cell");
    const countryName = document.createElement("span");
    countryName.classList.add("country-name");
    countryName.textContent = team.country;
    
    const flagImg = document.createElement("img");
    flagImg.src = `https://flagcdn.com/w320/${team.countryCode.toLowerCase()}.png`;
    flagImg.alt = `${team.country} Flag`;
    flagImg.classList.add("flag-img");
    country.appendChild(flagImg);
    country.appendChild(countryName);
    
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
    parent.appendChild(teamRow);

    team.starting11.forEach(player => {
        const playerRow = document.createElement("tr");
        playersHolder.classList.add("hidden");
        const playerName = document.createElement("td");
        playerName.textContent = `${player.name}`;
        const playerPosition = document.createElement("td");
        playerPosition.textContent = `${player.position}`;
        playerRow.appendChild(playerName);
        playerRow.appendChild(playerPosition);
        playersHolder.appendChild(playerRow);            
    });
}

export function displayPlayer(player, parent) {
    const playerRow = document.createElement("tr");
    playerRow.classList.add("players-row");
    const playerName = document.createElement("td");
    playerName.classList.add("left");
    playerName.textContent = `${player.name}`;
    const playerPosition = document.createElement("td");
    playerPosition.classList.add("left");
    playerPosition.textContent = `${player.position}`;
    const country = document.createElement("td");
    country.classList.add("country-cell");
    const countryName = document.createElement("span");
    countryName.classList.add("country-name");
    countryName.textContent = player.country;
    const flagImg = document.createElement("img");
    flagImg.src = `https://flagcdn.com/w320/${player.countryCode.toLowerCase()}.png`;
    flagImg.alt = `${player.country} Flag`;
    flagImg.classList.add("flag-img");
    country.appendChild(flagImg);
    country.appendChild(countryName);
    const playerWins = document.createElement("td");
    playerWins.textContent = `${player.wins}`;
    const playerLosses = document.createElement("td");
    playerLosses.textContent = `${player.losses}`;
    const playerGoals = document.createElement("td");
    playerGoals.textContent = `${player.goals}`;
    const playerAssists = document.createElement("td");
    playerAssists.textContent = `${player.assists}`;
    const playerYellowCards = document.createElement("td");
    playerYellowCards.textContent = `${player.yellowCards}`;
    const playerRedCards = document.createElement("td");
    playerRedCards.textContent = `${player.redCards}`;
    playerRow.appendChild(playerName);
    playerRow.appendChild(country);
    playerRow.appendChild(playerPosition);
    
    playerRow.appendChild(playerWins);
    playerRow.appendChild(playerLosses);
    playerRow.appendChild(playerGoals);
    playerRow.appendChild(playerAssists);
    playerRow.appendChild(playerYellowCards);
    playerRow.appendChild(playerRedCards);

    parent.appendChild(playerRow);
}

export function createForm(document, fields, submitText, onSubmit) {
    const form = document.createElement("form");
    form.classList.add("input-form");
    fields.forEach(field => {
        const label = document.createElement("label");
        label.textContent = field.label;
        const input = document.createElement("input");
        input.name = field.name;
        input.type = field.type || "text";
        input.placeholder = field.placeholder || "";
        label.appendChild(input);
        form.appendChild(label);
    });
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = submitText;
    form.appendChild(submitButton);
    form.addEventListener("submit", onSubmit);
    return form;
}