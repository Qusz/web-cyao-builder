import { data } from './data.js';
import { PageState, Play, GameOver, Continue } from './states.js';


export function loadEvents() {
  const mainBox = document.querySelector('.main-box'),
        textBox = document.querySelector('.main-box__text'),
        optionsBox = document.querySelector('.main-box__options'),
        page = new PageState();

  mainBox.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-play')) {
      page.change(new Play())
    }

    if (e.target.classList.contains('option')) {
      optionsBox.innerHTML = ``;
      data.forEach(item => {
        if(item.cameFrom === e.target.id) {
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
}


