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

