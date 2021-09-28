export default function promiseClick(button) {

  let promise = new Promise(function(resolve, reject) {
    if (!button) reject(new Error("Ошибка! Нет кнопки."));
    button.addEventListener('click', (event) => {resolve(event)}, { once: true })
  })
  
  
  return promise 
}
