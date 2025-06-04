function showSection(sectionId) {
  document.querySelectorAll(".content-section").forEach(section => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  const target = document.getElementById(sectionId);
  target.style.display = "block";
  setTimeout(() => target.classList.add("active"), 10);
}

// Original quiz data
const quizQuestions = [
  { question: "Who is the main protagonist of Naruto?", options: ["Naruto", "Sasuke", "Sakura"], answer: "Naruto" },
  { question: "Which anime features Titan-human fights?", options: ["Attack on Titan", "One Piece", "Dragon Ball"], answer: "Attack on Titan" },
  { question: "Which character has the Six eyes?", options: ["Hinata", "Gojo", "Vegeta"], answer: "Gojo" },
  { question: "Which anime has Demons that have rankings?", options: ["Demon Slayer", "Demon king Taranny", "DemonDog"], answer: "Demon Slayer" },
  { question: "Who is the main protagonist of Dragon Balls?", options: ["Ichigo", "Takemichi", "Goku"], answer: "Goku" },
  { question: "Who is the King of Curses in JJK?", options: ["Aizen", "Mashle", "Sukuna"], answer: "Sukuna" },
  { question: "Which anime has Humans and Ghouls?", options: ["Naruto", "Bleach", "Tokyo Ghoul"], answer: "Tokyo Ghoul" },
  { question: "Who is the anatgonist of One-Punchman?", options: ["Madara", "Vegeta", "Garaou"], answer: "Garaou" },
];

let currentQuestionIndex = 0;
let score = 0;

function loadNextQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  const result = document.getElementById("quiz-result");
  quizContainer.innerHTML = "";
  result.innerText = "";

  if (currentQuestionIndex < quizQuestions.length) {
    const q = quizQuestions[currentQuestionIndex];
    const qEl = document.createElement("div");
    qEl.innerHTML = `<h3 style="font-size: 24px;">${q.question}</h3>`;

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.className = "quiz-option";
      btn.onclick = () => {
        if (option === q.answer) score++;
        currentQuestionIndex++;
        loadNextQuestion();
      };
      qEl.appendChild(btn);
    });

    quizContainer.appendChild(qEl);
  } else {
    result.innerText = `🎉 You finished! Your Score: ${score}/${quizQuestions.length}`;
  }
}

async function fetchWeather() {
  const location = document.getElementById("location-input").value || "Tokyo";
  const url = `https://wttr.in/${encodeURIComponent(location)}?format=%C+%t+%w`;

  try {
    const response = await fetch(url);
    const data = await response.text();
    document.getElementById("weather-info").innerText = `Weather in ${location}: ${data}`;
  } catch (err) {
    document.getElementById("weather-info").innerText = "Error fetching weather.";
  }
}

async function fetchJoke() {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await response.json();
    const joke = data.type === "single" ? data.joke : `${data.setup} — ${data.delivery}`;
    document.getElementById("joke-content").innerText = joke;
  } catch {
    document.getElementById("joke-content").innerText = "Couldn't fetch a joke.";
  }
}

window.onload = function () {
  loadNextQuestion();
  showSection('quiz');
};
