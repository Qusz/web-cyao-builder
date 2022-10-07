import { data } from './data.js';
import { PageState, Play, GameOver, WelcomeBack } from './states.js';
import { toggleModal, renderOptions, animateMainBox } from './utilities.js';

export function loadEvents() {
  const container = document.querySelector('.container'),
        textBox = document.querySelector('.main-box-text'),
        optionsBox = document.querySelector('.main-box-options'),
        modal = document.querySelector('.modal'),
        page = new PageState();

  container.addEventListener('click', (e) => {
    switch(true) {

      case e.target.classList.contains('btn-play'):
        animateMainBox();
        page.change(new Play(localStorage.index));
        break;

      case e.target.classList.contains('option'):
        // Clear previous options first
        optionsBox.innerHTML = ``;
        animateMainBox();

        data.forEach(item => {
          if(item.option_id.includes(e.target.id)) {
            textBox.textContent = item.body;
            localStorage.setItem('index', `${data.indexOf(item)}`);
  
            if(item.gameOver === true) {
              page.change(new GameOver(item.body));
              return;
            }
            
            renderOptions(item, null);
          }
        });
        break;

      case e.target.classList.contains('btn-new-game'):
        animateMainBox();
        localStorage.clear();
        page.change(new Play());
        break;
    }
  });

  // If there's a saved game, switch to WelcomeBack state on page load
  window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length !== 0) {
      page.change(new WelcomeBack());
    } 
  });

  // Modal event
  window.addEventListener('click', (e) => {
    switch(true) {
      case e.target.classList.contains('modal-trigger'):
      case e.target.classList.contains('btn-modal-close'):
        toggleModal(modal);
        break;
      case e.target.classList.contains('btn-modal-ok'):
        toggleModal(modal);
        optionsBox.innerHTML = ``;
        localStorage.clear();
        animateMainBox();
        page.change(new Play());
        break;
    }
    e.preventDefault();
  });
}