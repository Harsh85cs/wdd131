// Thank-you page: show submitted form data and count submissions.

const params = new URLSearchParams(window.location.search);

const fields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "reason", label: "Reason" },
  { key: "layout", label: "Keyboard layout" },
  { key: "switches", label: "Switch types" },
  { key: "message", label: "Message" }
];

function displaySummary() {
  const summary = document.querySelector("#summary");
  summary.innerHTML = fields.map((field) => {
    const values = params.getAll(field.key).filter((value) => value.trim() !== "");
    const shown = values.length ? values.join(", ") : "Not provided";
    return `<dt>${field.label}</dt><dd>${escapeHtml(shown)}</dd>`;
  }).join("");
}

function escapeHtml(text) {
  const holder = document.createElement("span");
  holder.textContent = text;
  return holder.innerHTML;
}

function updateCount() {
  const name = params.get("name");
  const count = Number(localStorage.getItem("kcl-submissions")) + (name ? 1 : 0);

  if (name) {
    localStorage.setItem("kcl-submissions", `${count}`);
    document.querySelector("#thanks-message").textContent = `Thank you, ${name}! Your submission has been received.`;
  }

  document.querySelector("#submission-count").textContent =
    count === 1 ? `This is your first submission.` : `You have sent ${count} submissions from this device.`;
}

displaySummary();
updateCount();
