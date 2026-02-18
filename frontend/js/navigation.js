const welcomeSection = document.getElementById("welcomeSection");
const infraSection = document.getElementById("infrastructureSection");

document.getElementById("navWelcome").addEventListener("click", () => {
  welcomeSection.style.display = "block";
  infraSection.style.display = "none";
});

document.getElementById("navInfrastructure").addEventListener("click", () => {
  welcomeSection.style.display = "none";
  infraSection.style.display = "block";
});
