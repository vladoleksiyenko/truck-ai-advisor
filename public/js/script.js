async function sendMessage() {
  const input = document.getElementById("user-input").value;
  const responseBox = document.getElementById("response");
  responseBox.innerText = "Thinking...";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });

  const data = await res.json();
  responseBox.innerText = data.reply;
}

document.addEventListener("DOMContentLoaded", () => {
  const examples = document.querySelectorAll(".quick-example");
  examples.forEach(el => {
    el.addEventListener("click", () => {
      const exampleText = el.getAttribute("data-message");
      document.getElementById("user-input").value = exampleText;
      document.getElementById("char-count").innerText = `${exampleText.length}/1000`;
      sendMessage(exampleText);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleThemeButton = document.getElementById("toggle-theme");
  const body = document.body;

  // Check localStorage for theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
      body.setAttribute("data-bs-theme", savedTheme);
      updateButtonText(savedTheme);
  }

  // Toggle theme on button click
  toggleThemeButton.addEventListener("click", function () {
      const currentTheme = body.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      body.setAttribute("data-bs-theme", newTheme);

      // Save preference in localStorage
      localStorage.setItem("theme", newTheme);

      // Update button text/icon
      updateButtonText(newTheme);
  });

  function updateButtonText(theme) {
      if (theme === "dark") {
          toggleThemeButton.innerHTML = '<i class="fas fa-sun"></i> Toggle Light Mode';
      } else {
          toggleThemeButton.innerHTML = '<i class="fas fa-moon"></i> Toggle Dark Mode';
      }
  }
});

async function generatePreTrip() {
  const state = document.getElementById("state-select").value;
  const resultBox = document.getElementById("pretrip-result");

  if (!state) {
    resultBox.innerHTML = `<span class="text-danger">Please select a state.</span>`;
    return;
  }

  resultBox.innerHTML = "Generating checklist...";

  try {
    const res = await fetch("/api/pretrip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state })
    });

    const data = await res.json();

    if (data.checklist) {
      resultBox.innerText = data.checklist;
    } else {
      resultBox.innerHTML = `<span class="text-danger">Failed to retrieve checklist.</span>`;
    }
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = `<span class="text-danger">Something went wrong.</span>`;
  }
}
