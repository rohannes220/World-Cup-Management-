const API = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const cityAction = document.getElementById("cityAction");

  cityAction.addEventListener("change", () => {
    const outputBox = document.getElementById("cityOutput");
    outputBox.innerHTML = "";

    if (cityAction.value === "viewCities") {
      renderViewCities();
    }

    if (cityAction.value === "viewStadiums") {
      renderViewStadiums();
    }

    if (cityAction.value === "deleteCity") {
      renderDeleteCity();
    }

    if (cityAction.value === "addCity") {
      renderAddCity();
    }

    if (cityAction.value === "updateStadium") {
      renderUpdateStadium();
    }
  });
});

async function renderViewCities() {
  const outputBox = document.getElementById("cityOutput");

  const res = await fetch(`${API}/api/cities`);
  const cities = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  cities.forEach(city => {
    html += `
      <li style="margin-bottom:10px;">
        <strong>${city.name}</strong> — ${city.country}
      </li>
    `;
  });

  html += "</ul>";
  outputBox.innerHTML = html;
}

async function renderViewStadiums() {
  const outputBox = document.getElementById("cityOutput");

  const res = await fetch(`${API}/api/cities`);
  const cities = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  cities.forEach(city => {
    if (city.stadiums && city.stadiums.length > 0) {
      city.stadiums.forEach(stadium => {
        html += `
          <li style="margin-bottom:10px;">
            <strong>${stadium.name}</strong>
            <br>
            City: ${city.name}
            <br>
            Occupancy: ${stadium.capacity}
          </li>
        `;
      });
    }
  });

  html += "</ul>";

  outputBox.innerHTML = html;
}

async function renderDeleteCity() {
  const outputBox = document.getElementById("cityOutput");

  const res = await fetch(`${API}/api/cities`);
  const cities = await res.json();

  let html = "<ul style='list-style:none;padding-left:0;'>";

  cities.forEach(city => {
    html += `
      <li style="margin-bottom:10px;">
        ${city.name} — ${city.country}
        <button data-id="${city._id}" class="deleteBtn">
          Delete
        </button>
      </li>
    `;
  });

  html += "</ul>";
  outputBox.innerHTML = html;

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");

      await fetch(`${API}/api/cities/${id}`, {
        method: "DELETE"
      });

      renderDeleteCity();
    });
  });
}

function renderAddCity() {
  const outputBox = document.getElementById("cityOutput");

  outputBox.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <input type="text" id="cityNameInput" placeholder="City Name" />
      <input type="text" id="countryInput" placeholder="Country" />
      <button id="addCityBtn">Add City</button>
    </div>
  `;

  document.getElementById("addCityBtn").addEventListener("click", async () => {
    const name = document.getElementById("cityNameInput").value;
    const country = document.getElementById("countryInput").value;

    if (!name || !country) {
      alert("Please fill in both fields.");
      return;
    }

    await fetch(`${API}/api/cities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country })
    });

    outputBox.innerHTML = "City added successfully.";
  });
}

function renderUpdateStadium() {
  const outputBox = document.getElementById("cityOutput");

  outputBox.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <input type="text" id="cityNameInput" placeholder="City Name" />
      <input type="text" id="stadiumInput" placeholder="Stadium Name" />
      <input type="number" id="occupancyInput" placeholder="Occupancy" />
      <button id="updateStadiumBtn">Add Stadium</button>
    </div>
  `;

  document.getElementById("updateStadiumBtn").addEventListener("click", async () => {

    const name = document
      .getElementById("cityNameInput")
      .value
      .toLowerCase();

    const stadium = document.getElementById("stadiumInput").value;
    const occupancy = document.getElementById("occupancyInput").value;

    if (!name || !stadium || !occupancy) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await fetch(
      `${API}/api/cities/name/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stadium, occupancy })
      }
    );

    if (!response.ok) {
      outputBox.innerHTML = "City not found.";
      return;
    }

    outputBox.innerHTML = `
      <div style="padding:10px; border:1px solid #4CAF50; color:#4CAF50;">
        <strong>Success! Operation done.</strong>
      </div>
    `;
  });
}
