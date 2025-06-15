const pinDots = document.getElementById('pinDots');
const numButtons = document.querySelectorAll('.num-pad button[data-num]');
const clearButton = document.querySelector('.num-pad button.clear');
const loginSection = document.getElementById('login');
const homeSection = document.getElementById('home');
const userDisplay = document.getElementById('userDisplay');

let pin = '';

function updatePinDisplay() {
  pinDots.textContent = pin.length === 0 ? '••••••••' : pin;
}

function entrou() {
  loginSection.classList.remove('active');
  homeSection.classList.add('active');
  userDisplay.textContent = 'Amor';
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
        entrou();
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

function goHome() {
  showSection('home');
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