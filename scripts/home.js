// Home page: visit tracker and rotating maintenance tips.

const tips = [
  "Wash your hands before long gaming or typing sessions. Less oil on your fingers means shinier keycaps take longer to appear.",
  "Keep food and drinks away from your keyboard. A single spilled soda can make switches sticky.",
  "Check your PC's dust filters once a month. Clean filters are the easiest way to keep the inside of the case clean.",
  "Hold fans still with a finger when using compressed air so they do not spin too fast and get damaged.",
  "Use a keycap puller instead of a screwdriver. Prying keycaps off can crack the stems.",
  "Let washed keycaps dry completely before reinstalling them. Trapped water can damage the switches.",
  "Store spare switches and keycaps in a sealed bag so they do not collect dust."
];

let currentTip = -1;

function showRandomTip() {
  let next = Math.floor(Math.random() * tips.length);
  if (next === currentTip) {
    next = (next + 1) % tips.length;
  }
  currentTip = next;
  document.querySelector("#tip-text").textContent = `Tip ${currentTip + 1} of ${tips.length}: ${tips[currentTip]}`;
}

function trackVisits() {
  const message = document.querySelector("#visit-message");
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem("kcl-last-visit"));
  const visits = Number(localStorage.getItem("kcl-visits")) + 1;

  if (!lastVisit) {
    message.textContent = `Welcome! This is your first visit. Start with the switch guide if you are shopping for a keyboard, or the maintenance guides if your gear needs some care.`;
  } else {
    const days = Math.floor((now - lastVisit) / 86400000);
    if (days < 1) {
      message.textContent = `Welcome back! This is visit number ${visits}. You were here earlier today.`;
    } else if (days < 90) {
      message.textContent = `Welcome back! This is visit number ${visits}. Your last visit was ${days} ${days === 1 ? "day" : "days"} ago.`;
    } else {
      message.textContent = `Welcome back after ${days} days! It may be time to dust out your PC again.`;
    }
  }

  localStorage.setItem("kcl-visits", `${visits}`);
  localStorage.setItem("kcl-last-visit", `${now}`);
}

document.querySelector("#next-tip").addEventListener("click", showRandomTip);
showRandomTip();
trackVisits();
