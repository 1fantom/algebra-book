document.addEventListener("DOMContentLoaded", () => {
  const levelSelect = document.getElementById("level-select");
  const problemsList = document.getElementById("problems-list");
  const checkBtn = document.getElementById("check-btn");
  const resultDiv = document.getElementById("result");

  let currentProblems = [];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateFraction() {
    const numerator = getRandomInt(1, 9);
    const denominator = getRandomInt(1, 9);
    return `\\frac{${numerator}}{${denominator}}`;
  }

  function generateProblem(level) {
    if (level === "easy") {
      // сумма двух простых дробей
      const frac1 = generateFraction();
      const frac2 = generateFraction();
      const problem = `\\( \\left(${frac1}\\right) + \\left(${frac2}\\right) \\)`;
      // ответ (для примера — просто число 1, можно улучшить)
      const answer = "1";
      return { problem, answer };
    } else if (level === "medium") {
      // сумма дробей с разными знаменателями
      const frac1 = generateFraction();
      const frac2 = generateFraction();
      const problem = `\\( \\frac{${getRandomInt(1,5)}}{${getRandomInt(2,9)}} + \\frac{${getRandomInt(1,5)}}{${getRandomInt(2,9)}} \\)`;
      const answer = "зависит от вычисления";
      return { problem, answer };
    } else {
      // сложные дроби с умножением
      const frac1 = generateFraction();
      const frac2 = generateFraction();
      const problem = `\\( \\left(${frac1}\\right) \\times \\left(${frac2}\\right) \\)`;
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
          <input type="text" class="answer" aria-label="Ответ на пример ${i+1}" />
        </div>`;
      problemsList.appendChild(li);
    }

    // ВАЖНО! Сообщаем MathJax обновить отображение формул
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

      // Простая проверка — только для easy уровня сравниваем с "1"
      if (currentProblems[i].answer === "1") {
        if (userAnswer === "1") {
          correctCount++;
        }
      } else {
        // Для сложных уровней пока просто считаем как не проверенные
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

  // Рендерим задачи при загрузке страницы
  renderProblems();
});
