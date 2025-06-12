// js/tests.js

// Массив вопросов для теста с вариантами ответов (MCQ)
const mcqBank = [
  { q: 'Что такое алгебраическая дробь?', opts: [
      'Число вида a/b, где a и b — выражения',
      'Произведение двух чисел',
      'Результат сложения'
    ], correct: 0 },
  // ... другие вопросы ...
];

// Массив примеров для вычисления с правильными ответами
const calcExamples = [
  { expr: '1/2 + 1/3', correct: '5/6' },
  { expr: '3/4 - 1/2', correct: '1/4' },
  { expr: '2/3 × 3/5', correct: '2/5' },
  { expr: '4/7 ÷ 2/3', correct: '6/7' },
  { expr: '(x^2 - 1) / (x - 1)', correct: 'x + 1' }
];

// Функция для вывода вопросов с вариантами ответов
function renderMCQ() {
  const container = document.getElementById('test-mcq');
  container.innerHTML = ''; // очистить

  mcqBank.slice(0, 5).forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'question-card';
    div.setAttribute('role', 'group');
    div.setAttribute('aria-labelledby', `q${index}-label`);

    const question = document.createElement('p');
    question.id = `q${index}-label`;
    question.textContent = `${index + 1}. ${item.q}`;
    div.appendChild(question);

    item.opts.forEach((opt, i) => {
      const label = document.createElement('label');
      label.style.display = 'block';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = i;
      input.required = true;
      label.appendChild(input);
      label.appendChild(document.createTextNode(opt));
      div.appendChild(label);
    });

    container.appendChild(div);
  });
}

// Функция для вывода примеров с полями ввода
function renderCalcExamples() {
  const container = document.getElementById('test-calc');
  container.innerHTML = ''; // очистить

  calcExamples.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'example-card';

    const label = document.createElement('label');
    label.setAttribute('for', `calc${index}`);
    label.textContent = `${index + 1}. Вычислите: ${item.expr}`;
    div.appendChild(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `calc${index}`;
    input.name = `calc${index}`;
    input.required = true;
    input.style.marginLeft = '10px';
    div.appendChild(input);

    container.appendChild(div);
  });
}

// Выводим тест и примеры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  renderMCQ();
  renderCalcExamples();
});

// Далее можно добавить логику проверки ответов при submit, если нужно
