export const clearValidation = () => {
  let inputs = document.querySelectorAll('input');

  inputs.forEach(element => {
    if (element.classList.contains('is-invalid')) element.classList.remove('is-invalid');
  })
}

export const validate = (selector, text) => {
  let element = document.querySelector(selector);
  let invalid = document.createElement('div');
  let prevInvalid = document.querySelectorAll('.invalid-feedback');

  if (prevInvalid.length > 0) {
    for (const prevElement of prevInvalid) {
      prevElement.remove();
    }
  }

  invalid.classList.add('invalid-feedback');
  invalid.innerHTML = text;
  element.classList.add('is-invalid');
  element.parentNode.insertBefore(invalid, element.nextSibling);
}