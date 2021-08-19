function toggleText() {
  let text = document.getElementById('text');
  let button = document.querySelector('.toggle-text-button');
  button.onclick = () => { text.hidden = !text.hidden };
}
