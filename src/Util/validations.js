export const clearValidation = () => {
  let inputs = document.querySelectorAll('.is-invalid');

  inputs.forEach(element => {
    element.classList.remove('is-invalid');
  })
}

export const validate = (selector, text) => {
  let element = document.querySelector(selector);
  let invalidFeedback = document.querySelectorAll('.invalid-feedback');
  
  if (invalidFeedback.length > 0) {
    for (const prevElement of invalidFeedback) {
      prevElement.remove();
    }
  }
  
  let invalid = document.createElement('div');
  
  invalid.classList.add('invalid-feedback');
  invalid.innerHTML = text;
  
  if (element !== null) {
    const visibility = window.getComputedStyle(element);
    if (visibility.display !== 'hidden') {
      element?.classList.add('is-invalid');
      element?.parentNode.insertBefore(invalid, element.nextSibling);
    }
  }
}