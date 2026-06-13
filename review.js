// Increment review counter in localStorage
let reviewCount = parseInt(localStorage.getItem("reviewCount")) || 0;
reviewCount += 1;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("reviewCount").textContent = reviewCount;

// Display submitted form data from URL parameters
const params = new URLSearchParams(window.location.search);

const summaryContainer = document.getElementById("reviewSummary");

// Map of param keys to friendly labels
const labels = {
    productName: "Product",
    rating: "Rating",
    installDate: "Installation Date",
    features: "Useful Features",
    writtenReview: "Written Review",
    userName: "Reviewer"
};

// Build summary HTML
let summaryHTML = "";

for (const [key, label] of Object.entries(labels)) {
    let value = params.getAll(key).join(", ");

    if (!value) continue;

    // Format rating as stars
    if (key === "rating") {
        const numStars = parseInt(value);
        value = "★".repeat(numStars) + "☆".repeat(5 - numStars) + ` (${numStars}/5)`;
    }

    summaryHTML += `<p><span class="label">${label}:</span> ${value}</p>`;
}

if (summaryHTML) {
    summaryContainer.innerHTML = summaryHTML;
} else {
    summaryContainer.style.display = "none";
}

// Footer: current year and last modified date
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
