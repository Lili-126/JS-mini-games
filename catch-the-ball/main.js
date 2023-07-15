const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const spanTime = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('button__time')) {
        time = parseInt(event.target.getAttribute('data-time'));  // парсит строку и возвращает число
        screens[1].classList.add('up');
        startGame();
    }
});

function startGame() {    //функция запускает игру
    createRandomCircle();
    setInterval(decreaseTime, 1000); // отсчёт времени каждую секунду
    setTime(time);
};

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function createRandomCircle() {        // функция создаёт рандомный шарик
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();  //метод возвращает объект DOMRect с размеррами элемента и его положение относительно области просмотра
    const x = getRandomNumber(0, width - size);  // рандомное положение по оси Х
    const y = getRandomNumber(0, height - size);  // рандомное положение по оси У

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min); // вычисляет случайное число и возвращает его округлённым
};

function setTime(value) {   // создаём таймер времени
    spanTime.innerHTML = `00 : ${value}`;
};

function decreaseTime() {  //запускаем таймер времени
    if (time === 0) {
        finishGame()
    } else {
        let current = --time;
        spanTime.innerHTML = `00 : ${current}`;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }
};

function finishGame() {
    board.innerHTML = `<h2 class ="title">Score: <span class ="primary">${score}</span></h2>`;
    spanTime.parentNode.classList.add('hide');
};








