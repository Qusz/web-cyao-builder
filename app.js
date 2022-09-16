import { data } from './data.js'

// console.log(data[1].text_id);
const textBox = document.querySelector('.main-box__text');
const optionsBox = document.querySelector('.main-box__options');


window.addEventListener('DOMContentLoaded', () => {
  textBox.textContent = data[0].body;

  for (const item in data[0].options) {
    const newOption = document.createElement('div');
    newOption.classList = 'option';
    newOption.id = item;
    newOption.textContent = `${data[0].options[item]}`;
    optionsBox.appendChild(newOption);
  }
});



optionsBox.addEventListener('click', (e) => {
 
  if (e.target.classList.contains('option')) {
    optionsBox.innerHTML = ``;
    data.forEach(item => {
      if(item.leading_option === e.target.id) {
        textBox.textContent = item.body;
   
        for (const key in item.options) {
          const newOption = document.createElement('div');
          newOption.classList = 'option';
          newOption.id = key;
          newOption.textContent = `${item.options[key]}`;
          optionsBox.appendChild(newOption);
        }
      }
    })

  }
});
