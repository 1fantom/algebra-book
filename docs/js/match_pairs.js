const allPairs = [];

// Генерируем пары (как раньше)
for (let b = -20; b <= 20; b++) {
  for (let c = -20; c <= 20; c++) {
    const D = b*b - 4*c;
    if (D < 0) continue;
    const sqrtD = Math.sqrt(D);
    if (sqrtD % 1 !== 0) continue;
    const r1 = Math.round((-b + sqrtD) / 2);
    const r2 = Math.round((-b - sqrtD) / 2);
    if (r1 * r2 !== c) continue;
    if (r1 + r2 !== -b) continue;
    const left = `x²${b >= 0 ? '+' + b : b}x${c >= 0 ? '+' + c : c}`;
    const right = `(x${r1 >= 0 ? '-' + r1 : '+' + (-r1)})(x${r2 >= 0 ? '-' + r2 : '+' + (-r2)})`;
    allPairs.push({left, right});
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const pairs = shuffle(allPairs).slice(0, 5);

let dragsrc = null;
const leftCol = document.getElementById('left'),
      rightCol = document.getElementById('right'),
      fb = document.getElementById('mp-feedback');

leftCol.innerHTML = '';
rightCol.innerHTML = '';
fb.textContent = '';

// Создаем элементы левой колонки
pairs.forEach(p => {
  const d = document.createElement('div');
  d.textContent = p.left;
  d.className = 'item';
  d.draggable = true;
  d.ondragstart = () => { dragsrc = p.left; };
  leftCol.appendChild(d);
});

// Создаем элементы правой колонки
pairs.forEach(p => {
  const d = document.createElement('div');
  d.textContent = p.right;
  d.className = 'item';
  d.ondragover = e => e.preventDefault();

  // При дропе — объединяем, заменяя текст на "правое ⇒ левое"
  d.ondrop = () => {
    if (d.textContent.includes(' ⇒ ')) {
      // Уже объединён — игнорируем дроп
      return;
    }
    d.textContent = p.right + ` ⇒ ${dragsrc}`;
    d.classList.remove('correct', 'wrong'); // Сброс цвета
  };

  // Клик по уже объединённому элементу — разъединяем
  d.onclick = () => {
    if (d.textContent.includes(' ⇒ ')) {
      d.textContent = p.right;
      d.classList.remove('correct', 'wrong');
    }
  };

  rightCol.appendChild(d);
});

// Кнопка проверки
document.getElementById('mp-check').onclick = () => {
  let allCorrect = true;
  Array.from(rightCol.children).forEach(div => {
    if (!div.textContent.includes(' ⇒ ')) {
      // Нет соединения — сразу считаем ошибкой
      div.classList.add('wrong');
      div.classList.remove('correct');
      allCorrect = false;
      return;
    }
    const [r, l] = div.textContent.split(' ⇒ ');
    const correct = pairs.find(p => p.left === l && p.right === r);
    if (correct) {
      div.classList.add('correct');
      div.classList.remove('wrong');
    } else {
      div.classList.add('wrong');
      div.classList.remove('correct');
      allCorrect = false;
    }
  });
  fb.textContent = allCorrect ? '✔️ Верно!' : '❌ Есть ошибки. Проверьте красные пары.';
};

// Кнопка сброса соединений (создай кнопку с id="mp-reset" в HTML)
document.getElementById('mp-reset').onclick = () => {
  Array.from(rightCol.children).forEach(div => {
    // Сбросим текст к исходному виду без объединений
    const pair = pairs.find(p => div.textContent.startsWith(p.right));
    if (pair) div.textContent = pair.right;
    div.classList.remove('correct', 'wrong');
  });
  fb.textContent = '';
  dragsrc = null;
};
