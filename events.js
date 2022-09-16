import { data } from './data.js';
import { PageState, NewGame, GameOver, Continue } from './states.js';


export function loadEvents() {
  const mainBox = document.querySelector('.main-box'),
        textBox = document.querySelector('.main-box__text'),
        optionsBox = document.querySelector('.main-box__options'),
        page = new PageState();

  mainBox.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-play')) {
      page.change(new NewGame())
    }

    if (e.target.classList.contains('option')) {
      optionsBox.innerHTML = ``;
      data.forEach(item => {
        if(item.cameFrom === e.target.id) {
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

    if (e.target.classList.contains('btn-play-again')) {
      localStorage.clear();
      page.change(new NewGame());
    }


    // let className;

    // switch(e.target.classList.contains(className)) {
    //   case className === 'btn-play':
    //     page.change(new NewGame());
    //     break;

    //   case className === 'option':
    //     optionsBox.innerHTML = ``;
    //     console.log('click');

    //     //* Parse data and find the related block based on option id
    //     const currentBlock = data.forEach(item => {
    //       if(item.cameFrom === e.target.id) {
    //         textBox.textContent = item.body;
    //         localStorage.setItem('index', `${data.indexOf(item)}`);
    //         return item;
    //       }
    //     });

    //     if(currentBlock.gameOver === true) {
    //       page.change(new GameOver(item.body));
    //       return;
    //     }
  
    //     for (const key in currentBlock.options) {
    //       const newOption = document.createElement('div');
    //       newOption.classList = 'option';
    //       newOption.id = key;
    //       newOption.textContent = `${item.options[key]}`;
    //       optionsBox.appendChild(newOption);
    //     } 
    //     break;

    //   case className === 'btn-play-again':
    //     localStorage.clear();
    //     page.change(new NewGame());
    //     break;
    // }

    e.preventDefault();
  });

  window.addEventListener('DOMContentLoaded', () => {
    if(localStorage.length !== 0) {
      page.change(new Continue(localStorage.index));
    } 
  })
}


