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
