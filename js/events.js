import data from '../data.json' assert {type: 'json'};
import { PageState, Play, GameOver, WelcomeBack } from './states.js';
import { toggleModal } from './utilities.js';


export function loadEvents() {
  const container = document.querySelector('.container'),
        textBox = document.querySelector('.main-box__text'),
        optionsBox = document.querySelector('.main-box__options'),
        modal = document.querySelector('.modal'),
        page = new PageState();

  container.addEventListener('click', (e) => {
    switch(true) {

      case e.target.classList.contains('btn-play'):
        page.change(new Play(localStorage.index));
        break;

      case e.target.classList.contains('option'):
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
        break;

      case e.target.classList.contains('btn-new-game'):
        localStorage.clear();
        page.change(new Play());
        break;
    }
    e.preventDefault();
  });

  window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length !== 0) {
      page.change(new WelcomeBack());
    } 
  });

  window.addEventListener('click', (e) => {
    switch(true) {
      case e.target.classList.contains('modal'):
      case e.target.classList.contains('modal-trigger'):
      case e.target.classList.contains('close-button'):
      case e.target.classList.contains('btn-modal-close'):
        toggleModal(modal);
        break;
      case e.target.classList.contains('btn-modal-ok'):
        toggleModal(modal);
        optionsBox.innerHTML = ``;
        localStorage.clear();
        page.change(new Play());
        break;
    }
    e.preventDefault();
  });
}