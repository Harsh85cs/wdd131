// Guides page: toolkit checklist with progress saved in localStorage.

const toolkit = [
  { id: "puller", name: "Keycap puller", needed: "Keyboard deep clean" },
  { id: "brush", name: "Soft brush", needed: "Every guide" },
  { id: "air", name: "Compressed air or electric duster", needed: "Keyboard and PC cleaning" },
  { id: "cloth", name: "Microfiber cloth", needed: "Every guide" },
  { id: "ipa", name: "Isopropyl alcohol (90% or higher)", needed: "Wiping keycaps and cases" },
  { id: "screwdriver", name: "Phillips screwdriver", needed: "Opening a PC case" },
  { id: "tweezers", name: "Tweezers", needed: "First keyboard build" },
  { id: "switchpuller", name: "Switch puller", needed: "First keyboard build" }
];

const kitList = document.querySelector("#kit-list");
const kitProgress = document.querySelector("#kit-progress");
const kitStatus = document.querySelector("#kit-status");

let owned = JSON.parse(localStorage.getItem("kcl-toolkit")) || [];

function renderChecklist() {
  kitList.innerHTML = toolkit.map((tool) => `
    <li>
      <label>
        <input type="checkbox" value="${tool.id}" ${owned.includes(tool.id) ? "checked" : ""}>
        ${tool.name} <span class="hint">(${tool.needed})</span>
      </label>
    </li>`).join("");
}

function updateProgress() {
  const percent = Math.round((owned.length / toolkit.length) * 100);
  kitProgress.value = percent;

  if (owned.length === toolkit.length) {
    kitStatus.textContent = `Your toolkit is complete! You are ready for every guide.`;
  } else if (owned.length === 0) {
    kitStatus.textContent = `You have 0 of ${toolkit.length} tools. Start with a brush and a microfiber cloth.`;
  } else {
    const missing = toolkit
      .filter((tool) => !owned.includes(tool.id))
      .map((tool) => tool.name);
    kitStatus.textContent = `You have ${owned.length} of ${toolkit.length} tools (${percent}%). Still needed: ${missing.join(", ")}.`;
  }
}

function saveOwned() {
  localStorage.setItem("kcl-toolkit", JSON.stringify(owned));
  updateProgress();
}

kitList.addEventListener("change", (event) => {
  const box = event.target;
  if (box.checked) {
    owned.push(box.value);
  } else {
    owned = owned.filter((id) => id !== box.value);
  }
  saveOwned();
});

document.querySelector("#kit-reset").addEventListener("click", () => {
  owned = [];
  renderChecklist();
  saveOwned();
});

renderChecklist();
updateProgress();
