const tfBank = [
  {q: '«0 в числителе» всегда даёт 0?', a: true},
  {q: '«P/P» равно 0 при P≠0?', a: false},
  {q: 'Можно сокращать дробь на 1?', a: true},
  {q: 'Любую дробь можно умножить на 0/0?', a: false},

  {q: 'Дробь с нулём в знаменателе определена?', a: false},
  {q: 'Сокращение дроби не меняет её значение?', a: true},
  {q: 'Дробь 5/1 равна 5?', a: true},
  {q: 'Дробь 0/5 равна 5?', a: false},
  {q: 'Если числитель больше знаменателя, дробь больше 1?', a: true},
  {q: 'Дробь -3/4 отрицательная?', a: true},

  {q: 'Дробь можно представить в виде десятичной записи?', a: true},
  {q: 'Дробь 1/3 равна 0.333…?', a: true},
  {q: 'Умножение дроби на её обратную даёт 1?', a: true},
  {q: 'Сложение дробей с разными знаменателями нельзя делать?', a: false},
  {q: 'При делении дробей числитель и знаменатель меняются местами?', a: false},
  {q: 'Дробь 2/4 сокращается до 1/2?', a: true},
  {q: 'Дробь 7/7 равна 1?', a: true},
  {q: 'Дробь с отрицательным знаменателем всегда положительна?', a: false},
  {q: 'Дробь можно представить в виде смешанного числа?', a: true},
  {q: 'Произведение двух положительных дробей всегда положительно?', a: true},

  {q: 'Произведение дроби и 0 всегда равно 0?', a: true},
  {q: 'Дробь 0/0 имеет определённое значение?', a: false},
  {q: 'Число 1 можно представить как дробь?', a: true},
  {q: 'Дробь с числителем 0 всегда равна 0?', a: true},
  {q: 'При вычитании дробей знаменатели должны быть одинаковыми?', a: false},
  {q: 'Дробь 3/0 равна бесконечности?', a: false},
  {q: 'Дробь 5/8 больше 1/2?', a: true},
  {q: 'Дробь 1/4 меньше 1/3?', a: true},
  {q: 'Дробь с числителем и знаменателем равными числами равна 1?', a: true},
  {q: 'Дробь 1/1 равна 1?', a: true},

  {q: 'Обратная дробь к 2/3 — это 3/2?', a: true},
  {q: 'Обратная дробь к 0/1 существует?', a: false},
  {q: 'Дробь 2/3 можно сократить?', a: false},
  {q: 'Дробь 6/9 сокращается до 2/3?', a: true},
  {q: 'Сложение дробей всегда увеличивает значение?', a: false},
  {q: 'Любое число можно представить в виде дроби?', a: true},
  {q: 'Дробь с отрицательным числителем отрицательна?', a: true},
  {q: 'При делении дробей числитель первой умножается на знаменатель второй?', a: true},
  {q: 'Если дробь умножить на её числитель, результат всегда равен 1?', a: false},
  {q: 'Произведение дроби и её обратной равно 1?', a: true},

  {q: 'Дробь 10/5 равна 2?', a: true},
  {q: 'Дробь 4/0 определена?', a: false},
  {q: 'При сложении дробей знаменатели складываются?', a: false},
  {q: 'Дробь 7/14 сокращается до 1/2?', a: true},
  {q: 'Дробь с отрицательным числителем всегда положительна?', a: false},
  {q: 'Дробь 0/7 равна 0?', a: true},
  {q: 'Обратная дробь к 5/1 — 1/5?', a: true},
  {q: 'Дробь можно представить в виде десятичной периодической дроби?', a: true},
  {q: 'Дробь 3/5 больше 1/2?', a: true},
  {q: 'Если числитель дроби равен знаменателю, то дробь равна 0?', a: false}
];

let tfIdx = 0;

const qEl = document.getElementById('tf-question');
const fbEl = document.getElementById('tf-feedback');
const btnTrue = document.getElementById('btn-true');
const btnFalse = document.getElementById('btn-false');
const btnNext = document.getElementById('tf-next');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function showTF() {
  const { q } = tfBank[tfIdx];
  qEl.style.opacity = 0;
  setTimeout(() => {
    qEl.textContent = q;
    qEl.style.opacity = 1;
  }, 200);

  fbEl.textContent = '';
  fbEl.className = '';
  btnNext.disabled = true;
  btnTrue.disabled = false;
  btnFalse.disabled = false;
  updateProgress();
}

function updateProgress() {
  progressText.textContent = `Вопрос ${tfIdx + 1} из ${tfBank.length}`;
  const percent = ((tfIdx) / (tfBank.length)) * 100;
  progressBar.style.width = percent + '%';
}

function checkTF(ans) {
  const correct = tfBank[tfIdx].a;
  if (ans === correct) {
    fbEl.textContent = '✔️ Верно!';
    fbEl.className = 'correct';
  } else {
    fbEl.textContent = '❌ Неверно!';
    fbEl.className = 'wrong';
  }
  btnNext.disabled = false;
  btnTrue.disabled = true;
  btnFalse.disabled = true;
}

btnTrue.onclick = () => checkTF(true);
btnFalse.onclick = () => checkTF(false);
btnNext.onclick = () => {
  tfIdx++;
  if (tfIdx >= tfBank.length) {
    tfIdx = 0;
  }
  showTF();
};

showTF();
