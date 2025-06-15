const pinDots = document.getElementById('pinDots');
const numButtons = document.querySelectorAll('.num-pad button[data-num]');
const clearButton = document.querySelector('.num-pad button.clear');
const loginSection = document.getElementById('login');
const homeSection = document.getElementById('home');
const pinDisplay = document.getElementById('pinDisplay');
const cadeado = document.getElementById('cadeado');

//PLAYER
let index_musica = 0;
let tocando = false;

const audio = document.getElementById('audio');
const titleEl = document.getElementById('nome_musica');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const heart = document.getElementById('heart');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const btnPlayPause = document.getElementById('btn-play-pause');
const btnNext_musica = document.getElementById('btn-next');
const btnPrev_musica = document.getElementById('btn-prev');
const iconPlayPause = document.getElementById('icon-play-pause');

let pin = '';

function updatePinDisplay() {
  pinDots.textContent = pin.length === 0 ? '••••••••' : pin;
}

function entrou() {
  loginSection.classList.remove('active');
  homeSection.classList.add('active');
  userDisplay.textContent = 'Amor';

  setTimeout(() => {
    tocando = true
    atualizarPlayer()
  }, 1000);

}

function sair() {
  loginSection.classList.add('active');
  homeSection.classList.remove('active');
  pin = '';
  updatePinDisplay();
}

numButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (pin.length < 8) {
      pin += button.getAttribute('data-num');
      updatePinDisplay();

      if (pin === '15032024') {
        pinDots.style.color = 'green'
        pinDisplay.style.border = '2px solid green'
        cadeado.style.color = 'green'
        setTimeout(() => {
          entrou();
        }, 600);
      }
    }
  });
});

clearButton.addEventListener('click', () => {
  pin = '';
  updatePinDisplay();
});

function showSection(id) {
  document.querySelectorAll('.container').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function goHome(atual) {
  if (atual === 'q') {
    showSection('home');
    startGame()
  }

  if (atual === 'f' || atual === 'p') {
    showSection('home')
  }
}


const slides = document.querySelectorAll('.polaroid');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let current = 0;
const total = slides.length;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('prev', 'active', 'next', 'hidden');

    if (i === current) {
      slide.classList.add('active');
    } else if (i === (current - 1 + total) % total) {
      slide.classList.add('prev');
    } else if (i === (current + 1) % total) {
      slide.classList.add('next');
    } else {
      slide.classList.add('hidden');
    }
  });
}

btnPrev.addEventListener('click', () => {
  current = (current - 1 + total) % total;
  updateSlides();
});

btnNext.addEventListener('click', () => {
  current = (current + 1) % total;
  updateSlides();
});

updateSlides();

//MEMORIA
const questions = [
  {
    q: 'Onde foi nosso primeiro encontro?',
    options: ['Cinema', 'Parque', 'Shopping', 'The best açaí'],
    resposta: 'The best açaí'
  },
  {
    q: 'Qual é minha comida preferida?',
    options: ['Pizza', 'Sushi', 'Lasanha', 'Nhoque', 'O que for comida kkkkk'],
    resposta: 'O que for comida kkkkk'
  },
  {
    q: 'Onde te pedi em namoro?',
    options: ['Viagem para barramas', 'Na frente do matos', 'Em casa', 'Parque'],
    resposta: 'Na frente do matos'
  },
  {
    q: 'Qual é a data do nosso aniversário?',
    options: ['15/03/2024', '20/04/2023', '25/12/2022', '20/09/2025'],
    resposta: '15/03/2024'
  },
  {
    q: 'Qual foi a frase que eu disse, onde ocasionou nosso primeiro beijo?',
    options: ['Voce e muito bonita', 'Seus olhos são como constelações ', 'As obras de Da Vinci sentiria inveja ao te ver', 'Mais do que voce gosta de mim?'],
    resposta: 'Mais do que voce gosta de mim?'
  }
];

let index = 0;
let hearts = document.querySelectorAll('.heart');
let questionText = document.getElementById('questionText');
let optionsDiv = document.getElementById('options');
let finalMessage = document.getElementById('finalMessage');

function startGame() {
  index = 0;
  hearts.forEach(h => {
    h.classList.remove('is-active');
    void h.offsetWidth;
  });
  finalMessage.style.display = 'none';
  questionContainer.style.display = 'block';
  questionText.style.display = 'block';
  document.getElementById('começar').style.display = 'none'
  stopHeartAnimation()
  showQuestion();
}

function showQuestion() {
  let q = questions[index];
  questionText.textContent = q.q;
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    let btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkResposta(opt);
    optionsDiv.appendChild(btn);
  });
}

function checkResposta(selected) {
  if (selected === questions[index].resposta) {
    const heart = hearts[index];

    // Força o reflow para garantir que a animação reinicie corretamente
    heart.classList.remove('is-active');
    void heart.offsetWidth; // <-- Hack pra reiniciar a animação
    heart.classList.add('is-active');

    // Espera a animação de 1s terminar antes de mostrar a próxima pergunta
    setTimeout(() => {
      index++;
      if (index < questions.length) {
        showQuestion();
      } else {
        questionText.style.display = 'none';
        optionsDiv.innerHTML = '';
        questionContainer.style.display = 'none';
        finalMessage.style.display = 'block';
        startHeartAnimation()
      }
    }, 500); // mesma duração da animação
  } else {
    alert('Hmmm... tenta de novo!');
  }
}

//Coracoes flutuantes
let heartInterval;

function startHeartAnimation() {
  const container = document.querySelector('.bg_heart');
  heartInterval = setInterval(() => {
    const r_num = Math.floor(Math.random() * 40) + 1;
    const r_size = Math.floor(Math.random() * 65) + 10;
    const r_left = Math.floor(Math.random() * 100);
    const r_bg = Math.floor(Math.random() * 25) + 100;
    const r_time = Math.floor(Math.random() * 5) + 5;

    const heart1 = document.createElement('div');
    heart1.className = 'coracao';
    heart1.style.width = `${r_size}px`;
    heart1.style.height = `${r_size}px`;
    heart1.style.left = `${r_left}%`;
    heart1.style.background = `rgba(255, ${r_bg - 25}, ${r_bg}, 1)`;
    heart1.style.animationDuration = `${r_time}s`;

    const heart2 = document.createElement('div');
    heart2.className = 'coracao';
    heart2.style.width = `${r_size - 10}px`;
    heart2.style.height = `${r_size - 10}px`;
    heart2.style.left = `${(r_left + r_num) % 100}%`;
    heart2.style.background = `rgba(255, ${r_bg - 25}, ${r_bg + 25}, 1)`;
    heart2.style.animationDuration = `${r_time + 5}s`;

    container.appendChild(heart1);
    container.appendChild(heart2);

    // Remove corações que já saíram da tela
    [...container.children].forEach(coracao => {
      const top = parseFloat(window.getComputedStyle(coracao).top);
      const width = parseFloat(window.getComputedStyle(coracao).width);
      if (top < -100 || width > 150) {
        container.removeChild(coracao);
      }
    });
  }, 500);
}

function stopHeartAnimation() {
  clearInterval(heartInterval);
  const container = document.querySelector('.bg_heart');
  container.innerHTML = '';
}

//PLAYER MUSICA
const musicas = [
  {
    cover: 'assest/home.jpg',
    title: 'Home',
    artist: 'Edith Whiskers',
    src: 'musicas/Home.mp3'
  },
  {
    cover: 'assest/league.jpg',
    title: 'Out of My League',
    artist: 'Fitz and The Tantrums',
    src: 'musicas/League.mp3'
  },
  {
    cover: 'assest/FoundYou.jpg',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    src: 'musicas/FoundYou.mp3'
  },
  {
    cover: 'assest/yellow.jpg',
    title: 'Yellow',
    artist: 'Coldplay',
    src: 'musicas/Yellow.mp3'
  }
];

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

function atualizarPlayer() {
  const m = musicas[index_musica];
  console.log('m', m.title)
  titleEl.textContent = m.title;
  artistEl.textContent = m.artist;
  coverEl.src = m.cover;
  audio.src = m.src;

  audio.load(); // Garante que vai aplicar as configs novas

  audio.volume = 0.3;

  if (tocando) {
    audio.play();
    iconPlayPause.className = 'fa-solid fa-pause';
  } else {
    audio.pause();
    iconPlayPause.className = 'fa-solid fa-play';
  }
}

btnPlayPause.addEventListener('click', () => {
  tocando = !tocando;
  atualizarPlayer();
});

btnNext_musica.addEventListener('click', () => {
  index_musica = (index_musica + 1) % musicas.length;
  tocando = true;
  atualizarPlayer();
});

btnPrev_musica.addEventListener('click', () => {
  index_musica = (index_musica - 1 + musicas.length) % musicas.length;
  tocando = true;
  atualizarPlayer();
});

audio.addEventListener('timeupdate', () => {
  const current = audio.currentTime;
  const total = audio.duration;
  progress.value = (current / total) * 100 || 0;
  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(total);
});

progress.addEventListener('input', () => {
  const newTime = (progress.value / 100) * audio.duration;
  audio.currentTime = newTime;
});

audio.addEventListener('ended', () => {
  index_musica = (index_musica + 1) % musicas.length;
  atualizarPlayer();
});

heart.addEventListener('click', () => {
  heart.style.color = heart.style.color === 'white' ? '#1DB954' : 'white';
});

atualizarPlayer();