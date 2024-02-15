// Получаем елементы html
const form = document.querySelector('#form_container')
const input = document.querySelector('#input-box')
const task = document.querySelector('#task')
const empty = document.querySelector('.empty_list')
//функция по выводу списка
form.addEventListener('submit', function (e) {
  e.preventDefault()
  const text = input.value
  //форма задачи
  const taskText = ` <li class='li'>
      <input type="checkbox" class="checkbox" data-action='done'>
    <p class='p'>${text} </p>
    <button data-action='delete'>удалить</button>
</li>`
  //  Выводим список на страницу
  task.insertAdjacentHTML('beforeend', taskText)
  //очистить поле ввода и вернуть фокус
  input.value = ''
  input.focus()
  //убираем пустой список
  if (task.children.length > 0) {
    empty.classList.add('none')
  }
});

//удаление задачи
task.addEventListener('click', function (e) {
  if (e.target.dataset.action !== 'delete') {
    return;
  }
  const parentNode = e.target.closest('li')
  parentNode.remove()
  if (task.children.length === 0) {
    empty.classList.remove('none')
  }

});
//выполнение задания отмечаем
task.addEventListener('click', function (e) {
  if (e.target.dataset.action !== 'done') return;
  const parentNode = e.target.closest('li')
  const p = parentNode.querySelector('.p')
  p.classList.toggle('done')
});