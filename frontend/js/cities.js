const API = "https://world-cup-management.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const cityAction = document.getElementById("cityAction");
  const outputBox = document.getElementById("cityOutput");

  cityAction.addEventListener("change", () => {

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
    if (city.stadiums) {
      city.stadiums.forEach(stadium => {
        html += `
          <li style="margin-bottom:10px;">
            <strong>${stadium.name}</strong> — ${city.name}, ${city.country}
          </li>
        `;
      });
    }
  });

  html += "</ul>";

  outputBox.innerHTML = html || "No stadiums found.";
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, country })
    });

    outputBox.innerHTML = "City added successfully.";
  });
}
