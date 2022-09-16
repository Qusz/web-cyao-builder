import { data } from './data.js'


const mainBox = document.querySelector('.main-box');
const textBox = document.querySelector('.main-box__text');
const optionsBox = document.querySelector('.main-box__options');


class PageState {
  constructor() {
    this.currentState = new DefaultState(this);
  }

  change(state) {
    this.currentState = state;
  }
};

class DefaultState {
  constructor() {
    this.textBox = document.querySelector('.main-box__text');
    this.textBox.textContent = 'The Herbalist is a Choose Your Own Adventure story written by Matthew Walker. Enjoy.';

    this.button = document.createElement('button');
    this.button.className = 'btn btn-play';
    this.button.textContent = 'Play';
    this.textBox.appendChild(this.button);

  }
};

class Play {
  constructor() {
    this.textBox = document.querySelector('.main-box__text');
    this.textBox.textContent = data[0].body;
    
    optionsBox.innerHTML = `
    <div id="o_11" class="option">${data[0].options.o_11}</div>
    <div id="o_12" class="option">${data[0].options.o_12}</div>
    <div id="o_13" class="option">${data[0].options.o_13}</div>
    <div id="o_14" class="option">${data[0].options.o_14}</div>
    `;
    optionsBox.style.display = 'block';

  }
};

class GameOver {
  constructor(gameOverMessage) {
    this.textBox = document.querySelector('.main-box__text');
    textBox.textContent = `${gameOverMessage}`;

    optionsBox.style.display = 'none';

    this.button = document.createElement('button');
    this.button.className = 'btn btn-play-again';
    this.button.textContent = 'Play Again';
    this.textBox.appendChild(this.button);
  }
};

class Continue {
  constructor(textId) {
    this.textBox = document.querySelector('.main-box__text');
    this.textBox.textContent = `${data[textId].body}`;
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

const page = new PageState();

mainBox.addEventListener('click', (e) => {
  if(e.target.classList.contains('btn-play')) {
    page.change(new Play())
  }

  if (e.target.classList.contains('option')) {
    optionsBox.innerHTML = ``;
    data.forEach(item => {
      if(item.leading_option === e.target.id) {
        textBox.textContent = item.body;
        localStorage.setItem('location', `${item.text_id}`);

        if(item.gameOver === true) {
          page.change(new GameOver(item.body));
          return;
        }
   
        for (const key in item.options) {
          const newOption = document.createElement('div');
          newOption.classList = 'option';
          newOption.id = key;
          newOption.textContent = `${item.options[key]}`;
          optionsBox.appendChild(newOption);
        } 
      }
    });
  }

  if (e.target.classList.contains('btn-play-again')) {
    localStorage.clear();
    page.change(new Play());
  }
});

window.addEventListener('DOMContentLoaded', () => {
  if(localStorage.length !== 0) {
    page.change(new Continue(localStorage.location));
  } 
})



