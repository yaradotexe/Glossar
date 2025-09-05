document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const nextBtn = document.getElementById("nextBtn");
  const showAnswerBtn = document.getElementById("showAnswerBtn");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  const feedbackEl = document.getElementById("feedback");

  let currentItem = null;
  let stats = { total: 0, correct: 0, streak: 0 };

  function startQuiz() {
    document.getElementById("quizCard").classList.remove("hidden");
    loadQuestion();
  }

  function loadQuestion() {
    feedbackEl.textContent = "";
    nextBtn.classList.add("hidden");
    showAnswerBtn.classList.add("hidden");
    choicesEl.innerHTML = "";

    currentItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    questionEl.textContent = currentItem.term;

    let options = [currentItem.definition];
    while (options.length < 4 && options.length < ITEMS.length) {
      let rnd = ITEMS[Math.floor(Math.random() * ITEMS.length)].definition;
      if (!options.includes(rnd)) options.push(rnd);
    }
    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(btn, opt);
      choicesEl.appendChild(btn);
    });
  }

  function checkAnswer(btn, answer) {
    const all = document.querySelectorAll(".choice");
    all.forEach(c => c.disabled = true);

    if (answer === currentItem.definition) {
      btn.classList.add("correct");
      feedbackEl.textContent = "✅ Richtig!";
      stats.correct++;
      stats.streak++;
    } else {
      btn.classList.add("wrong");
      feedbackEl.textContent = "❌ Falsch! Richtige Antwort: " + currentItem.definition;
      stats.streak = 0;
    }

    stats.total++;
    updateStats();
    nextBtn.classList.remove("hidden");
  }

  function updateStats() {
    document.getElementById("statTotal").textContent = stats.total;
    document.getElementById("statCorrect").textContent = stats.correct;
    document.getElementById("statPercent").textContent =
      stats.total ? Math.round((stats.correct / stats.total) * 100) + "%" : "0%";
    document.getElementById("statStreak").textContent = stats.streak;
  }

  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", loadQuestion);
});
