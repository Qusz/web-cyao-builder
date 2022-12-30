import { data, welcome } from './data.js';
import { showButton, renderOptions } from './utilities.js';

const refs = {
  optionsBox: document.querySelector('.playbox__options'),
  textBox: document.querySelector('.playbox__body'),
  container: document.querySelector('.playbox-container')
}

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
    refs.textBox.textContent = welcome;
    showButton({
      className: 'btn btn-secondary btn-new-game',
      textContent: 'New Game',
      margin: '4rem auto 0 auto',
      parent: refs.textBox
    });
  }
};

export class Play {
  constructor(index) {
    this.playAgainButton = document.querySelector('.btn-outer');
    refs.textBox.style.textAlign = 'start';
    
    // Make sure there's only one Start a New Game button
    if (!this.playAgainButton) {
      showButton({
        className: 'modal-trigger btn btn-accent btn-outer',
        textContent: 'Start a New Game',
        margin: '3rem auto 0 auto',
        parent: refs.container
      });
    }

    if (localStorage.length === 0) {
      // New game always starts at index 0
      refs.textBox.textContent = data[0].body;
      refs.optionsBox.style.display = 'grid';

      renderOptions(data, 0);
      localStorage.setItem('index', 0);
     
    } else {
      // Check if the current location is "game over"
      const page = new PageState();
      if (data[index].gameOver === true) {
        page.change(new GameOver(data[index].body));
        return;
      } 

      refs.textBox.textContent = `${data[index].body}`;
      refs.optionsBox.style.display = 'grid';
      renderOptions(data, index);
    }
  }
};

export class GameOver {
  constructor(gameOverMessage) {
    refs.textBox.textContent = `${gameOverMessage}`;
    refs.optionsBox.style.display = 'none';

    // Remove new game button w/ modal prompt & add button w/o modal promt for better UX
    document.querySelector('.btn-outer').remove();
    showButton({
      className: 'btn btn-accent btn-new-game',
      textContent: 'New Game',
      margin: '3rem auto 0 auto',
      parent: refs.textBox
    });
  }
};

export class WelcomeBack {
  constructor() {
    refs.textBox.textContent = 'Welcome back! Would you like to pick up where you left off or start a new game?';
    refs.textBox.style.textAlign = 'center';

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList = 'weclome-back-buttons';
    refs.textBox.appendChild(buttonWrapper);

    showButton({
      className: 'btn btn-secondary modal-trigger',
      textContent: 'New Game',
      margin: '0',
      parent: buttonWrapper
    });

    showButton({
      className: 'btn btn-secondary btn-play',
      textContent: 'Continue',
      margin: '0',
      parent: buttonWrapper
    });
  }
};
