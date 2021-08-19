/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.render(rows);
    this.elem.querySelectorAll('button').forEach( item => item.addEventListener('click', this.onDelete));
  }
  render(rows) {
    let tableRows = '';
    for (let i = 0; i < rows.length; i++) {
      tableRows = tableRows + `
        <tr>
          <th>${rows[i].name}</th>
          <th>${rows[i].age}</th>
          <th>${rows[i].salary}</th>
          <th>${rows[i].city}</th>
          <th><button>X</button></th>
        </tr>
      `
    }
    this.elem = document.createElement('table');
    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      ${tableRows}
      </tbody>
    `
  }

  onDelete(event){
    event.target.parentElement.parentElement.remove()
  }
}
