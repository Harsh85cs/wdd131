// Switch guide: build switch cards from data, filter them, and save favorites.

const switchData = [
  { name: "Cherry MX Red", type: "linear", force: 45, travel: 4.0, sound: "Quiet", bestFor: "Fast gaming" },
  { name: "Cherry MX Black", type: "linear", force: 60, travel: 4.0, sound: "Quiet", bestFor: "Heavy typists who avoid accidental presses" },
  { name: "Cherry MX Speed Silver", type: "linear", force: 45, travel: 3.4, sound: "Quiet", bestFor: "Competitive gaming" },
  { name: "Cherry MX Silent Red", type: "linear", force: 45, travel: 3.7, sound: "Very quiet", bestFor: "Shared offices and late nights" },
  { name: "Cherry MX Brown", type: "tactile", force: 55, travel: 4.0, sound: "Moderate", bestFor: "Typing and gaming" },
  { name: "Cherry MX Clear", type: "tactile", force: 65, travel: 4.0, sound: "Moderate", bestFor: "Typists who want a stronger bump" },
  { name: "Cherry MX Blue", type: "clicky", force: 60, travel: 4.0, sound: "Loud click", bestFor: "Solo typing" },
  { name: "Cherry MX Green", type: "clicky", force: 80, travel: 4.0, sound: "Loud click", bestFor: "Typists who like a heavy, crisp press" }
];

const listElement = document.querySelector("#switch-list");
const countElement = document.querySelector("#switch-count");
const filterButtons = document.querySelectorAll(".filter-button");

let favorites = JSON.parse(localStorage.getItem("kcl-favorites")) || [];
let activeFilter = "all";

function weightLabel(force) {
  if (force < 50) {
    return "Light";
  } else if (force < 65) {
    return "Medium";
  }
  return "Heavy";
}

function getFilteredSwitches() {
  if (activeFilter === "favorites") {
    return switchData.filter((item) => favorites.includes(item.name));
  }
  if (activeFilter === "all") {
    return switchData;
  }
  return switchData.filter((item) => item.type === activeFilter);
}

function switchCardTemplate(item) {
  const isFavorite = favorites.includes(item.name);
  return `
    <article class="card switch-card">
      <span class="tag">${item.type}</span>
      <h3>${item.name}</h3>
      <dl>
        <dt>Force</dt><dd>${item.force} cN (${weightLabel(item.force)})</dd>
        <dt>Total travel</dt><dd>${item.travel.toFixed(1)} mm</dd>
        <dt>Sound</dt><dd>${item.sound}</dd>
        <dt>Best for</dt><dd>${item.bestFor}</dd>
      </dl>
      <button class="favorite-button" type="button" data-name="${item.name}" aria-pressed="${isFavorite}">
        ${isFavorite ? "★ Saved" : "☆ Save"}
      </button>
    </article>`;
}

function renderSwitches() {
  const results = getFilteredSwitches();

  if (results.length === 0) {
    listElement.innerHTML = `<p>You have not saved any favorites yet. Tap "☆ Save" on a switch to add it here.</p>`;
  } else {
    listElement.innerHTML = results.map(switchCardTemplate).join("");
  }

  const averageForce = results.length
    ? Math.round(results.reduce((total, item) => total + item.force, 0) / results.length)
    : 0;
  countElement.textContent = `Showing ${results.length} of ${switchData.length} switches${results.length ? ` | Average force: ${averageForce} cN` : ""} | Favorites saved: ${favorites.length}`;
}

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter((fav) => fav !== name);
  } else {
    favorites.push(name);
  }
  localStorage.setItem("kcl-favorites", JSON.stringify(favorites));
  renderSwitches();
}

function setFilter(button) {
  activeFilter = button.dataset.filter;
  filterButtons.forEach((btn) => btn.setAttribute("aria-pressed", `${btn === button}`));
  renderSwitches();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button));
});

listElement.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-button");
  if (button) {
    toggleFavorite(button.dataset.name);
  }
});

renderSwitches();
