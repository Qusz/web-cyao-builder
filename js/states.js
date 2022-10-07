import { data } from './data.js';
import { showButton, renderOptions } from './utilities.js';

const optionsBox = document.querySelector('.main-box-options'),
      textBox = document.querySelector('.main-box-text'),
      container = document.querySelector('.container');

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
    textBox.textContent = 'Game preface. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.';
    showButton('btn btn-new-game', 'New Game', '4rem auto 0 auto', textBox);
  }
};

export class Play {
  constructor(index) {
    this.playAgainButton = document.querySelector('.btn-outer');

    // Make sure there's only one Start a New Game button
    if(!this.playAgainButton) {
      showButton('modal-trigger btn btn-outer', 'Start a New Game', '3rem auto 0 auto', container);
    }

    if (localStorage.length === 0) {

      // New game always starts at index 0
      textBox.textContent = data[0].body;
      optionsBox.style.display = 'block';

      renderOptions(data, 0);
      localStorage.setItem('index', 0);
     
    } else {
      
      // Check if the current location is "game over"
      const page = new PageState();
      if (data[index].gameOver === true) {
        page.change(new GameOver(data[index].body));
        return;
      } 

      textBox.textContent = `${data[index].body}`;
      optionsBox.style.display = 'block';
      renderOptions(data, index);
    }
  }
};

export class GameOver {
  constructor(gameOverMessage) {
    textBox.textContent = `${gameOverMessage}`;
    optionsBox.style.display = 'none';

    // Remove new game button w/ modal prompt & add button w/o modal promt for better UX
    document.querySelector('.btn-outer').remove();
    showButton('btn btn-new-game', 'New Game', '3rem auto 0 auto', textBox);
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
    showButton('btn btn-start-over modal-trigger', 'New Game', 'none', buttonWrapper);
    showButton('btn btn-play', 'Continue', 'none', buttonWrapper);
  }
};
