function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let status = table.rows[i].cells[3].dataset.available;
    String(status) === 'true' ? table.rows[i].classList.add('available') :
      String(status) === 'false' ? table.rows[i].classList.add('unavailable') :
        table.rows[i].setAttribute('hidden', true);
    let gender = table.rows[i].cells[2].innerHTML;
    table.rows[i].classList.add(gender === 'm' ? 'male' : 'female');
    let age = table.rows[i].cells[1].innerHTML;
    if (age < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    }
  }
}
