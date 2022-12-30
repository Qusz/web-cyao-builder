export function showButton(options) {
  const button = document.createElement('button');
  button.className = `${options.className}`;
  button.textContent = `${options.textContent}`;
  button.style.margin = `${options.margin}`;
  options.parent.appendChild(button);
}

export function toggleModal() {
  const modal = document.querySelector('.modal');
  modal.classList.toggle('show-modal');
}

export function renderOptions(data, index) {
  // Null check is here to make the function more versatile. In some instances there's no need for index, so null is passed as an argument.
  if (index !== null) {
    for (const key in data[index].options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data[index].options[key]}`;
      document.querySelector('.playbox__options').appendChild(newOption);
    }
  } else {
    for (const key in data.options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data.options[key]}`;
      document.querySelector('.playbox__options').appendChild(newOption);
    }
  }
}

export function animateMainBox() {
  const box = document.querySelector('.playbox');
  box.classList.remove('animate-box');
  
  // So that the browser renders changes. Otherwise animation only works on 1st click
  void box.offsetWidth;
  box.classList.add('animate-box');
}