const STORAGE_KEY = "bei-cu-alex:v1";
const feedback = document.querySelector("#vote-feedback");
let canPersist = true;
let votes = { yes: 0, no: 0 };

function parseVotes(raw) {
  try {
    const value = JSON.parse(raw);
    if (
      value &&
      Number.isSafeInteger(value.yes) && value.yes >= 0 &&
      Number.isSafeInteger(value.no) && value.no >= 0 &&
      Number.isSafeInteger(value.yes + value.no) &&
      value.yes + value.no < Number.MAX_SAFE_INTEGER
    ) {
      return { yes: value.yes, no: value.no };
    }
  } catch {
    // Invalid or outdated local data starts a fresh demo.
  }
  return { yes: 0, no: 0 };
}

function readVotes() {
  if (!canPersist) return votes;
  try {
    return parseVotes(localStorage.getItem(STORAGE_KEY));
  } catch {
    canPersist = false;
    return votes;
  }
}

function renderResults(message = "") {
  const total = votes.yes + votes.no;
  const yesPercentage = total ? Math.round((votes.yes / total) * 100) : 0;
  const noPercentage = total ? 100 - yesPercentage : 0;
  for (const [answer, percentage] of [["yes", yesPercentage], ["no", noPercentage]]) {
    const label = document.querySelector(`#${answer}-percentage`);
    label.textContent = `${percentage}%`;
    label.hidden = total === 0;
  }
  const results = total ? `Da: ${yesPercentage}%. Nu: ${noPercentage}%.` : "";
  const persistence = canPersist ? "" : "Salvarea în browser este blocată; voturile se pierd la reîncărcare.";
  feedback.textContent = [message, results, persistence].filter(Boolean).join(" ");
}

document.querySelectorAll("[data-vote]").forEach((button) => {
  button.addEventListener("click", () => {
    votes = readVotes();
    votes[button.dataset.vote] += 1;
    if (canPersist) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
      } catch {
        canPersist = false;
      }
    }
    const answer = button.dataset.vote === "yes" ? "Da" : "Nu";
    renderResults(`Ai votat „${answer}”.`);
  });
});

window.addEventListener("storage", (event) => {
  if (event.key === STORAGE_KEY || event.key === null) {
    votes = readVotes();
    renderResults();
  }
});

votes = readVotes();
renderResults();
