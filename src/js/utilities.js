export function showButton(className, textContent, margin, parent) {
  const button = document.createElement('button');
  button.className = `${className}`;
  button.textContent = `${textContent}`;
  button.style.margin = `${margin}`;
  parent.appendChild(button);
}

export function toggleModal(modal) {
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
      document.querySelector('.main-box-options').appendChild(newOption);
    }
  } else {
    for (const key in data.options) {
      const newOption = document.createElement('div');
      newOption.classList = 'option';
      newOption.id = key;
      newOption.textContent = `${data.options[key]}`;
      document.querySelector('.main-box-options').appendChild(newOption);
    }
  }
}

export function animateMainBox() {
  const box = document.querySelector('.main-box');
  box.classList.remove('animate-box');
  
  // This is here to make browser render changes. Otherwise animation only works on 1st click
  void box.offsetWidth;
  box.classList.add('animate-box');
}