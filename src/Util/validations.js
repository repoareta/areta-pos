export const clearValidation = () => {
  let inputs = document.querySelectorAll('.is-invalid');

  inputs.forEach(element => {
    element.classList.remove('is-invalid');
  })
}

export const validate = (selector, text) => {
  let element = document.querySelector(selector);
  let invalid = document.createElement('div');
  let invalidFeedback = document.querySelectorAll('.invalid-feedback');

  if (invalidFeedback.length > 0) {
    for (const prevElement of invalidFeedback) {
      prevElement.remove();
    }
  }

  invalid.classList.add('invalid-feedback');
  invalid.innerHTML = text;
  element.classList.add('is-invalid');
  element.parentNode.insertBefore(invalid, element.nextSibling);
}