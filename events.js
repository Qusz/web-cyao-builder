import { data } from './data.js';
import { PageState, Play, GameOver, WelcomeBack } from './states.js';


export function loadEvents() {
  const mainBox = document.querySelector('.main-box'),
        textBox = document.querySelector('.main-box__text'),
        optionsBox = document.querySelector('.main-box__options'),
        page = new PageState();

  mainBox.addEventListener('click', (e) => {

    if(e.target.classList.contains('btn-play')) {
      page.change(new Play(localStorage.index))
    }

    if (e.target.classList.contains('option')) {
      //* Clear previous options first
      optionsBox.innerHTML = ``;

      data.forEach(item => {

        if(item.option_id.includes(e.target.id)) {
          textBox.textContent = item.body;
          localStorage.setItem('index', `${data.indexOf(item)}`);

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

    if (e.target.classList.contains('btn-new-game')) {
      localStorage.clear();
      page.change(new Play());
    }

    e.preventDefault();
  });

  window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length !== 0) {
      page.change(new WelcomeBack());
    } 
  });
}


