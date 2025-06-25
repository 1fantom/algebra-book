document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("level-select");
  const problemsList = document.getElementById("problems-list");
  const checkBtn = document.getElementById("check-btn");
  const resultDiv = document.getElementById("result");

  let currentProblems = [];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateFraction(allowNegative = false) {
    const numerator = getRandomInt(1, 9) * (allowNegative && Math.random() < 0.5 ? -1 : 1);
    const denominator = getRandomInt(1, 9);
    return `\\frac{${numerator}}{${denominator}}`;
  }

  function generateProblem(level) {
    if (level === "easy") {
      const frac1 = generateFraction();
      const frac2 = generateFraction();
      const problem = `\\( ${frac1} + ${frac2} \\)`;
      const answer = "зависит от вычисления";
      return { problem, answer };

    } else if (level === "medium") {
      const numerator1 = getRandomInt(1, 5);
      const denominator1 = getRandomInt(2, 9);
      const numerator2 = getRandomInt(1, 5);
      const denominator2 = getRandomInt(2, 9);
      const problem = `\\( \\frac{${numerator1}}{${denominator1}} - \\frac{${numerator2}}{${denominator2}} \\)`;
      const answer = "зависит от вычисления";
      return { problem, answer };

    } else {
      const frac1 = generateFraction(true);
      const frac2 = generateFraction(true);
      const frac3 = generateFraction(true);
      const operation1 = Math.random() < 0.5 ? "+" : "-";
      const operation2 = Math.random() < 0.5 ? "×" : "÷";
      const problem = `\\( \\left(${frac1}\\right) ${operation1} \\left(${frac2}\\right) ${operation2} \\left(${frac3}\\right) \\)`;
      const answer = "зависит от вычисления";
      return { problem, answer };
    }
  }

  function renderProblems() {
    const level = levelSelect.value;
    currentProblems = [];
    problemsList.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      const { problem, answer } = generateProblem(level);
      currentProblems.push({ problem, answer });

      const li = document.createElement("li");
      li.innerHTML = `
        <div class="question-card">
          <p>Вычислите: ${problem}</p>
          <input type="text" class="answer" aria-label="Ответ на пример ${i + 1}" />
        </div>`;
      problemsList.appendChild(li);
    }

    if (window.MathJax) {
      MathJax.typesetPromise();
    }
  }

  function checkAnswers() {
    const inputs = problemsList.querySelectorAll(".answer");
    let correctCount = 0;

    inputs.forEach((input, i) => {
      const userAnswer = input.value.trim();
      const correctAnswer = currentProblems[i].answer;

      if (correctAnswer === "1") {
        if (userAnswer === "1") {
          correctCount++;
        }
      }
    });

    resultDiv.textContent = `Правильных ответов: ${correctCount} из ${currentProblems.length}`;
  }

  levelSelect.addEventListener("change", () => {
    renderProblems();
    resultDiv.textContent = "";
  });

  checkBtn.addEventListener("click", () => {
    checkAnswers();
  });

  renderProblems();
});
