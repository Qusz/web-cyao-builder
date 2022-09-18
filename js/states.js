import data from '../data.json' assert {type: 'json'};
import { showButton } from './utilities.js';

const optionsBox = document.querySelector('.main-box__options'),
      textBox = document.querySelector('.main-box__text'),
      container = document.querySelector('.container'),
      test = document.querySelector('.option'),
      playAgainButton = document.querySelector('.btn-start-over');

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
    showButton('btn btn-new-game', 'New Game', '4rem auto 0 auto', textBox);
  }
};

export class Play {
  constructor(index) {





    //* Check local storage for saved progress
    if (localStorage.length === 0) {

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

    } else {
      
      //* Check if the current location is "game over"
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

    console.log(test);
    showButton('modal-trigger btn btn-start-over', 'Start a New Game', '3rem auto 0 auto', container);
  }
};

export class GameOver {
  constructor(gameOverMessage) {
    textBox.textContent = `${gameOverMessage}`;
    optionsBox.style.display = 'none';
  }
};

export class WelcomeBack {
  constructor() {
    textBox.textContent = 'Welcome back! Would you like to continue your previous game or start a new one?';
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList = 'd-flex btn-wrapper';
    buttonWrapper.style.justifyContent = 'center';
    buttonWrapper.style.gap = '1.5rem';
    buttonWrapper.style.marginTop = '2rem';
    textBox.appendChild(buttonWrapper);
    showButton('btn btn-new-game', 'New Game', 'none', buttonWrapper);
    showButton('btn btn-play', 'Continue', 'none', buttonWrapper);
  }
};