import { data } from './data.js';

const optionsBox = document.querySelector('.main-box__options'),
      textBox = document.querySelector('.main-box__text');
      
export class PageState {
  constructor() {
    this.currentState = new DefaultState(this);
  }

  change(state) {
    this.currentState = state;
  }
};

export class DefaultState {
  constructor() {
    textBox.textContent = 'The Herbalist is a Choose Your Own Adventure story written by Matthew Walker. Enjoy.';

    const button = document.createElement('button');
    button.className = 'btn btn-play';
    button.textContent = 'Play';
    textBox.appendChild(button);
  }
};

export class Play {
  constructor() {
    textBox.textContent = data[0].body;
    optionsBox.style.display = 'block';

    for (const key in data[0].options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data[0].options[key]}`;
      optionsBox.appendChild(newOption);
    } 
    localStorage.setItem('location', 0);

  }
};

export class GameOver {
  constructor(gameOverMessage) {
    textBox.textContent = `${gameOverMessage}`;

    optionsBox.style.display = 'none';

    const button = document.createElement('button');
    button.className = 'btn btn-play-again';
    button.textContent = 'Play Again';
    textBox.appendChild(button);
  }
};

export class Continue {
  constructor(textId) {

    //* Check if the current location === game over and if yes change state 
    const page = new PageState();
    if (data[textId].gameOver === true) {
      page.change(new GameOver(data[textId].body));
      return;
    } 

    textBox.textContent = `${data[textId].body}`;
    optionsBox.style.display = 'block';

    for (const key in data[textId].options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data[textId].options[key]}`;
      optionsBox.appendChild(newOption);
    } 
  }
};