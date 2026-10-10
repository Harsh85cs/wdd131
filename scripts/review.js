// Read the submitted form data from the URL (method="get")
const params = new URLSearchParams(window.location.search);

// Only count it as a review if the required fields came through
const submitted = params.has("product") && params.has("rating") && params.has("installDate");

// localStorage review counter
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

if (submitted) {
  reviewCount++;
  localStorage.setItem("reviewCount", reviewCount);
}

document.querySelector("#reviewCount").textContent = reviewCount;

// Build the summary
const summary = document.querySelector("#summary");

function addRow(term, detail) {
  const dt = document.createElement("dt");
  dt.textContent = term;
  const dd = document.createElement("dd");
  dd.textContent = detail;
  summary.append(dt, dd);
}

if (submitted) {
  const productId = params.get("product");
  const product = products.find((p) => p.id === productId);
  const rating = Number(params.get("rating"));
  const features = params.getAll("features");

  addRow("Product", product ? product.name : productId);
  addRow("Rating", `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating} of 5)`);
  addRow("Installed", params.get("installDate"));
  addRow("Useful Features", features.length ? features.join(", ") : "None selected");
  addRow("Review", params.get("writtenReview") || "—");
  addRow("Name", params.get("userName") || "Anonymous");
} else {
  addRow("Status", "No review data was received. Please fill out the form.");
}
