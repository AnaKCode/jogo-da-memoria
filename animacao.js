const grid = document.querySelector('.grid');

const figuras = [
    'img1',
    'img2',
    'img3',
    'img4',
    'img5',
    'img6',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disabledCartas = document.querySelectorAll('.disabled-carta');

    if (disabledCartas.length == 12) {

        alert('Você venceu o jogo!');

        clearInterval(this.loop);

    }
}

let primeiraCarta = '';
let segundaCarta = '';

const verificaCarta = () => {
    const primeiraFigura = primeiraCarta.getAttribute('data-figura');
    const segundaFigura = segundaCarta.getAttribute('data-figura');

    if (primeiraFigura == segundaFigura) {

        primeiraCarta.firstChild.classList.add('disabled-carta');
        segundaCarta.firstChild.classList.add('disabled-carta');

        primeiraCarta = '';
        segundaCarta = '';

        checkEndGame();

    } else {

        setTimeout(() => {

            primeiraCarta.classList.remove('revela-carta');
            segundaCarta.classList.remove('revela-carta');

            primeiraCarta = '';
            segundaCarta = '';

        }, 500);

    }
}

const revelaCarta = ({ target }) => {

    if (target.parentNode.className.includes('revela-carta')) {
        return;
    }

    if (primeiraCarta == '') {

        target.parentNode.classList.add('revela-carta');
        primeiraCarta = target.parentNode;

    } else if (segundaCarta == '') {
        target.parentNode.classList.add('revela-carta');
        segundaCarta = target.parentNode;

        verificaCarta();
    }


}

const createCarta = (figura) => {
    const carta = createElement('div', 'carta');
    const frente = createElement('div', 'face frente');
    const verso = createElement('div', 'face verso');

    frente.style.backgroundImage = `url(./Imagens/${figura}.png)`;

    carta.addEventListener('click', revelaCarta);
    carta.setAttribute('data-figura', figura)

    carta.appendChild(frente);
    carta.appendChild(verso);

    return carta;
}

const loadGame = () => {

    const duplicateFiguras = [...figuras, ...figuras];

    const shuffledArray = duplicateFiguras.sort(() => Math.random() - 0.5);


    shuffledArray.forEach((figura) => {

        const carta = createCarta(figura);
        grid.appendChild(carta);

    });
}


window.onload = () => {
    loadGame();
}

