/* ============================================
   main.js — KeyStart Website
   WDD 131 Final Project

   Covers rubric JS requirements:
   - More than one function
   - DOM interaction (select, modify, event listening)
   - Conditional branching
   - Objects, arrays, and array methods
   - Template literals exclusively for string output
   - localStorage
   ============================================ */

/* -------------------------------------------------
   DATA — array of objects (switches / keyboards)
   ------------------------------------------------- */
const switches = [
  {
    name: "Cherry MX Red",
    type: "linear",
    force: "45g",
    feel: "Smooth, no bump. Popular for gaming.",
    sound: "quiet"
  },
  {
    name: "Gateron Brown",
    type: "tactile",
    force: "55g",
    feel: "Light bump you can feel while typing.",
    sound: "quiet"
  },
  {
    name: "Kailh Box White",
    type: "clicky",
    force: "50g",
    feel: "Sharp tactile bump with an audible click.",
    sound: "loud"
  },
  {
    name: "Gateron Yellow",
    type: "linear",
    force: "50g",
    feel: "Budget-friendly smooth linear, great value.",
    sound: "quiet"
  },
  {
    name: "Boba U4T",
    type: "tactile",
    force: "62g",
    feel: "Strong, snappy bump loved by typists.",
    sound: "medium"
  },
  {
    name: "Cherry MX Blue",
    type: "clicky",
    force: "50g",
    feel: "The classic clicky switch with a loud click.",
    sound: "loud"
  }
];

const keyboards = [
  { name: "Royal Kludge RK61", price: 45, useCase: "gaming", size: "60%", hotswap: true },
  { name: "Keychron K2", price: 79, useCase: "typing", size: "75%", hotswap: true },
  { name: "Akko 3068B", price: 65, useCase: "typing", size: "65%", hotswap: true },
  { name: "GMMK 2", price: 80, useCase: "gaming", size: "65%", hotswap: true }
];

/* -------------------------------------------------
   FUNCTION 1 — mobile navigation toggle
   DOM: select element + event listener + modify class
   ------------------------------------------------- */
function setupMenu() {
  const button = document.querySelector("#menu-button");
  const navLinks = document.querySelector("#nav-links");

  if (!button || !navLinks) return; // conditional branching guard

  button.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

/* -------------------------------------------------
   FUNCTION 2 — build a switch card (template literals)
   ------------------------------------------------- */
function switchCardHTML(sw) {
  return `
    <div class="card">
      <h3>${sw.name}</h3>
      <div class="switch-meta">
        <span class="chip type">${sw.type}</span>
        <span class="chip">${sw.force}</span>
        <span class="chip">${sw.sound}</span>
      </div>
      <p>${sw.feel}</p>
    </div>`;
}

/* -------------------------------------------------
   FUNCTION 3 — render switches, optionally filtered
   array methods: filter + map + join
   ------------------------------------------------- */
function renderSwitches(filterType) {
  const container = document.querySelector("#switch-grid");
  if (!container) return;

  let list = switches;
  if (filterType && filterType !== "all") {
    list = switches.filter((sw) => sw.type === filterType);
  }

  container.innerHTML = list.map(switchCardHTML).join("");
}

/* -------------------------------------------------
   FUNCTION 4 — wire up the filter buttons
   ------------------------------------------------- */
function setupFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderSwitches(btn.dataset.type);
    });
  });

  renderSwitches("all");
}

/* -------------------------------------------------
   FUNCTION 5 — recommender quiz
   conditional branching + array find + template literal
   ------------------------------------------------- */
function setupQuiz() {
  const form = document.querySelector("#quiz");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const budget = Number(document.querySelector("#budget").value);
    const use = document.querySelector("#use-case").value;
    const result = document.querySelector("#quiz-result");

    // filter by use case and budget, then pick the best value
    const matches = keyboards
      .filter((kb) => kb.useCase === use && kb.price <= budget)
      .sort((a, b) => b.price - a.price);

    let message;
    if (matches.length > 0) {
      const pick = matches[0];
      message = `
        <h3>Try the ${pick.name}</h3>
        <p>A ${pick.size} board built for ${pick.useCase}, around $${pick.price}.
        ${pick.hotswap ? "It's hotswap, so you can change switches with no soldering." : ""}</p>
        <button class="save-btn" id="save-pick" data-name="${pick.name}">★ Save to favorites</button>`;
    } else {
      message = `
        <h3>No match in that budget</h3>
        <p>Try raising your budget a little — solid ${use} boards usually start around $45.</p>`;
    }

    result.innerHTML = message;
    result.classList.add("show");

    // attach save handler if a pick was shown
    const saveBtn = document.querySelector("#save-pick");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        addFavorite(saveBtn.dataset.name);
      });
    }
  });
}

/* -------------------------------------------------
   FUNCTIONS 6-8 — favorites with localStorage
   ------------------------------------------------- */
function getFavorites() {
  const stored = localStorage.getItem("keystart-favorites");
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favorites) {
  localStorage.setItem("keystart-favorites", JSON.stringify(favorites));
}

function addFavorite(name) {
  const favorites = getFavorites();
  if (!favorites.includes(name)) {
    favorites.push(name);
    saveFavorites(favorites);
    renderFavorites();
  }
}

function removeFavorite(name) {
  let favorites = getFavorites();
  favorites = favorites.filter((item) => item !== name);
  saveFavorites(favorites);
  renderFavorites();
}

function renderFavorites() {
  const list = document.querySelector("#fav-list");
  if (!list) return;

  const favorites = getFavorites();

  if (favorites.length === 0) {
    list.innerHTML = `<li>No saved keyboards yet. Use the recommender to add one.</li>`;
    return;
  }

  list.innerHTML = favorites
    .map(
      (name) => `
      <li>
        <span>${name}</span>
        <button class="remove-btn" data-name="${name}" aria-label="Remove ${name}">×</button>
      </li>`
    )
    .join("");

  // wire up remove buttons
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => removeFavorite(btn.dataset.name));
  });
}

/* -------------------------------------------------
   FUNCTION 9 — footer year + last modified
   ------------------------------------------------- */
function setupFooter() {
  const yearEl = document.querySelector("#year");
  const modEl = document.querySelector("#last-modified");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  if (modEl) {
    modEl.textContent = `Last modified: ${document.lastModified}`;
  }
}

/* -------------------------------------------------
   INIT — run on every page; guards skip what's absent
   ------------------------------------------------- */
setupMenu();
setupFilters();
setupQuiz();
renderFavorites();
setupFooter();
