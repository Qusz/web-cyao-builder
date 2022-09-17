import { data } from './data.js';

const optionsBox = document.querySelector('.main-box__options'),
      textBox = document.querySelector('.main-box__text');
      
export class PageState {
  constructor() {
    this.currentState = new DefaultState();
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

export class NewGame {
  constructor() {
    //* New game always starts at index 0
    textBox.textContent = data[0].body;
    optionsBox.style.display = 'block';

    for (const key in data[0].options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data[0].options[key]}`;
      optionsBox.appendChild(newOption);
    } 
    localStorage.setItem('index', 0);

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
  constructor(index) {

    //* Check if the current (location === game over) and if yes, change state 
    const page = new PageState();
    if (data[index].gameOver === true) {
      page.change(new GameOver(data[index].body));
      return;
    } 

    textBox.textContent = `${data[index].body}`;
    optionsBox.style.display = 'block';

    for (const key in data[index].options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data[index].options[key]}`;
      optionsBox.appendChild(newOption);
    } 
  }
};

function addPlayAgainButton() {

}